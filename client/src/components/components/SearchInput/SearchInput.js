import React from "react";
import PropTypes from "prop-types";
import MagniferSvg from "../../../styles/images/MagniferSvg";

function SearchInput({ dataLength, query, onChange, onSearchData }) {
  const onEnterPress = (event) => {
    if (event.key === "Enter") {
      onSearchData();
    }
  };

  return (
    <div className="search-component">
      <MagniferSvg />
      <input
        onKeyPress={onEnterPress}
        value={query}
        onChange={onChange}
        className="search-component__input"
        placeholder="What test are you looking for?"
      />
      <span className="search-component__tests-quantity span-sub-information">{`${dataLength} tests`}</span>
    </div>
  );
}

SearchInput.propTypes = {
  dataLength: PropTypes.number,
  query: PropTypes.string,
  onChange: PropTypes.func,
  onSearchData: PropTypes.func,
};

export default SearchInput;
