import React from "react";
// import Crossword from "@jaredreisinger/react-crossword";
import Crossword, { ThemeProvider } from "@jaredreisinger/react-crossword";
// import { useState, useEffect } from "react";
// import axios from "axios";

const data = {
  across: {
    2: {
      clue: "a machine that computes",
      answer: "computer",
      row: 2,
      col: 3,
    },
    3: {
      clue: "the collective designation of items for a particular purpose",
      answer: "equipment",
      row: 4,
      col: 1,
    },
  },
  down: {
    1: {
      clue: "that which is established as a rule or model by authority, custom, or general consent",
      answer: "standard",
      row: 1,
      col: 8,
    },
    4: {
      clue: "an opening or entrance to an inclosed place",
      answer: "port",
      row: 4,
      col: 5,
    },
    5: {
      clue: "a point where two things can connect and interact",
      answer: "interface",
      row: 1,
      col: 1,
    },
  }, 
};

const puzzle = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:1111/api/puzzle");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const jsonData = await response.json();
  //       setData(jsonData[0]); // Assuming the data is inside the first item of the array
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Check the fetched data in the console
  

  return (
    <div className="container">
  
        <ThemeProvider
          // key={index}
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
          <Crossword data={data} useStorage={false} />
        </ThemeProvider>

    </div>
  );
};



export default puzzle;
