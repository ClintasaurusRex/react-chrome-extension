import { getSummaries, deleteSummary, onStorageChange } from "./storage";
import React, { useEffect, useState } from "react";

const useSavedSummaries = function () {
  const [summaries, setSummaries] = useState({});

  const fetchSummaries = () => {
    getSummaries()
      .then((items) => {
        const copy = { ...items };
        delete copy.selectedTextForAI;
        setSummaries(copy);
      })
      .catch((error) => {
        console.error("Error retrieving summaries:", error);
      });
  };

  const handleDelete = (url) => {
    deleteSummary(url)
      .then(() => {
        fetchSummaries();
      })
      .catch((error) => {
        console.error("Error deleting summary:", error);
      });
  };

  
  const downloadSummary = (url, summary) => {
    
    const blob = new Blob([`URL: ${url}\nSummary: ${summary}`], { type: 'text/plain' });

    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'summary.txt'; // You can customize the file name if you want
    link.click();
  };

  useEffect(() => {
    fetchSummaries();
    onStorageChange((changes) => {
      fetchSummaries();
    });
  }, []);

  return {
    summaries,
    setSummaries,
    handleDelete,
    fetchSummaries,
    downloadSummary, 
  };
};
export default useSavedSummaries;