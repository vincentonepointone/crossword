import React, { useState, useEffect } from "react";
import Crossword, { ThemeProvider } from "@jaredreisinger/react-crossword";

const Puzzle = () => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [isLoading, setLoading] = useState(true); // State variable to track loading status

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:1379/api/puzzle");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();

      setData(jsonData); // Assuming the data is an array of crossword objects
      setLoading(false); // Set loading to false after successful data fetch
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="crossword-container">
      {isLoading ? (
        <p>Loading...</p> // Display a loading message while data is being fetched
      ) : data.length > 0 ? (
        data.map((crosswordData, index) => (
          <div className="crossword" key={index}>
            <ThemeProvider
              theme={{
                allowNonSquare: true,
                columnBreakpoint: "px",
                gridBackground: "#000",
                cellBackground: "#ffe",
                cellBorder: "#000",
                textColor: "#000",
                numberColor: "#000",
                focusBackground: "#f00",
                highlightBackground: "#f99",
              }}
            >
              <Crossword data={crosswordData} useStorage={false} />
            </ThemeProvider>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Puzzle;
