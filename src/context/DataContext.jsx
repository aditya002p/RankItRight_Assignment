import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchSheetData } from "../services/api";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const fetchedData = await fetchSheetData();
      setData(fetchedData);
      // Cache the data in localStorage
      localStorage.setItem("tableData", JSON.stringify(fetchedData));
    } catch (err) {
      setError(err);
      // Try to load from cache if fetch fails
      const cachedData = localStorage.getItem("tableData");
      if (cachedData) {
        setData(JSON.parse(cachedData));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{ data, isLoading, error, refreshData: loadData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
