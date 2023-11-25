import { auth, database } from '@/config/firebase';
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { isEmpty } from 'lodash';
import { FINANCIAL_MODELING_PREP_ENDPOINT, FIREBASE_COLLECTIONS } from '@/utils/endpoints';

const getUserPortfolioData = async () => {
  let userAssetsWithQuoteData;

  try {
    const userAssets = await getUserAssets();
    userAssetsWithQuoteData = await getQuoteData(userAssets);
  } catch {
    userAssetsWithQuoteData = [];
  }

  // Calculating the total return response
  let totalValue = 0;
  let totalAmountSpent = 0;

  userAssetsWithQuoteData.forEach((asset) => {
    totalValue += asset.numShares * asset.price;
    totalAmountSpent += asset.amountSpent;
  });

  totalValue = totalValue;
  const returnAmount = totalValue - totalAmountSpent;
  const returnPct = (returnAmount / totalValue) * 100;

  return {
    assets: userAssetsWithQuoteData,
    returnAmount,
    returnPct,
    totalValue,
  };
};

// Get user assets data from the database
const getUserAssets = async () => {
  const assetsRef = collection(database, FIREBASE_COLLECTIONS.ASSETS);
  const assetsQuery = query(assetsRef, where('userUid', '==', auth.currentUser.uid), orderBy('symbol', 'asc'));
  const querySnapshot = await getDocs(assetsQuery);

  return querySnapshot.docs.map((doc) => doc.data());
};

// Get the real-time quote data for each user asset
const getQuoteData = async (assets) => {
  return await Promise.all(
    assets.map(async (asset) => {
      const response = await fetch(
        `${FINANCIAL_MODELING_PREP_ENDPOINT}${asset.symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY}`
      );
      const quote = await response.json();
      const price = quote[0].price;
      const totalValue = asset.numShares * price;
      const returnAmount = totalValue - asset.amountSpent;
      const returnPct = (returnAmount / totalValue) * 100;

      return {
        ...asset,
        name: quote[0].name,
        price,
        totalValue,
        returnAmount,
        returnPct,
      };
    })
  );
};

const addAsset = async (userAssetHoldings, symbol, numShares, pricePerShare) => {
  if (userAssetHoldings.includes(symbol)) {
    throw new Error('Asset already exists in your portfolio.');
  } else if (await verifyAssetSymbol(symbol)) {
    const assetDocRef = doc(database, FIREBASE_COLLECTIONS.ASSETS, `${auth.currentUser.uid}-${symbol}`);
    await setDoc(assetDocRef, {
      amountSpent: numShares * pricePerShare,
      currency: 'USD',
      numShares,
      symbol,
      userUid: auth.currentUser.uid,
    });
  } else {
    throw new Error('Asset could not be found.');
  }
};

const verifyAssetSymbol = async (symbol) => {
  const response = await fetch(
    `${FINANCIAL_MODELING_PREP_ENDPOINT}${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY}`
  );
  const quote = await response.json();
  return !isEmpty(quote);
};

const buyOrSellAsset = async (assetData, isBuy, symbol, numShares, pricePerShare) => {
  const assetDocRef = doc(database, FIREBASE_COLLECTIONS.ASSETS, `${auth.currentUser.uid}-${symbol}`);

  if (!isBuy && numShares > assetData.numShares) {
    throw new Error('Cannot sell more shares than you own.');
  } else if (!isBuy && numShares === assetData.numShares) {
    await deleteAsset(symbol);
  } else {
    await updateDoc(assetDocRef, {
      amountSpent: isBuy
        ? assetData.amountSpent + numShares * pricePerShare
        : assetData.amountSpent - numShares * pricePerShare,
      numShares: isBuy ? assetData.numShares + numShares : assetData.numShares - numShares,
    });
  }
};

const deleteAsset = async (symbol) => {
  const assetDocRef = doc(database, FIREBASE_COLLECTIONS.ASSETS, `${auth.currentUser.uid}-${symbol}`);
  await deleteDoc(assetDocRef);
};

export { addAsset, buyOrSellAsset, deleteAsset, getUserPortfolioData };
