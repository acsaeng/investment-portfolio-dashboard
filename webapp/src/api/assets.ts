import { auth, database } from "@/config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { isEmpty } from "lodash";
import {
  FINANCIAL_MODELING_PREP_ENDPOINT,
  FIREBASE_COLLECTIONS,
} from "@/utils/endpoints";

export interface Asset {
  userUid: string;
  symbol: string;
  numShares: number;
  amountSpent: number;
  currency: string;
}

export interface AssetWithQuoteData extends Asset {
  name: string;
  price: number;
  totalValue: number;
  returnAmount: number;
  returnPct: number;
}

interface PortfolioData {
  assets: AssetWithQuoteData[];
  returnAmount: number;
  returnPct: number;
  totalValue: number;
}

const getUserPortfolioData = async (): Promise<PortfolioData> => {
  let userAssetsWithQuoteData: AssetWithQuoteData[];

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

  const returnAmount = totalValue - totalAmountSpent;
  const returnPct = (returnAmount / totalValue) * 100;

  return {
    assets: userAssetsWithQuoteData,
    returnAmount,
    returnPct,
    totalValue,
  };
};

const getUserAssets = async (): Promise<Asset[]> => {
  const assetsRef = collection(database, FIREBASE_COLLECTIONS.ASSETS);
  const assetsQuery = query(
    assetsRef,
    where("userUid", "==", auth.currentUser?.uid),
    orderBy("symbol", "asc")
  );
  const querySnapshot = await getDocs(assetsQuery);

  return querySnapshot.docs.map(
    (doc: QueryDocumentSnapshot) => doc.data() as Asset
  );
};

const getQuoteData = async (assets: Asset[]): Promise<AssetWithQuoteData[]> => {
  return await Promise.all(
    assets.map(async (asset) => {
      const response = await fetch(
        `${FINANCIAL_MODELING_PREP_ENDPOINT}${asset.symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY}`
      );
      const quote = await response.json();
      const price = quote[0].price as number;
      const totalValue = asset.numShares * price;
      const returnAmount = totalValue - asset.amountSpent;
      const returnPct = (returnAmount / totalValue) * 100;

      return {
        ...asset,
        name: quote[0].name as string,
        price,
        totalValue,
        returnAmount,
        returnPct,
      };
    })
  );
};

const addAsset = async (
  userAssetHoldings: string[],
  symbol: string,
  numShares: number,
  pricePerShare: number
): Promise<void> => {
  if (userAssetHoldings.includes(symbol)) {
    throw new Error("Asset already exists in your portfolio.");
  } else if (await verifyAssetSymbol(symbol)) {
    const assetDocRef = doc(
      database,
      FIREBASE_COLLECTIONS.ASSETS,
      `${auth.currentUser?.uid}-${symbol}`
    );
    await setDoc(assetDocRef, {
      amountSpent: numShares * pricePerShare,
      currency: "USD",
      numShares,
      symbol,
      userUid: auth.currentUser?.uid,
    } as Asset);
  } else {
    throw new Error("Asset could not be found.");
  }
};

const verifyAssetSymbol = async (symbol: string): Promise<boolean> => {
  const response = await fetch(
    `${FINANCIAL_MODELING_PREP_ENDPOINT}${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY}`
  );
  const quote = await response.json();
  return (
    !isEmpty(quote) && !!quote[0].symbol && !!quote[0].name && !!quote[0].price
  );
};

const updateAsset = async (
  assetData: Asset,
  isBuy: boolean,
  symbol: string,
  numShares: number,
  pricePerShare: number
): Promise<void> => {
  const assetDocRef = doc(
    database,
    FIREBASE_COLLECTIONS.ASSETS,
    `${auth.currentUser?.uid}-${symbol}`
  );

  if (!isBuy && numShares > assetData.numShares) {
    throw new Error("Cannot sell more shares than you own.");
  } else if (!isBuy && numShares === assetData.numShares) {
    await deleteAsset(symbol);
  } else {
    await updateDoc(assetDocRef, {
      amountSpent: isBuy
        ? assetData.amountSpent + numShares * pricePerShare
        : assetData.amountSpent - numShares * pricePerShare,
      numShares: isBuy
        ? assetData.numShares + numShares
        : assetData.numShares - numShares,
    });
  }
};

const deleteAsset = async (symbol: string): Promise<void> => {
  const assetDocRef = doc(
    database,
    FIREBASE_COLLECTIONS.ASSETS,
    `${auth.currentUser?.uid}-${symbol}`
  );
  await deleteDoc(assetDocRef);
};

export { addAsset, updateAsset, deleteAsset, getUserPortfolioData };
