import { validateName } from "./nameChecker";

const SERVER_URL = "http://localhost:8000/";

document.addEventListener("DOMContentLoaded", () => {
  setupFormListener();
});

function setupFormListener() {
  const formElement = document.querySelector("#nameForm");
  if (formElement) {
    formElement.onsubmit = processFormSubmission;
  }
}

function processFormSubmission(event) {
  event.preventDefault();
  
  const userInput = document.querySelector("#name").value.trim();
  
  if (!validateName(userInput)) {
    updateUI("Please, enter a valid name", true);
    return;
  }
  
  submitData(SERVER_URL, { name: userInput })
    .then((response) => handleServerResponse(response))
    .catch(() => updateUI("An error occurred. Please try again.", true));
}

async function submitData(endpoint, data) {
  const requestOptions = {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(endpoint, requestOptions);
  return response.json();
}

function handleServerResponse(responseData) {
  if (responseData.msg) {
    updateUI(responseData.msg, true);
  } else {
    displayAnalysisResults(responseData.sample);
  }
}

function updateUI(message, isError = false) {
  const resultSection = document.querySelector("#results");
  resultSection.innerHTML = `<p class="${isError ? "error" : "success"}">${message}</p>`;
}

function displayAnalysisResults(data) {
  const { agreement, subjectivity, confidence, score_tag, irony } = data;
  const resultSection = document.querySelector("#results");

  resultSection.innerHTML = `
    <ul>
      <li><strong>Agreement:</strong> ${agreement}</li>
      <li><strong>Subjectivity:</strong> ${subjectivity}</li>
      <li><strong>Confidence:</strong> ${confidence}</li>
      <li><strong>Score Tag:</strong> ${score_tag}</li>
      <li><strong>Irony:</strong> ${irony}</li>
    </ul>
  `;
}

export { processFormSubmission };
