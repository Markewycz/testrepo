let timerId;
const searchIcon = document.getElementById("searchIcon");
const dropdown = document.getElementById("dropdown");
const searchInput = document.getElementById("searchInput");
const inputIconWrapper = document.querySelector(".input-icon-wrapper");
let prevInputValue = "";
let inputValue = 0;
let inputCalculated = 0;
let username = "";

function debounce(func, delay) {
  return function (value) {
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      func(value);
    }, delay);
  };
}

function showDropdown(value) {
  // Clear previous dropdown items
  dropdown.innerHTML = "";

  if (value.length > 0) {
    // Create dropdown item with typed text and search icon
    const item = document.createElement("div");
    item.classList.add("dropdown-item");

    const svg = document.createElement("object");
    svg.classList.add("search-icon");
    svg.data = "images/search-icon.svg";
    svg.type = "image/svg+xml";

    const text = document.createElement("span");
    text.textContent = value;

    item.appendChild(svg);
    item.appendChild(text);

    // Close the dropdown, clear the input, and hide the search icon when a dropdown item is clicked
    item.addEventListener("click", function () {
      searchInput.value = value; // Keep the input value
      dropdown.style.display = "none";
      // searchInput.focus(); // Reactivate the search input
    });

    dropdown.appendChild(item);

    // Show the dropdown
    dropdown.style.display = "block";

    // Show the search icon
    inputIconWrapper.style.display = "block";
  } else {
    // Hide the dropdown if input is empty
    dropdown.style.display = "none";

    // Hide the search icon if dropdown is hidden
    inputIconWrapper.style.display = "none";
  }
}

function clearInput() {
  searchInput.value = "";
  searchInput.focus(); // Reactivate the search input
  dropdown.style.display = "none"; // Hide the dropdown
  inputIconWrapper.style.display = "none"; // Hide the input icon
}

function formatNumber(input) {
  var value = input.value.replace(/,/g, ""); // Remove existing commas
  var formattedValue = Number(value).toLocaleString(); // Format the number with commas
  input.value = formattedValue; // Update the input value

  // Calculate and display the output
  var output = " € " + (Number(value) * 0.012857).toFixed(2);
  document.getElementById("total").textContent = output;
  inputCalculated = output;
}

function calculateOutput() {
  var input = document.getElementById("input-text").value;
  inputValue = parseFloat(input.replace(/,/g, ""));
  // Minimum value requirement
  var minimumValue = 30; // Example minimum value
  var errorMessage = document.getElementById("minimum-value-error");
  const submitButton = document.getElementById("submitButton");

  if (input !== "" && parseFloat(input.replace(/,/g, "")) < minimumValue) {
    errorMessage.innerHTML = `
      <img src="images/clear-red.svg" style="width: 16px; fill: rgb(255, 0, 0)"/>
      <span>Minimum amount 30</span>
      
    `;
    submitButton.classList.remove("available");
  } else {
    errorMessage.textContent = "";
    submitButton.classList.add("available");
  }
}

function openModal() {
  const custom = document.getElementById("custom-value");
  const modal = document.getElementById("modal");
  const searchInput = document.getElementById("searchInput");

  username = searchInput.value;

  modal.innerHTML = `
  <div class="modal-1-content">
        <div class="modal-header">
          <h3>Custom amount</h3>
          <span id="modalExit" class="exit" onclick="closeModal()"
            ><image src="images/exit.svg" alt="jpg"></image
          ></span>
        </div>
        <div class="modal-input">
          <div class="display">
            <span class="tiktok-240y52-SpanNumIcon e4yj8b62">
              <img class= "coin-coin" src="images/coin-small.svg"></img>
            </span>
            <input
              id="input-text"
              class="display-input"
              type="text"
              placeholder="30 - 2,500,000"
              oninput="formatNumber(this); calculateOutput(this.value)"
            />
          </div>
          <div id="minimum-value-error" class="error-message"></div>
          <div class="keyboard">
            <button class="btn-keyboard">1</button>
            <button class="btn-keyboard">2</button>
            <button class="btn-keyboard">3</button>
            <button class="btn-keyboard" id="btn-delete"><img src="images/arrow.svg" alt="Delete" class="arrow"/></button>
            <button class="btn-keyboard">4</button>
            <button class="btn-keyboard">5</button>
            <button class="btn-keyboard">6</button>
            <button class="btn-keyboard">Clear</button>
            <button class="btn-keyboard">7</button>
            <button class="btn-keyboard">8</button>
            <button class="btn-keyboard">9</button>
            <button class="btn-keyboard">0</button>
          </div>
        </div>
        <div class="total">
          Total <span id="total" class="total-value">€ 0.00</span>
        </div>
        <div class="modal-submit">
          <object data="images/question-small.svg"></object>
          <button onclick="nextModal()" class="btn-submit" id="submitButton">
            Recharge
          </button>
        </div>
      </div>
  `;

  custom.classList.add("active");
  modal.classList.add("show");

  const input = document.getElementById("input-text");

  // Add click event listener to each button
  const keyboardButtons = document.querySelectorAll(".btn-keyboard");
  keyboardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;
      console.log(value);
      if (value === "Clear") {
        // Clear the input field
        input.value = "";
      } else if (value === "") {
        // Remove the last digit from the input value
        input.value = input.value.slice(0, -1);
      } else {
        // Append the clicked button value to the input value
        input.value += value;
      }
      formatNumber(input);
      calculateOutput(input.value);
    });
  });
}

