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
import { addNewAsset, getUserPortfolioData } from '@/api/assets';
import PAGE from '@/utils/routes';
import { MODAL_CONTENT } from './constants';
import './Dashboard.scss';

const Dashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState({});
  const [modalContent, setModalContent] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const onSubmitAsset = async (event) => {
    event.preventDefault();
    setShowLoader(true);

    let newModalContent = {};

    try {
      if (modalContent.action === MODAL_CONTENT.ADD_ASSET.FORM.action) {
        setModalContent({});
        await addNewAsset(event.target.symbol.value, event.target.numShares.value, event.target.pricePerShare.value);
        newModalContent = MODAL_CONTENT.ADD_ASSET.SUCCESS_RESPONSE;
      }

      setUserPortfolio(await getUserPortfolioData());
    } catch (error) {
      newModalContent = { ...MODAL_CONTENT.ADD_ASSET.ERROR_RESPONSE, body: error.message };
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
