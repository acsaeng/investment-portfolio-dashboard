import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Table } from 'react-bootstrap';
import { NO_DATA_RESPONSE, TABLE_HEADER, TABLE_TITLE } from './constants';
import './AssetsTable.scss';

const AssetTable = ({ userAssets }) => {
  return (
    <div className='assets-table'>
      <span className='assets-table__title'>{TABLE_TITLE}</span>
      <Table striped hover>
        <thead>
          <tr>
            <th className='assets-table__header--symbol'>{TABLE_HEADER.symbol}</th>
            <th className='assets-table__header'>{TABLE_HEADER.assetPrice}</th>
            <th className='assets-table__header'>{TABLE_HEADER.totalValue}</th>
            <th className='assets-table__header'>{TABLE_HEADER.return}</th>
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
    </div>
  );
};

AssetTable.propTypes = {
  userAssets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default AssetTable;
