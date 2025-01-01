const apiKey = "81b05a347fa9182fc6867c46";
const baseCurrency = "USD";
const countrySelect = document.getElementById("countrySelect");
const displayRate = document.getElementById("displayRate");
const convertBtn = document.getElementById("convertBtn");

async function getConversionRate() {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
    );
    const data = await response.json();
    const conversionRates = data.conversion_rates;
    console.log(conversionRates);
    // Create select elements for currencies
    function createSelectElement(id) {
      const select = document.createElement("select");
      select.id = id;
      select.className = "currencySelect";

      // Loop through the conversion rates to create options
      for (let currency in conversionRates) {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency; // Option text will be the currency code (e.g., USD, INR)
        select.appendChild(option);
      }
      return select;
    }

    // Create and append select elements
    const select1 = createSelectElement("select1");
    const select2 = createSelectElement("select2");
    countrySelect.prepend(select1);
    countrySelect.appendChild(select2);

    //button funtion to calculate any numeber value in screen with the country currency
    convertBtn.addEventListener("click", () => {
      const amount = parseFloat(document.getElementById("screen").value);
      const fromCurrency = document.getElementById("select1").value;
      const toCurrency = document.getElementById("select2").value;

      if (!isNaN(amount) && fromCurrency && toCurrency) {
        const rateFromBase = conversionRates[fromCurrency];
        const rateToBase = conversionRates[toCurrency];
        const convertedAmount = (amount / rateFromBase) * rateToBase;
        displayRate.textContent = `Converted Amount: ${convertedAmount.toFixed()} ${toCurrency}`;
      } else {
        displayRate.textContent =
          "Please enter a valid amount and select currencies.";
      }
    });
  } catch (err) {
    console.log("Error:", err);
  }
}
getConversionRate();
