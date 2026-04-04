const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector("input");

// currency → country mapping
const countryList = {
  USD: "US",
  INR: "IN",
  EUR: "EU",
  GBP: "GB",
  JPY: "JP"
};

// loop through dropdowns
dropdowns.forEach(select => {

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });

  updateFlag(select);
});

// 🔥 FLAG FUNCTION
function updateFlag(element) {
  const currCode = element.value;
  const countryCode = countryList[currCode];

  const container = element.closest(".select-container");
  const img = container.querySelector("img");

  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// 🔥 NEW FUNCTION: GET EXCHANGE RATE
async function updateExchangeRate() {
  let amount = amountInput.value;

  if (amount === "" || amount < 1) {
    amount = 1;
    amountInput.value = "1";
  }

  const fromCurrency = document.querySelector("[name='from']").value.toLowerCase();
  const toCurrency = document.querySelector("[name='to']").value.toLowerCase();

  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurrency][toCurrency];

    let finalAmount = amount * rate;

    msg.innerText = `${amount} ${fromCurrency.toUpperCase()} = ${finalAmount.toFixed(2)} ${toCurrency.toUpperCase()}`;

  } catch (error) {
    msg.innerText = "Error fetching exchange rate!";
    console.log(error);
  }
}

// 🔥 BUTTON CLICK
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// 🔥 PAGE LOAD pe bhi run ho
window.addEventListener("load", () => {
  updateExchangeRate();
});