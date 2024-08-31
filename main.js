document.addEventListener("DOMContentLoaded", () => {
	const convertButton = document.getElementById("convert");
	convertButton.addEventListener("click", convertCurrency);
	let currencyInfo;
	function GetCurrencyList() {
		return fetch(
			"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
		).then((res) => res.json());
	}

	function BuildCurrency() {
		let currencyList;
		GetCurrencyList().then((result) => {
			currencyList = result;
			console.log(currencyList);
			let fromcurrency = document.getElementById("fromCurrency");
			let tocurrency = document.getElementById("toCurrency");
			for (let key in currencyList) {
				let fromoption = document.createElement("option");
				fromoption.id = `${key}_from`;
				fromoption.value = key;
				fromoption.textContent = currencyList[key];
				fromcurrency.appendChild(fromoption);

				let tooption = document.createElement("option");
				tooption.id = `${key}_to`;
				tooption.value = key;
				tooption.textContent = currencyList[key];
				tocurrency.appendChild(tooption);
			}
		});
	}
	function LoadCurrency() {
		fetch(
			"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
		)
			.then((res) => res.json())
			.then((data) => (currencyInfo = data));
	}

	function convertCurrency() {
		let fromcurrency = document.getElementById("fromCurrency");
		let tocurrency = document.getElementById("toCurrency");
		const selectedFromcurr = fromcurrency.value;
		const selectedTocurr = tocurrency.value;
		console.log(currencyInfo);

		if (selectedFromcurr && selectedTocurr) {
			let { eur } = currencyInfo;
			let ConvertedAmount = eur[selectedTocurr] / eur[selectedFromcurr];
			let result = document.getElementById("result");
			let AmountToconvert = document.getElementById("amount").valueAsNumber;
			result.value = (AmountToconvert * ConvertedAmount).toFixed(2);
			console.log(currencyInfo, selectedFromcurr, selectedTocurr);
		}
	}
	LoadCurrency();
	BuildCurrency();
});
