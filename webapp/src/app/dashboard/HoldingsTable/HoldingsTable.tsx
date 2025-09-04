import React from "react";
import { isEmpty } from "lodash";
import { Button, Table } from "react-bootstrap";
import { BiSolidTrash, BiTransfer } from "react-icons/bi";
import { HoldingWithQuoteData } from "@/api/holdings";
import { formatCurrency, formatPercentage } from "@/utils/helpers";
import { MODAL_CONTENT, TABLE_FIELD } from "../constants";
import "./HoldingsTable.scss";

interface HoldingsTableProps {
  setModalContent: (content: any) => void;
  userHoldings: HoldingWithQuoteData[];
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({
  setModalContent,
  userHoldings,
}) => {
  return (
    <div className="holdings-table">
      <div className="header">
        <span className="title">{TABLE_FIELD.TITLE}</span>
        <Button
          className="add-holding-button"
          onClick={() => {
            setModalContent(MODAL_CONTENT.ADD_HOLDING.FORM);
          }}
        >
          {TABLE_FIELD.BUTTON_LABEL.addHolding}
        </Button>
      </div>
      <Table className="table" striped hover>
        <thead>
          <tr>
            <th className="heading heading--blank">
              {TABLE_FIELD.HEADER.symbol}
            </th>
            <th className="heading">{TABLE_FIELD.HEADER.holdingPrice}</th>
            <th className="heading">{TABLE_FIELD.HEADER.totalValue}</th>
            <th className="heading">{TABLE_FIELD.HEADER.return}</th>
            <th className="heading heading--blank">
              {TABLE_FIELD.HEADER.actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(userHoldings) ? (
            userHoldings.map((holding) => (
              <tr className="table-row" key={holding.symbol}>
                <td className="row-item">
                  <span className="field">{holding.symbol}</span>
                  <br />
                  <span className="field field--name">{holding.name}</span>
                </td>
                <td className="row-item">
                  <span className="field">{formatCurrency(holding.price)}</span>
                  <br />
                  <span className="field">{holding.currency}</span>
                </td>
                <td className="row-item">
                  <span className="field">
                    {formatCurrency(holding.totalValue)}
                  </span>
                  <br />
                  <span className="field">{`${holding.numShares} ${
                    holding.numShares === 1
                      ? TABLE_FIELD.ITEM_LABEL.shareSuffix
                      : TABLE_FIELD.ITEM_LABEL.sharesSuffix
                  }`}</span>
                </td>
                <td className="row-item">
                  <span className="field">
                    {formatCurrency(holding.returnAmount)}
                  </span>
                  <br />
                  <span className="field">
                    {formatPercentage(holding.returnPct)}
                  </span>
                </td>
                <td className="row-item">
                  <Button
                    className="action-button"
                    onClick={() =>
                      setModalContent({
                        ...MODAL_CONTENT.UPDATE_HOLDING.FORM,
                        symbol: holding.symbol,
                      })
                    }
                  >
                    <BiTransfer />
                  </Button>
                  <Button
                    className="action-button"
                    onClick={() =>
                      setModalContent({
                        ...MODAL_CONTENT.DELETE_HOLDING.FORM,
                        symbol: holding.symbol,
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

export default HoldingsTable;
