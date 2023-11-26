import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Button, Table } from 'react-bootstrap';
import { BiSolidTrash, BiTransfer } from 'react-icons/bi';
import { formatCurrency, formatPercentage } from '@/utils/helpers';
import { MODAL_CONTENT, TABLE_FIELD } from '../constants';
import './AssetsTable.scss';

const AssetsTable = ({ setModalContent, userAssets }) => {
  return (
    <div className='assets-table'>
      <div className='assets-table__header'>
        <span className='assets-table__title'>{TABLE_FIELD.TITLE}</span>
        <Button
          className='assets-table__add-asset-button'
          onClick={() => {
            setModalContent(MODAL_CONTENT.ADD_ASSET.FORM);
          }}
        >
          {TABLE_FIELD.BUTTON_LABEL.addAsset}
        </Button>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th className='assets-table__heading--blank'>{TABLE_FIELD.HEADER.symbol}</th>
            <th className='assets-table__heading'>{TABLE_FIELD.HEADER.assetPrice}</th>
            <th className='assets-table__heading'>{TABLE_FIELD.HEADER.totalValue}</th>
            <th className='assets-table__heading'>{TABLE_FIELD.HEADER.return}</th>
            <th className='assets-table__heading--blank'>{TABLE_FIELD.HEADER.actions}</th>
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
                  <span>{formatCurrency(asset.price)}</span>
                  <br />
                  <span>{asset.currency}</span>
                </td>
                <td className='assets-table__row-item'>
                  <span>{formatCurrency(asset.totalValue)}</span>
                  <br />
                  <span>{`${asset.numShares} ${
                    asset.numShares === 1 ? TABLE_FIELD.ITEM_LABEL.shareSuffix : TABLE_FIELD.ITEM_LABEL.sharesSuffix
                  }`}</span>
                </td>
                <td className='assets-table__row-item'>
                  <span>{formatCurrency(asset.returnAmount)}</span>
                  <br />
                  <span>{formatPercentage(asset.returnPct)}</span>
                </td>
                <td className='assets-table__row-item'>
                  <Button
                    className='assets-table__action-button'
                    onClick={() => setModalContent({ ...MODAL_CONTENT.BUY_OR_SELL_ASSET.FORM, symbol: asset.symbol })}
                  >
                    <BiTransfer />
                  </Button>
                  <Button
                    className='assets-table__action-button'
                    onClick={() => setModalContent({ ...MODAL_CONTENT.DELETE_ASSET.FORM, symbol: asset.symbol })}
                  >
                    <BiSolidTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='assets-table__no-data-response' colSpan={5}>
                {TABLE_FIELD.NO_DATA_RESPONSE}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

AssetsTable.propTypes = {
  setModalContent: PropTypes.func.isRequired,
  userAssets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default AssetsTable;
