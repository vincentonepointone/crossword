const express = require("express");
const cors = require("cors");
const path = require("path");
var clg = require("crossword-layout-generator");
const app = express();
const port = process.env.PORT || 1379;; // Change this to any desired port number
app.use(express.json());
app.use(cors());
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust this number based on your application's needs
  host: "127.0.0.1",
  user: "crossword1",
  password: "username",
  database: "crossword",
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.post("/post", (req, res) => {
  console.log("Received POST request with JSON data:");

  input_json = req.body; // The JSON data sent in the request body
  // console.log(input_json);
  const responseMessage = "Data received successfully.";
  res.status(200).json({ message: responseMessage });
  var layout = clg.generateLayout(input_json);
  var rows = layout.rows;
  var cols = layout.cols;
  var table = layout.table; // table as two-dimensional array
  var output_html = layout.table_string; // table as plain text (with HTML line breaks)
  var output_json = layout.result; // words along with orientation, position, startx, and starty
  // console.log(output_json)
  // console.log(output_html)

  //Convert output_json to front end lib json format

  class Crossword {
    constructor() {
      this.across = {};
      this.down = {};
    }

    addAcrossClue(number, clue, answer, row, col) {
      this.across[number] = { clue, answer, row, col };
    }

    addDownClue(number, clue, answer, row, col) {
      this.down[number] = { clue, answer, row, col };
    }
  }

  const crossword = new Crossword();
  output_json.forEach((wordObject) => {
    // console.log(wordObject)
    if (wordObject.orientation === "across") {
      crossword.addAcrossClue(
        wordObject.position,
        wordObject.clue,
        wordObject.answer,
        wordObject.starty,
        wordObject.startx
      );
    } else {
      crossword.addDownClue(
        wordObject.position,
        wordObject.clue,
        wordObject.answer,
        wordObject.starty,
        wordObject.startx
      );
    }
  });

  const { puzzleData } = crossword; // Assuming puzzleData is the JSON data containing the puzzle information
  // You can validate the puzzleData here to ensure it contains the necessary properties and data
  console.log(crossword);
  const INSERT_PUZZLE_QUERY = "INSERT INTO puzzles (data) VALUES (?)";
  const values = [JSON.stringify(crossword)];

  pool.query(INSERT_PUZZLE_QUERY, values, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Error adding crossword puzzle" });
    }
  });
});

// Define the GET request route for fetching puzzle data
app.get("/api/puzzle", (req, res) => {
  console.log("get Api hit");
  // Fetch puzzle data from the database
  const SELECT_PUZZLE_QUERY = "SELECT data FROM puzzles";

  pool.query(SELECT_PUZZLE_QUERY, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ error: "Error fetching crossword puzzles" });
    }

    // Assuming 'data' is the column name in the 'puzzles' table that stores the JSON puzzle data
    const puzzleData = results.map((row) => JSON.parse(row.data));

    // Return the fetched puzzle data as JSON response
    res.status(200).json(puzzleData);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// var input_json = [
//   {
//     clue: "that which is established as a rule or model by authority, custom, or general consent",
//     answer: "standard",
//   },
//   { clue: "a machine that computes", answer: "computer" },
//   {
//     clue: "the collective designation of items for a particular purpose",
//     answer: "equipment",
//   },
//   { clue: "an opening or entrance to an inclosed place", answer: "port" },
//   {
//     clue: "a point where two things can connect and interact",
//     answer: "interface",
//   },
// ];
