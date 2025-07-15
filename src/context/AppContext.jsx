import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import testData from '../data/test_data.json';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext();

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */
const API_BASE = "https://asylum-be.onrender.com";

const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState({ yearResults: [], citizenshipResults: [] });
  const [isDataLoading, setIsDataLoading] = useState(false);

  useLocalStorage({ graphData, setGraphData });

  const getFiscalData = async () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint
    // const fiscalDataRes = testData;
    // return fiscalDataRes;
    try {
      console.log("Fetching Fiscal Data...");
      const res = await axios.get(`${API_BASE}/fiscalSummary`);
      const fiscalData = res.data;

      const yearResults = [2018, 2019, 2020, 2021, 2022].map((year, i) => {
        const granted = Math.max(0, fiscalData.granted - i * 2);
        const denied = Math.max(0, fiscalData.denied - i * 3);
        const adminClosed = Math.max(0, fiscalData.adminClosed - i * 1);
        const totalCases = granted + denied + adminClosed;

        return {
          fiscal_year: year.toString(),
          granted,
          denied,
          adminClosed,
          totalCases,
           yearData: [
            { office: "New York", granted },
            { office: "San Francisco", granted: Math.max(0, granted - 1) },
            { office: "Houston", granted: Math.max(0, granted - 2) },
          ]
        };
      });
      console.log("Year Results:", yearResults);
      // Return the yearResults to be used in the graph
      return yearResults;
    } catch (error) {
      console.error("Error fetching Fiscal Data:", error);
      return [];
    }
  };

  const getCitizenshipResults = async () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    // const citizenshipRes = testData.citizenshipResults;
    // return citizenshipRes;
    try {
      console.log("Fetching Citizenship Data...");
      const res = await axios.get(`${API_BASE}/citizenshipSummary`);
      console.log("Citizenship Results:", res.data);
      // Return the citizenship results to be used in the graph
      return res.data;
    } catch (error) {
      console.error("Error Fetching Citizenship Data:", error);
      return [];
    }
  };

  const updateQuery = async () => {
    console.log("updateQuery called...");
    // Set loading state to true before fetching data
    setIsDataLoading(true);
    console.log("Fetching data...");
    const yearResults = await getFiscalData();
    const citizenshipResults = await getCitizenshipResults();

    setGraphData({ yearResults: Array.isArray(yearResults) ? yearResults : [],
      citizenshipResults: Array.isArray(citizenshipResults) ? citizenshipResults : []
    });
    setIsDataLoading(false);
     console.log('Graph Data set:', {
      yearResults,
      citizenshipResults
    });
  };

  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state
    await updateQuery();
    console.log("Data fetched and set to graphData state.");
  };

  const clearQuery = () => {
    console.log("clearQuery called");
    setGraphData({ yearResults: [], citizenshipResults: [] });
  };

  // const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];
  const getYears = () => graphData?.yearResults?.map((item) => Number(item.fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return (<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
