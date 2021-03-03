import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { tableHeadersCellsObj } from "./Data";
import { Loader } from "../index";
import SortingIcon from "../../../styles/images/SortingIcon";
import { useHistory } from "react-router-dom";

function Table({ data, onSorting, loading, state, onResetSearch }) {
  const history = useHistory();
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("ascending");

  const handleTrClick = (value, testId) => {
    if (value === "DRAFT") {
      history.push(`/finalize/${testId}`);
    } else {
      history.push(`/results/${testId}`);
    }
  };

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "ascending"
        ? "descending"
        : "ascending";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  const onStatusClassName = (value) => {
    if (value === "ONLINE") return "dashboard-table__td-body span-table-online";
    if (value === "STOPPED")
      return "dashboard-table__td-body span-table-stopped";
    if (value === "PAUSED") return "dashboard-table__td-body span-table-paused";
    if (value === "DRAFT") return "dashboard-table__td-body span-table-draft";
    return value;
  };

  const onLettersToLowerCase = (value) => {
    return value.toLowerCase();
  };

  const onTypeCase = (value) => {
    if (value === "CLASSIC") return "Classic";
    if (value === "SERVER_SIDE") return "Server-side";
    return value;
  };

  const renderButton = (value) => {
    const btnClassName = classNames("button-standart", {
      "button-finalize": value === "DRAFT",
    });
    if (value === "DRAFT") {
      return <div className={btnClassName}>Finalize</div>;
    }
    return <div className={btnClassName}>Results</div>;
  };
  console.log(data);
  return (
    <>
      {loading && <Loader />}
      {!loading && !data.length && state.length !== 0 && (
        <div className="no-search-results">
          <h1 className="no-search-results__heading heading-secondary">
            Your search did not match any results.
          </h1>
          <button
            className="button-standart no-search-results__button"
            onClick={onResetSearch}
          >
            Reset
          </button>
        </div>
      )}

      {!loading && data.length !== 0 && (
        <table className="dashboard-table">
          <thead>
            <tr className="dashboard-table__tr-head">
              <th className="dashboard-table__th"></th>
              {tableHeadersCellsObj.map(({ name, field, sortable }, index) => (
                <th
                  className="dashboard-table__th"
                  onClick={() => (sortable ? onSortingChange(field) : null)}
                  key={index}
                >
                  <div className="th-block">
                    <span className="th-block__span span-table-header">
                      {name}
                    </span>
                    {sortingField && sortingField === field && (
                      <SortingIcon
                        sortingByAscending={sortingOrder === "ascending"}
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="dashboard-table__th"></th>
            </tr>
          </thead>
          <tbody className="dashboard-table__tbody">
            {data.map((value) => (
              <tr
                className="dashboard-table__tr-body"
                key={value.id}
                onClick={() => handleTrClick(value.status.status, value.id)}
              >
                <td
                  className="dashboard-table__td-body"
                  style={{ background: value.color }}
                ></td>
                <td className="dashboard-table__td-body span-bolt">
                  {value.name}
                </td>
                <td className="dashboard-table__td-body span-main">
                  {onTypeCase(value.type)}
                </td>
                <td className={onStatusClassName(value.status.status)}>
                  {onLettersToLowerCase(value.status.status)}
                </td>
                <td className="dashboard-table__td-body span-main">
                  {value.siteUrl}
                </td>
                <td className="dashboard-table__td-body">
                  {renderButton(value.status.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  onSorting: PropTypes.func,
  loading: PropTypes.bool,
  onResetSearch: PropTypes.func,
  state: PropTypes.array,
};

export default Table;
