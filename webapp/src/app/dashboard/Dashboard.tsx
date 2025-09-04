"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import HoldingsModal from "./HoldingsModal";
import { HoldingsModalContent } from "./HoldingsModal/HoldingsModal";
import HoldingsTable from "./HoldingsTable";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import {
  HoldingWithQuoteData,
  addHolding,
  updateHolding,
  deleteHolding,
  getUserPortfolioData,
} from "@/api/holdings";
import { formatCurrency, formatPercentage } from "@/utils/helpers";
import PAGE from "@/utils/routes";
import {
  HOLDING_FORM_FIELD,
  DASHBOARD_HEADER_FIELD,
  MODAL_CONTENT,
} from "./constants";
import "./Dashboard.scss";

interface UserPortfolio {
  holdings: HoldingWithQuoteData[];
  totalValue: number;
  returnAmount: number;
  returnPct: number;
}

const Dashboard: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(
    null
  );
  const [modalContent, setModalContent] = useState<HoldingsModalContent>({});
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const onSubmitHolding = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const currentModalContent = modalContent;
    let newModalContent: HoldingsModalContent = {};

    setModalContent({});
    setShowLoader(true);

    try {
      const symbol = (form.elements.namedItem("symbol") as HTMLInputElement)
        ?.value;
      const numShares = (
        form.elements.namedItem("numShares") as HTMLInputElement
      )?.valueAsNumber;
      const pricePerShare = (
        form.elements.namedItem("pricePerShare") as HTMLInputElement
      )?.valueAsNumber;

      if (
        currentModalContent.action === MODAL_CONTENT.ADD_HOLDING.FORM.action
      ) {
        await addHolding(
          userPortfolio?.holdings.map((holding) => holding.symbol) ?? [],
          symbol,
          numShares,
          pricePerShare
        );
        newModalContent = MODAL_CONTENT.ADD_HOLDING.SUCCESS_RESPONSE;
      } else if (
        currentModalContent.action === MODAL_CONTENT.UPDATE_HOLDING.FORM.action
      ) {
        const isBuy =
          (form.elements.namedItem("action") as HTMLInputElement).value ===
          HOLDING_FORM_FIELD.BUY_RADIO_BUTTON.value;
        const userHolding = userPortfolio?.holdings.find(
          (holding) => holding.symbol === symbol
        );

        if (userHolding) {
          await updateHolding(
            userHolding,
            isBuy,
            symbol,
            numShares,
            pricePerShare
          );
        }

        newModalContent = MODAL_CONTENT.UPDATE_HOLDING.SUCCESS_RESPONSE;
      } else if (
        currentModalContent.action === MODAL_CONTENT.DELETE_HOLDING.FORM.action
      ) {
        if (currentModalContent.symbol) {
          await deleteHolding(currentModalContent.symbol);
        }

        newModalContent = MODAL_CONTENT.DELETE_HOLDING.SUCCESS_RESPONSE;
      }

      setUserPortfolio(await getUserPortfolioData());
    } catch {
      newModalContent = MODAL_CONTENT.ERROR_RESPONSE;
    }

    setShowLoader(false);
    setModalContent(newModalContent);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthorized(true);
        setUserPortfolio(await getUserPortfolioData());
      } else {
        router.push(PAGE.SIGN_IN);
      }
    });
  }, []);

  return (
    isAuthorized && (
      <div className="dashboard">
        <Navbar />
        <Loader isVisible={!userPortfolio || showLoader} />
        {userPortfolio && (
          <>
            <div className="total-value">
              <span className="total-value-amount">
                {formatCurrency(userPortfolio.totalValue)}
              </span>
              <span className="total-value-status">{`${formatCurrency(
                userPortfolio.returnAmount
              )} (${formatPercentage(userPortfolio.returnPct)}) ${
                userPortfolio.returnAmount > 0
                  ? DASHBOARD_HEADER_FIELD.gainLabel
                  : DASHBOARD_HEADER_FIELD.lossLabel
              }`}</span>
            </div>
            <HoldingsTable
              setModalContent={setModalContent}
              userHoldings={userPortfolio.holdings}
            />
            <HoldingsModal
              modalContent={modalContent}
              onSubmit={onSubmitHolding}
              setModalContent={setModalContent}
            />
          </>
        )}
      </div>
    )
  );
};

export default Dashboard;
