import React from "react";

function ExchangeResult({
  isLoading,
  amount,
  fromCurrency,
  toCurrency,
  exchangeRates,
}) {
  const calculateExchange = () => {
    if (!exchangeRates[toCurrency]) return "0";
    const rate = exchangeRates[toCurrency];
    const result = parseFloat(amount) * rate;
    return result.toFixed(2);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="text-sm text-gray-600 mb-2">Converted Amount</div>
      <div className="text-3xl font-bold text-gray-900">
        {isLoading ? (
          <div className="animate-pulse">Loading...</div>
        ) : (
          `${calculateExchange()} ${toCurrency}`
        )}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        1 {fromCurrency} = {exchangeRates[toCurrency]?.toFixed(4)} {toCurrency}
      </div>
    </div>
  );
}

export default ExchangeResult;