function closeModal() {
  const submitButton = document.getElementById("submitButton");
  const modal = document.getElementById("modal");
  const custom = document.getElementById("custom-value");
  const total = document.getElementById("total");
  const input = document.getElementById("input-text");
  const errorMessage = document.getElementById("minimum-value-error");

  input.value = "";
  errorMessage.textContent = "";
  total.textContent = "€ 0.00";
  submitButton.classList.remove("available");
  modal.classList.remove("show");
  custom.classList.remove("active");
}
//  0.012857

// KEYBOARD
// Get the input element

function nextModal() {
  const submit = document.getElementById("submitButton");
  const modal = document.getElementById("modal");
  submit.textContent = "";
  submit.innerHTML = `
  <i class="fa-solid fa-spinner fa-rotate-180"></i>
  `;
  // Generate a random delay between 0.8s and 1.7s
  const delay = Math.floor(Math.random() * 900) + 800;

  setTimeout(() => {
    modal.innerHTML = `
    <div class="modal-1-content">
    <div class="modal-header header-2">
      <h3>Order summary</h3>
      <span id="modalExit" class="exit" onclick="closeModal()">
        <image src="images/exit.svg" alt="jpg"></image>
      </span>
    </div>
    <div class="modal-summary">
      <div class="account">
        <h4>Account</h4>
        <p id="usernameText" class="username"></p>
      </div>
      <div id="amount-coins" class="amount-coins"></div>
      <div class="payment">
        <p class="p-payment">Selected Payment method</p>
        <div class="card-info">
          <img
            src="https://lf16-co.g-p-static.com/obj/pipo-sgcompliance/sky/visa_light_c558fb.svg"
            data-e2e="wallet-payment-icon-VISA"
            alt="Visa"
            class="tiktok-1quc8c-ImgPaymentIcon e1sbo8o85"
          />
          <p>************2456</p>
        </div>
      </div>
    </div>
    <div class="total total-2">
      Total <span id="total" class="total-value">€ 0.00</span>
    </div>
    <div class="modal-submit submit-2">
      <object data="images/question-small.svg"></object>
      <button onclick="processPaymentModal()" class="btn-submit available" id="payNow">
        Pay now
      </button>
    </div>
    `;
    const usernameText = document.getElementById("usernameText");
    const total = document.getElementById("total");
    const amountCoins = document.getElementById("amount-coins");

    
    usernameText.textContent = username;
    amountCoins.textContent = inputValue.toLocaleString("en-US") + " Coins";
    total.textContent = inputCalculated;
  }, delay);
}

function processPaymentModal() {
  const submit = document.getElementById("payNow");
  const modal = document.getElementById("modal");
  submit.textContent = "";
  submit.innerHTML = `
  <i class="fa-solid fa-spinner fa-rotate-180"></i>
  `;

  const delay = Math.floor(Math.random() * 900) + 800;
  const delayNormal = Math.floor(Math.random() * (3600 - 2000 + 1)) + 2000;
  const delayLong = Math.floor(Math.random() * (8000 - 4600 + 1)) + 4600;

  setTimeout(() => {
    modal.innerHTML = `
      <div id="modalContent" class="modal-1-content payment-modal">
      <div class="time-logo">
        <img src="images/hourglass.svg" class="hourglass" />
      </div>
      <div class="payment-text">
        <h2>Processing your payment</h2>
        <p>This could take a few minutes</p>
      </div>
      <div class="timer-container"></div>
    `;

    const timerContainer = document.querySelector(".timer-container");
    const duration = 5 * 60; // 5 minutes (in seconds)
    startTimer(duration, timerContainer);

    const modalContent = document.getElementById("modalContent");

    setTimeout(() => {
      modalContent.innerHTML = `
        <div class="load-container">
          <div class="load tik"></div>
          <div class="load tok"></div>
        </div>
    `;

      setTimeout(() => {
        modal.innerHTML = `
      <div class="modal-1-content final-modal">
            <div class="modal-header final-header"></div>
            <div class="done-logo">
              <img class="done" src="images/done.svg" alt="done" />
            </div>
            <div class="final-text">
              <h3>Payment completed</h3>
              <p>
                You recharged <span id="final-total">12,352 Coins</span>. You can
                use them to send gifts!
              </p>
            </div>
            <button onclick="closeFinalModal()" class="btn-submit available final-btn" id="goBack">
              Go Back
            </button>
          </div>
      `;
        const finalTotal = document.getElementById("final-total");

        finalTotal.textContent = inputValue.toLocaleString("en-US") + " Coins";
      }, delayNormal);
    }, delayLong);
  }, delay);
}

function startTimer(duration, display) {
  let timer = duration;
  let minutes;
  let seconds;

  function updateTimer() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      // Timer has reached 0, do something
      clearInterval(timerInterval);
      // Add your desired actions here
    }
  }

  updateTimer(); // Immediately invoke the timer to display the initial time

  const timerInterval = setInterval(updateTimer, 1000); // Start the countdown
}

function closeFinalModal() {
  const modal = document.getElementById("modal");

  modal.classList.remove("show");
  modal.innerHTML = "";
}
