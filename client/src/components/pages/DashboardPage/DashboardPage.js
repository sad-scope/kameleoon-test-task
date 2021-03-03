import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Table, SearchInput } from "../../components/index";
import axios from "axios";
import api from "../../../utils/api/api";

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [mutableData, setMutableData] = useState([]);
  const [sorting, setSorting] = useState({
    field: "statusId",
    order: "ascending",
  });
  const [query, setQuery] = useState("");

  const onChangeState = (testsArray, sitesArray) => {
    const colorSites = new Map();
    const extendedTests = [];

    sitesArray.forEach((site) => {
      colorSites.set(
        site.url,
        `#${Math.floor(Math.random() * 16777215).toString(16)}`
      );
    });

    testsArray.forEach((test) => {
      let site = sitesArray.find((site) => site.id === test.siteId);

      const onStatusId = (value) => {
        const statusNames = ["ONLINE", "PAUSED", "STOPPED", "DRAFT"];
        let statusId = null;
        statusNames.forEach((item, index) => {
          if (item === value) {
            statusId = index;
          }
        });
        return {
          status: value,
          statusId,
        };
      };
      extendedTests.push({
        ...test,
        siteUrl: site.url
          .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
          .split("/")[0],
        color: colorSites.get(site.url),
        status: onStatusId(test.status),
      });
    });

    return extendedTests;
  };

  const onSearchData = useCallback(() => {
    setMutableData(
      state.filter((data) =>
        data.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, state]);

  const onResetSearch = useCallback(() => {
    setQuery("");
    setMutableData(state);
  }, [state]);

  const fitData = useMemo(() => {
    let fitMutableData = mutableData;

    if (sorting.field === "statusId") {
      fitMutableData = fitMutableData.sort((a, b) =>
        sorting.order === "ascending"
          ? a.status[sorting.field] - b.status[sorting.field]
          : b.status[sorting.field] - a.status[sorting.field]
      );
    } else {
      const reversed = sorting.order === "ascending" ? 1 : -1;
      fitMutableData = fitMutableData.sort(
        (a, b) =>
          reversed * a[sorting.field].toString().localeCompare(b[sorting.field])
      );
    }

    return fitMutableData;
  }, [sorting, mutableData]);

  useEffect(() => {
    const promises = [api.get("/sites"), api.get("/tests")];
    const promisesResolved = promises.map((promise) =>
      promise.catch((error) => ({ error }))
    );

    function checkFailed(then) {
      return function (responses) {
        const someFailed = responses.some((response) => response.error);

        if (someFailed) {
          throw responses;
        }

        return then(responses);
      };
    }
    setLoading(true);
    axios
      .all(promisesResolved)
      .then(
        checkFailed(([url1, url2]) => {
          setLoading(false);
          setState(onChangeState(url2.data, url1.data));
        })
      )
      .catch((err) => {
        setLoading(false);
        console.log("FAIL", err);
      });
  }, []);

  useEffect(() => {
    setMutableData(state);
  }, [state]);

  return (
    <>
      <h1 className="page-heading heading-main">Dashboard</h1>
      <SearchInput
        dataLength={fitData.length}
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearchData={onSearchData}
      />
      <Table
        onSorting={(field, order) => setSorting({ field, order })}
        loading={loading}
        data={fitData}
        state={state}
        onResetSearch={() => onResetSearch()}
      />
    </>
  );
}

export default DashboardPage;
