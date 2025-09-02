import React from "react";
import { isEmpty } from "lodash";
import { Button, Table } from "react-bootstrap";
import { BiSolidTrash, BiTransfer } from "react-icons/bi";
import { AssetWithQuoteData } from "@/api/assets";
import { formatCurrency, formatPercentage } from "@/utils/helpers";
import { MODAL_CONTENT, TABLE_FIELD } from "../constants";
import "./AssetsTable.scss";

interface AssetsTableProps {
  setModalContent: (content: any) => void;
  userAssets: AssetWithQuoteData[];
}

const AssetsTable: React.FC<AssetsTableProps> = ({
  setModalContent,
  userAssets,
}) => {
  return (
    <div className="assets-table">
      <div className="header">
        <span className="title">{TABLE_FIELD.TITLE}</span>
        <Button
          className="add-asset-button"
          onClick={() => {
            setModalContent(MODAL_CONTENT.ADD_ASSET.FORM);
          }}
        >
          {TABLE_FIELD.BUTTON_LABEL.addAsset}
        </Button>
      </div>
      <Table className="table" striped hover>
        <thead>
          <tr>
            <th className="heading heading--blank">
              {TABLE_FIELD.HEADER.symbol}
            </th>
            <th className="heading">{TABLE_FIELD.HEADER.assetPrice}</th>
            <th className="heading">{TABLE_FIELD.HEADER.totalValue}</th>
            <th className="heading">{TABLE_FIELD.HEADER.return}</th>
            <th className="heading heading--blank">
              {TABLE_FIELD.HEADER.actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(userAssets) ? (
            userAssets.map((asset) => (
              <tr className="table-row" key={asset.symbol}>
                <td className="row-item">
                  <span className="field">{asset.symbol}</span>
                  <br />
                  <span className="field field--name">{asset.name}</span>
                </td>
                <td className="row-item">
                  <span className="field">{formatCurrency(asset.price)}</span>
                  <br />
                  <span className="field">{asset.currency}</span>
                </td>
                <td className="row-item">
                  <span className="field">
                    {formatCurrency(asset.totalValue)}
                  </span>
                  <br />
                  <span className="field">{`${asset.numShares} ${
                    asset.numShares === 1
                      ? TABLE_FIELD.ITEM_LABEL.shareSuffix
                      : TABLE_FIELD.ITEM_LABEL.sharesSuffix
                  }`}</span>
                </td>
                <td className="row-item">
                  <span className="field">
                    {formatCurrency(asset.returnAmount)}
                  </span>
                  <br />
                  <span className="field">
                    {formatPercentage(asset.returnPct)}
                  </span>
                </td>
                <td className="row-item">
                  <Button
                    className="action-button"
                    onClick={() =>
                      setModalContent({
                        ...MODAL_CONTENT.UPDATE_ASSET.FORM,
                        symbol: asset.symbol,
                      })
                    }
                  >
                    <BiTransfer />
                  </Button>
                  <Button
                    className="action-button"
                    onClick={() =>
                      setModalContent({
                        ...MODAL_CONTENT.DELETE_ASSET.FORM,
                        symbol: asset.symbol,
                      })
                    }
                  >
                    <BiSolidTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="no-data-response" colSpan={5}>
                {TABLE_FIELD.NO_DATA_RESPONSE}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AssetsTable;
