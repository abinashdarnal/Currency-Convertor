document.querySelector("#amount").value = "1";
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

// Event listener for currency dropdowns (select)

[fromCur, toCur].forEach((select, i) => {
  for (let curCode in Country_List) {
    const selected =
      (i === 0 && curCode === "USD") || (i === 1 && curCode === "NPR")
        ? "selected"
        : "";
    select.insertAdjacentHTML(
      "beforeend",
      `<option value = "${curCode}" ${selected}>${curCode}</option>`
    );
  }
  select.addEventListener("change", () => {
    const code = select.value;
    const imgFlag = select.parentElement.querySelector("img");
    imgFlag.src = `https://flagcdn.com/48x36/${Country_List[
      code
    ].toLowerCase()}.png`;
  });
});

// function to get exchange rate from api

async function getExchangeRate() {
  const amountVal = amount.value || 1;
  exRateTxt.innerText = "Getting ExChange Rate...";
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/2c2f2ea585daf585662cab7f/latest/${fromCur.value}`
    );
    const result = await response.json();
    const exChangeRate = result.conversion_rates[toCur.value];
    const totalExRate = (amountVal * exChangeRate).toFixed(2);
    exRateTxt.innerText = `${amountVal} ${fromCur.value} =    ${totalExRate} ${toCur.value} `;
  } catch (error) {
    exRateTxt.innerText = `Somrthing Went Wrong...`;
  }
}

//Event listeners for button and Exchange icon click
window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (a) => {
  a.preventDefault();
  getExchangeRate();
});

exIcon.addEventListener("click", () => {
  [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
  [fromCur, toCur].forEach((select) => {
    const code = select.value;
    const imgFlag = select.parentElement.querySelector("img");
    imgFlag.src = `https://flagcdn.com/48x36/${Country_List[
      code
    ].toLowerCase()}.png`;
  });
  getExchangeRate();
});
