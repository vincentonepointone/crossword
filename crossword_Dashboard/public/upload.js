document.addEventListener("DOMContentLoaded", () => {
  const serverURL = "/post";
  let wordCount = 0;
  // HTML elements
  const addButton = document.getElementById("addButton");
  const getDataButton = document.getElementById("getDataButton");
  const generateButton = document.getElementById("generateButton");
  const dataContainer = document.getElementById("dataContainer");

  const wordList = document.getElementById("wordList");
  const clueList = document.getElementById("clueList");
  const crosswordArrayOfObjects = [];
  const word = document.getElementById("wordInput");
  const clue = document.getElementById("clueInput");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");

  // Bootsrap 5 Modal 
  var myModalEl = document.getElementById("modal");
  var modal = new bootstrap.Modal(myModalEl);

  
  let showModal = (message, title) => {
    modalTitle.innerText = title;
    modalMessage.innerHTML = message;
    modal.show();
  }

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

      showModal(
        "Crossword puzzle generated.",
        `<a hreff="./">Link to the crossword page<a/>" Scroll to the bottom! `
      );
  });

    getDataButton.addEventListener("click", () => {
    fetch("/api/puzzle")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data received is a JSON object
        // You can customize this based on your API response format
        console.log(data)
      dataContainer.innerText = JSON.stringify(data);
      dataContainer.style.marginBottom = "300px";
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    });
  













});

