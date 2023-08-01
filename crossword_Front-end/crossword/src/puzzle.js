import React from "react";
// import Crossword from "@jaredreisinger/react-crossword";
import Crossword, { ThemeProvider } from "@jaredreisinger/react-crossword";
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




export default function puzzle() {
      
  return (
    <div className="container">
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
        <Crossword data={data} useStorage={false} />
      </ThemeProvider>
    </div>
  );
  }
