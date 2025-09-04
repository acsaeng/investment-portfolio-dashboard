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
import { FIREBASE_COLLECTIONS } from "@/utils/endpoints";

export interface Holding {
  userUid: string;
  symbol: string;
  numShares: number;
  amountSpent: number;
  currency: string;
}

export interface HoldingWithQuoteData extends Holding {
  name: string;
  price: number;
  totalValue: number;
  returnAmount: number;
  returnPct: number;
}

interface PortfolioData {
  holdings: HoldingWithQuoteData[];
  returnAmount: number;
  returnPct: number;
  totalValue: number;
}

const getUserPortfolioData = async (): Promise<PortfolioData> => {
  let userHoldingsWithQuoteData: HoldingWithQuoteData[];

  try {
    const userHoldings = await getUserHoldings();
    userHoldingsWithQuoteData = await getQuoteData(userHoldings);
  } catch {
    userHoldingsWithQuoteData = [];
  }

  // Calculating the total return response
  let totalValue = 0;
  let totalAmountSpent = 0;

  userHoldingsWithQuoteData.forEach((holding) => {
    totalValue += holding.numShares * holding.price;
    totalAmountSpent += holding.amountSpent;
  });

  const returnAmount = totalValue - totalAmountSpent;
  const returnPct = (returnAmount / totalValue) * 100;

  return {
    holdings: userHoldingsWithQuoteData,
    returnAmount,
    returnPct,
    totalValue,
  };
};

const getUserHoldings = async (): Promise<Holding[]> => {
  const holdingsRef = collection(database, FIREBASE_COLLECTIONS.HOLDINGS);
  const holdingsQuery = query(
    holdingsRef,
    where("userUid", "==", auth.currentUser?.uid),
    orderBy("symbol", "asc")
  );
  const querySnapshot = await getDocs(holdingsQuery);

  return querySnapshot.docs.map(
    (doc: QueryDocumentSnapshot) => doc.data() as Holding
  );
};

const getQuoteData = async (
  holdings: Holding[]
): Promise<HoldingWithQuoteData[]> => {
  return await Promise.all(
    holdings.map(async (holding) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_ENDPOINT}?symbol=${holding.symbol}&apikey=${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY}`
      );
      const quote = await response.json();
      const price = quote[0].price as number;
      const totalValue = holding.numShares * price;
      const returnAmount = totalValue - holding.amountSpent;
      const returnPct = (returnAmount / totalValue) * 100;

      return {
        ...holding,
        name: quote[0].name as string,
        price,
        totalValue,
        returnAmount,
        returnPct,
      };
    })
  );
};

const addHolding = async (
  userHoldingHoldings: string[],
  symbol: string,
  numShares: number,
  pricePerShare: number
): Promise<void> => {
  if (userHoldingHoldings.includes(symbol)) {
    throw new Error("Holding already exists in your portfolio.");
  } else if (await verifyHoldingSymbol(symbol)) {
    const holdingDocRef = doc(
      database,
      FIREBASE_COLLECTIONS.HOLDINGS,
      `${auth.currentUser?.uid}-${symbol}`
    );
    await setDoc(holdingDocRef, {
      amountSpent: numShares * pricePerShare,
      currency: "USD",
      numShares,
      symbol,
      userUid: auth.currentUser?.uid,
    } as Holding);
  } else {
    throw new Error("Holding could not be found.");
  }
};

const verifyHoldingSymbol = async (symbol: string): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_ENDPOINT}?symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY}`
  );
  const quote = await response.json();
  return (
    !isEmpty(quote) && !!quote[0].symbol && !!quote[0].name && !!quote[0].price
  );
};

const updateHolding = async (
  holdingData: Holding,
  isBuy: boolean,
  symbol: string,
  numShares: number,
  pricePerShare: number
): Promise<void> => {
  const holdingDocRef = doc(
    database,
    FIREBASE_COLLECTIONS.HOLDINGS,
    `${auth.currentUser?.uid}-${symbol}`
  );

  if (!isBuy && numShares > holdingData.numShares) {
    throw new Error("Cannot sell more shares than you own.");
  } else if (!isBuy && numShares === holdingData.numShares) {
    await deleteHolding(symbol);
  } else {
    await updateDoc(holdingDocRef, {
      amountSpent: isBuy
        ? holdingData.amountSpent + numShares * pricePerShare
        : holdingData.amountSpent - numShares * pricePerShare,
      numShares: isBuy
        ? holdingData.numShares + numShares
        : holdingData.numShares - numShares,
    });
  }
};

const deleteHolding = async (symbol: string): Promise<void> => {
  const holdingDocRef = doc(
    database,
    FIREBASE_COLLECTIONS.HOLDINGS,
    `${auth.currentUser?.uid}-${symbol}`
  );
  await deleteDoc(holdingDocRef);
};

export { addHolding, updateHolding, deleteHolding, getUserPortfolioData };
