import { auth, database } from '@/config/firebase';
import { addDoc, collection, deleteDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
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

  // Formatting the total return response
  let totalValue = 0;
  let totalAmountSpent = 0;

  userAssetsWithQuoteData.forEach((asset) => {
    totalValue += asset.numShares * asset.price;
    totalAmountSpent += asset.amountSpent;
  });

  totalValue = totalValue.toFixed(2);
  const returnAmount = Math.abs(totalValue - totalAmountSpent).toFixed(2);
  const returnPct = Math.abs((returnAmount / totalValue) * 100).toFixed(2);
  const isNetGain = totalValue - totalAmountSpent > 0;

  // Formatting the user assets list response
  const formattedUserAssets = userAssetsWithQuoteData.map((asset) => {
    const { amountSpent, currency, name, numShares, price, symbol } = asset;
    const totalValue = (numShares * price).toFixed(2);
    const returnAmount = Math.abs(totalValue - amountSpent).toFixed(2);
    const returnPct = Math.abs((returnAmount / totalValue) * 100).toFixed(2);
    const isNetGain = totalValue - amountSpent > 0;
    return {
      currency,
      name,
      numShares: `${numShares} shares`,
      price: `$${price}`,
      returnAmount: `${isNetGain ? '' : '-'}$${returnAmount}`,
      returnPct: `${isNetGain ? '' : '-'}${returnPct}%`,
      symbol,
      totalValue: `$${totalValue}`,
    };
  });

  return {
    assets: formattedUserAssets,
    isNetGain,
    returnAmount: `${isNetGain ? '' : '-'}$${returnAmount}`,
    returnPct: `${isNetGain ? '' : '-'}${returnPct}%`,
    totalValue: `$${totalValue}`,
  };
};

// Get user assets data from the database
const getUserAssets = async () => {
  const assetsRef = collection(database, FIREBASE_COLLECTIONS.ASSETS);
  const assetsQuery = query(assetsRef, where('userUid', '==', auth.currentUser.uid), orderBy('symbol', 'asc'));
  const querySnapshot = await getDocs(assetsQuery);

  return querySnapshot.docs.map((doc) => {
    return doc.data();
  });
};

// Get the real-time quote data for each user asset
const getQuoteData = async (assets) => {
  return await Promise.all(
    assets.map(async (asset) => {
      const response = await fetch(
        `${FINANCIAL_MODELING_PREP_ENDPOINT}${asset.symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY}`
      );
      const quote = await response.json();
      return {
        ...asset,
        name: quote[0].name,
        price: quote[0].price.toFixed(2),
      };
    })
  );
};

const addAsset = async (symbol, numShares, pricePerShare) => {
  if (await verifyAssetSymbol(symbol)) {
    const assetsRef = collection(database, FIREBASE_COLLECTIONS.ASSETS);
    addDoc(assetsRef, {
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

const deleteAsset = async (symbol) => {
  const assetsRef = collection(database, FIREBASE_COLLECTIONS.ASSETS);
  const assetsQuery = query(assetsRef, where('userUid', '==', auth.currentUser.uid), where('symbol', '==', symbol));
  const querySnapshot = await getDocs(assetsQuery);

  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

export { addAsset, deleteAsset, getUserPortfolioData };
