import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function SortingIcon({ sortingByAscending }) {
  const sortingIconClassName = classNames("sorting-icon", {
    "sorting-icon__reverse": !sortingByAscending,
  });

  return (
    <svg
      className={sortingIconClassName}
      width="7"
      height="4"
      viewBox="0 0 7 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 3.50001L3.13529 0.364716L3.5 7.15256e-06L3.86471 0.364716L7 3.50001L6.63529 3.86472L3.5 0.729424L0.364708 3.86472L0 3.50001Z"
        fill="#999999"
      />
    </svg>
  );
}

SortingIcon.propTypes = {
  sortingByAscending: PropTypes.bool,
};

export default SortingIcon;
