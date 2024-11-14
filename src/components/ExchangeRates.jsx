import React from 'react';

function ExchangeRates({ conversionRates, baseCurrency, setBaseCurrency }) {
  const handleBaseCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  return (
    <div className="card shadow-sm p-4">
      <h2>Exchange Rates (Base: {baseCurrency})</h2>
      <div className="mb-3">
        <label htmlFor="baseCurrency" className="form-label">Base Currency:</label>
        <select
          id="baseCurrency"
          className="form-select"
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
        >
          {Object.keys(conversionRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <ul className="list-group">
        {Object.entries(conversionRates).map(([currency, rate]) => (
          <li key={currency} className="list-group-item">
            1 {baseCurrency} = {rate.toFixed(4)} {currency}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExchangeRates;