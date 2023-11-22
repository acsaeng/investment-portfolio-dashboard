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
import PAGE from '@/utils/routes';
import { MODAL_CONTENT } from './constants';
import './Dashboard.scss';
import { ASSET_FORM_FIELD } from './AssetsModal/constants';

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
        const isBuy = event.target.buyOrSell.value === ASSET_FORM_FIELD.BUY_OR_SELL.buyValue;
        await buyOrSellAsset(
          isBuy,
          event.target.symbol.value,
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
              <span className='dashboard__total-value-amount'>{userPortfolio.totalValue}</span>
              <span className='dashboard__total-value-status'>{`${userPortfolio.returnAmount} (${
                userPortfolio.returnPct
              }) ${userPortfolio.isNetGain ? 'gain' : 'loss'}`}</span>
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
