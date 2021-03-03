import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/index";
import ArrowBack from "../../../styles/images/ArrowBack";

import api from "../../../utils/api/api";

function DetailPages({ heading }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const testId = useParams().id;
  const [testData, setTestData] = useState("");

  const handleBackHistory = () => {
    history.goBack(-1);
  };

  useEffect(() => {
    setLoading(true);
    api
      .get(`/tests/${testId}`)
      .then((response) => {
        setLoading(false);
        setTestData(response.data);
      })
      .catch(({ message }) => {
        setLoading(false);
        console.log(message);
      });
  }, [testId]);

  return (
    <>
      <h1 className="page-heading heading-main">{heading}</h1>
      {loading && <Loader />}
      {!loading && (
        <>
          <span className="detail-test-span span-secondary">
            {testData.name}
          </span>
        </>
      )}
      <div className="back-history" onClick={handleBackHistory}>
        <ArrowBack />
        <span className="back-history__span span-history-back">Back</span>
      </div>
    </>
  );
}

DetailPages.propTypes = {
  heading: PropTypes.string,
};

export default DetailPages;
