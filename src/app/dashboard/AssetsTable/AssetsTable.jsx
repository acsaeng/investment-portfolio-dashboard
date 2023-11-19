'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Button, Form, Table } from 'react-bootstrap';
import Modal from '@/app/components/Modal';
import Loader from '@/app/components/Loader';
import { addNewAsset, getUserPortfolioData } from '@/api/assets';
import {
  ADD_NEW_ASSET_BUTTON_LABEL,
  ASSET_FORM_FIELD,
  MODAL_CONTENT,
  NO_DATA_RESPONSE,
  TABLE_HEADER,
  TABLE_TITLE,
  USER_ACTION,
} from './constants';
import './AssetsTable.scss';

const AssetTable = ({ setUserPortfolio, userAssets }) => {
  const [userAction, setUserAction] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setUserAction(null);
    setModalContent(null);
    setShowLoader(true);

    let modalContent;

    try {
      if (userAction === USER_ACTION.ADD_NEW_ASSET) {
        await addNewAsset(event.target.symbol.value, event.target.numShares.value, event.target.pricePerShare.value);
        modalContent = MODAL_CONTENT.ADD_NEW_ASSET.SUCCESS_RESPONSE;
      }

      setUserPortfolio(await getUserPortfolioData());
    } catch (error) {
      modalContent = { ...MODAL_CONTENT.ADD_NEW_ASSET.ERROR_RESPONSE, body: error.message };
    }

    setShowLoader(false);
    setModalContent(modalContent);
  };

  return (
    <div className='assets-table'>
      <Loader isVisible={showLoader} />
      <div className='assets-table__header'>
        <span className='assets-table__title'>{TABLE_TITLE}</span>
        <Button
          className='assets-table__add-asset-button'
          onClick={() => {
            setUserAction(USER_ACTION.ADD_NEW_ASSET);
            setModalContent(MODAL_CONTENT.ADD_NEW_ASSET.FORM);
          }}
        >
          {ADD_NEW_ASSET_BUTTON_LABEL}
        </Button>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th className='assets-table__heading--symbol'>{TABLE_HEADER.symbol}</th>
            <th className='assets-table__heading'>{TABLE_HEADER.assetPrice}</th>
            <th className='assets-table__heading'>{TABLE_HEADER.totalValue}</th>
            <th className='assets-table__heading'>{TABLE_HEADER.return}</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(userAssets) ? (
            userAssets.map((asset) => (
              <tr className='assets-table__row' key={asset.symbol}>
                <td className='assets-table__row-item'>
                  <span>{asset.symbol}</span>
                  <br />
                  <span>{asset.name}</span>
                </td>
                <td className='assets-table__row-item'>
                  <span>{asset.price}</span>
                  <br />
                  <span>{asset.currency}</span>
                </td>
                <td className='assets-table__row-item'>
                  <span>{asset.totalValue}</span>
                  <br />
                  <span>{asset.numShares}</span>
                </td>
                <td className='assets-table__row-item'>
                  <span>{asset.returnAmount}</span>
                  <br />
                  <span>{asset.returnPct}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='assets-table__no-data-response' colSpan={4}>
                {NO_DATA_RESPONSE}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {modalContent && (
        <Modal
          buttonAttributes={{
            ...(userAction
              ? { form: 'asset-form', type: 'submit' }
              : {
                  onClick: () => {
                    setModalContent(null);
                  },
                }),
          }}
          buttonLabel={modalContent.buttonLabel}
          closeButton={!!userAction}
          onHide={() => {
            setUserAction(null);
            setModalContent(null);
          }}
          title={modalContent.title}
        >
          {modalContent.body || (
            <Form className='assets-table__asset-form' id='asset-form' onSubmit={onSubmit}>
              <Form.Control
                className='assets-table__asset-form-input'
                maxLength={ASSET_FORM_FIELD.SYMBOL.maxLength}
                name={ASSET_FORM_FIELD.SYMBOL.name}
                placeholder={ASSET_FORM_FIELD.SYMBOL.label}
                required
              />
              <Form.Control
                className='assets-table__asset-form-input'
                min={ASSET_FORM_FIELD.NUM_SHARES.min}
                name={ASSET_FORM_FIELD.NUM_SHARES.name}
                placeholder={ASSET_FORM_FIELD.NUM_SHARES.label}
                required
                type={ASSET_FORM_FIELD.NUM_SHARES.type}
              />
              <Form.Control
                className='assets-table__asset-form-input'
                maxLength={ASSET_FORM_FIELD.PRICE_PER_SHARE.maxLength}
                min={ASSET_FORM_FIELD.PRICE_PER_SHARE.min}
                name={ASSET_FORM_FIELD.PRICE_PER_SHARE.name}
                placeholder={ASSET_FORM_FIELD.PRICE_PER_SHARE.label}
                required
                step={ASSET_FORM_FIELD.PRICE_PER_SHARE.step}
                type={ASSET_FORM_FIELD.PRICE_PER_SHARE.type}
              />
            </Form>
          )}
        </Modal>
      )}
    </div>
  );
};

AssetTable.propTypes = {
  setUserPortfolio: PropTypes.func.isRequired,
  userAssets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default AssetTable;
