const tableOverlay = document.querySelector(".table-overlay");
const closeBtn = document.querySelector(".close-btn");
const form = document.querySelector(".form");
const formControl = document.querySelector(".form-control");
const table = document.querySelector(".table");
const tableBody = document.querySelector(".table-body");
const getDataBtn = document.querySelector(".btn");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "38dd258aebmshec9cdf190c739c7p13ae03jsne258e0911332",
    "X-RapidAPI-Host": "calorieninjas.p.rapidapi.com",
  },
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { value } = formControl;
  if (value) {
    getDataBtn.innerText = "Loading...";
    getData(value);
  }
  formControl.value = "";
});

async function getData(query) {
  try {
    const response = await fetch(
      `https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${query}`,
      options
    );
    const data = await response.json();
    getDataBtn.innerText = "Get Data";
    if (data.items[0] === undefined) {
      return;
    } else {
      displayData(data.items[0]);
      tableOverlay.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}

closeBtn.addEventListener("click", () => {
  tableOverlay.style.display = "none";
});

function displayData(obj) {
  tableBody.innerHTML = "";
  for (const prop in obj) {
    const tableRow = document.createElement("tr");
    const nutrientData = document.createElement("td");
    const amountData = document.createElement("td");
    nutrientData.innerText = `${prop}`;
    amountData.innerText = `${obj[prop]}`;
    tableRow.append(nutrientData, amountData);
    tableBody.appendChild(tableRow);
  }
}

function showAlert(message, type) {}
