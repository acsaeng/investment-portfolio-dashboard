"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import AssetsModal from "./AssetsModal";
import { ModalContent } from "./AssetsModal/AssetsModal";
import AssetsTable from "./AssetsTable";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import {
  AssetWithQuoteData,
  addAsset,
  updateAsset,
  deleteAsset,
  getUserPortfolioData,
} from "@/api/assets";
import { formatCurrency, formatPercentage } from "@/utils/helpers";
import PAGE from "@/utils/routes";
import {
  ASSET_FORM_FIELD,
  DASHBOARD_HEADER_FIELD,
  MODAL_CONTENT,
} from "./constants";
import "./Dashboard.scss";

interface UserPortfolio {
  assets: AssetWithQuoteData[];
  totalValue: number;
  returnAmount: number;
  returnPct: number;
}

const Dashboard: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(
    null
  );
  const [modalContent, setModalContent] = useState<ModalContent>({});
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const onSubmitAsset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const currentModalContent = modalContent;
    let newModalContent: ModalContent = {};

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

      if (currentModalContent.action === MODAL_CONTENT.ADD_ASSET.FORM.action) {
        await addAsset(
          userPortfolio?.assets.map((asset) => asset.symbol) ?? [],
          symbol,
          numShares,
          pricePerShare
        );
        newModalContent = MODAL_CONTENT.ADD_ASSET.SUCCESS_RESPONSE;
      } else if (
        currentModalContent.action === MODAL_CONTENT.UPDATE_ASSET.FORM.action
      ) {
        const isBuy =
          (form.elements.namedItem("action") as HTMLInputElement).value ===
          ASSET_FORM_FIELD.BUY_RADIO_BUTTON.value;
        const userAsset = userPortfolio?.assets.find(
          (asset) => asset.symbol === symbol
        );

        if (userAsset) {
          await updateAsset(userAsset, isBuy, symbol, numShares, pricePerShare);
        }

        newModalContent = MODAL_CONTENT.UPDATE_ASSET.SUCCESS_RESPONSE;
      } else if (
        currentModalContent.action === MODAL_CONTENT.DELETE_ASSET.FORM.action
      ) {
        if (currentModalContent.symbol) {
          await deleteAsset(currentModalContent.symbol);
        }

        newModalContent = MODAL_CONTENT.DELETE_ASSET.SUCCESS_RESPONSE;
      }

      setUserPortfolio(await getUserPortfolioData());
    } catch (error: any) {
      newModalContent = {
        ...MODAL_CONTENT.ERROR_RESPONSE,
        body: error.message,
      };
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
            <AssetsTable
              setModalContent={setModalContent}
              userAssets={userPortfolio.assets}
            />
            <AssetsModal
              modalContent={modalContent}
              onSubmit={onSubmitAsset}
              setModalContent={setModalContent}
            />
          </>
        )}
      </div>
    )
  );
};

export default Dashboard;
