document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addButton");
  const generateButton = document.getElementById("generateButton");
  const serverURL = "/post";
  const wordList = document.getElementById("wordList");
  const clueList = document.getElementById("clueList");
  let wordCount = 0;
  const crosswordArrayOfObjects = [];
  const word = document.getElementById("wordInput");
  const clue = document.getElementById("clueInput");

    addButton.addEventListener("click", (e) => {
      console.log("click");
      wordCount++;
      let wordObject = {
        clue: clue.value,
        answer: word.value,
      };

      crosswordArrayOfObjects.push(wordObject);
      wordList.innerHTML += `
        <li class="list-group-item list-group-item-secondary">${wordCount})  ${word.value}</li>
      `;
      clueList.innerHTML += `<li class="list-group-item list-group-item-secondary">${wordCount})  ${clue.value}</li>`;
      console.log("end of function");
    });

  generateButton.addEventListener("click", () => {
    fetch(serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crosswordArrayOfObjects),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Server response:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("cox");
  });
});

