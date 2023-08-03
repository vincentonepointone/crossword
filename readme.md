1.1) Node version v18.16.1 required Run: "node -v" to check
2) cd crossword_Dashboard 
3) add mysql variables in /crossword_Dashboard/index.js line 13 to 16
3.1) create database crossword;
3.2) use crossword;
3.2) CREATE TABLE puzzles (   id INT AUTO_INCREMENT PRIMARY KEY,   data JSON );
4) Run: node index
5) cd /crossword/crossword_Front-end/crossword/
6) Run: "npm start" 
