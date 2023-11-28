'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import AssetsModal from './AssetsModal';
import AssetsTable from './AssetsTable';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { addAsset, buyOrSellAsset, deleteAsset, getUserPortfolioData } from '@/api/assets';
import { formatCurrency, formatPercentage } from '@/utils/helpers';
import PAGE from '@/utils/routes';
import { ASSET_FORM_FIELD, DASHBOARD_HEADER_FIELD, MODAL_CONTENT } from './constants';
import './Dashboard.scss';

const Dashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState({});
  const [modalContent, setModalContent] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const onSubmitAsset = async (event) => {
    event.preventDefault();
    const currentModalContent = modalContent;
    let newModalContent = {};

    setModalContent({});
    setShowLoader(true);

    try {
      if (currentModalContent.action === MODAL_CONTENT.ADD_ASSET.FORM.action) {
        await addAsset(
          userPortfolio.assets.map((asset) => asset.symbol),
          event.target.symbol.value,
          event.target.numShares.valueAsNumber,
          event.target.pricePerShare.valueAsNumber
        );
        newModalContent = MODAL_CONTENT.ADD_ASSET.SUCCESS_RESPONSE;
      } else if (currentModalContent.action === MODAL_CONTENT.BUY_OR_SELL_ASSET.FORM.action) {
        const isBuy = event.target.buyOrSell.value === ASSET_FORM_FIELD.BUY_RADIO_BUTTON.value;
        const symbol = event.target.symbol.value;
        const userAsset = userPortfolio.assets.find((asset) => asset.symbol === symbol);
        await buyOrSellAsset(
          userAsset,
          isBuy,
          symbol,
          event.target.numShares.valueAsNumber,
          event.target.pricePerShare.valueAsNumber
        );
        newModalContent = MODAL_CONTENT.BUY_OR_SELL_ASSET.SUCCESS_RESPONSE;
      } else if (currentModalContent.action === MODAL_CONTENT.DELETE_ASSET.FORM.action) {
        await deleteAsset(currentModalContent.symbol);
        newModalContent = MODAL_CONTENT.DELETE_ASSET.SUCCESS_RESPONSE;
      }

      setUserPortfolio(await getUserPortfolioData());
    } catch (error) {
      newModalContent = { ...MODAL_CONTENT.ERROR_RESPONSE, body: error.message };
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
      <div className='dashboard'>
        <Navbar />
        <Loader isVisible={isEmpty(userPortfolio) || showLoader} />
        {!isEmpty(userPortfolio) && (
          <>
            <div className='dashboard__total-value'>
              <span className='dashboard__total-value-amount'>{formatCurrency(userPortfolio.totalValue)}</span>
              <span className='dashboard__total-value-status'>{`${formatCurrency(
                userPortfolio.returnAmount
              )} (${formatPercentage(userPortfolio.returnPct)}) ${
                userPortfolio.returnAmount > 0 ? DASHBOARD_HEADER_FIELD.gainLabel : DASHBOARD_HEADER_FIELD.lossLabel
              }`}</span>
            </div>
            <AssetsTable setModalContent={setModalContent} userAssets={userPortfolio.assets} />
            <AssetsModal modalContent={modalContent} onSubmit={onSubmitAsset} setModalContent={setModalContent} />
          </>
        )}
      </div>
    )
  );
};

export default Dashboard;
