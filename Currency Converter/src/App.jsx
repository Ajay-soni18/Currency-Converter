import React, { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import Header from "./components/Header";
import CurrencyInput from "./components/CurrencyInput";
import ExchangeResult from "./components/ExchangeResult";

function App() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "INR",
    "NZD",
  ];

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency]);

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <Header onRefresh={fetchExchangeRates} />

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <CurrencyInput
              label="From"
              value={amount}
              onChange={setAmount}
              currencies={currencies}
              selectedCurrency={fromCurrency}
              onCurrencyChange={setFromCurrency}
            />

            <button
              onClick={handleSwapCurrencies}
              className="self-end p-2 mb-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowRightLeft className="w-5 h-5 text-gray-600" />
            </button>

            <CurrencyInput
              label="To"
              value={amount}
              onChange={setAmount}
              currencies={currencies}
              selectedCurrency={toCurrency}
              onCurrencyChange={setToCurrency}
            />
          </div>

          <ExchangeResult
            isLoading={isLoading}
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            exchangeRates={exchangeRates}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
