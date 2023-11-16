import { auth, database } from '@/config/firebase';
import { FINANCIAL_MODELING_PREP_ENDPOINT, FIREBASE_COLLECTIONS } from '@/utils/endpoints';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const getUserPortfolioData = async () => {
  const assetsRef = collection(database, FIREBASE_COLLECTIONS.ASSETS);
  console.log('currentUser', auth.currentUser);
  const assetsQuery = query(assetsRef, where('userUid', '==', auth.currentUser.uid), orderBy('symbol', 'asc'));
  let assets;

  try {
    // Retrive user assets data from the database
    const snapshot = await getDocs(assetsQuery);
    assets = snapshot.docs.map((doc) => {
      return doc.data();
    });

    // Retrieve real-time quote for each user asset
    assets = await Promise.all(
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
  } catch {
    assets = [];
  }

  // Formatting the total return response
  let totalValue = 0;
  let totalAmountSpent = 0;

  assets.forEach((asset) => {
    totalValue += asset.numShares * asset.price;
    totalAmountSpent += asset.amountSpent;
  });

  totalValue = totalValue.toFixed(2);
  const returnAmount = Math.abs(totalValue - totalAmountSpent).toFixed(2);
  const returnPct = Math.abs((returnAmount / totalValue) * 100).toFixed(2);
  const isNetGain = totalValue - totalAmountSpent > 0;

  // Formatting the assets list response
  const formattedAssets = assets.map((asset) => {
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
    assets: formattedAssets,
    isNetGain,
    returnAmount: `${isNetGain ? '' : '-'}$${returnAmount}`,
    returnPct: `${isNetGain ? '' : '-'}${returnPct}%`,
    totalValue: `$${totalValue}`,
  };
};

export { getUserPortfolioData };
