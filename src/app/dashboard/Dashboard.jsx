'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import AssetsTable from './AssetsTable';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { getUserPortfolioData } from '@/api/assets';
import PAGE from '@/utils/routes';
import './Dashboard.scss';

const Dashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userPortfolio, setUserPorfoliio] = useState({});
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthorized(true);
        setUserPorfoliio(await getUserPortfolioData());
      } else {
        router.push(PAGE.SIGN_IN);
      }
    });
  }, []);

  return (
    isAuthorized && (
      <div className='dashboard'>
        <Navbar />
        {!isEmpty(userPortfolio) ? (
          <>
            <div className='dashboard__total-value'>
              <span className='dashboard__total-value-amount'>{userPortfolio.totalValue}</span>
              <span className='dashboard__total-value-status'>{`${userPortfolio.returnAmount} (${
                userPortfolio.returnPct
              }) ${userPortfolio.isNetGain ? 'gain' : 'loss'}`}</span>
            </div>
            <AssetsTable userAssets={userPortfolio.assets} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    )
  );
};

export default Dashboard;
