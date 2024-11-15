import React, { useState } from 'react';

function Converter({ baseCurrency, conversionRates }) {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState(baseCurrency);
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    if (fromCurrency && toCurrency && conversionRates[fromCurrency] && conversionRates[toCurrency]) {
      const convertedAmount = (parseFloat(amount) / conversionRates[fromCurrency] * conversionRates[toCurrency]).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    } else {
      setResult('Invalid input or unsupported currencies');
    }
    setAmount('');
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Enter' && amount) {
        handleConvert();
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h2 className="text-center text-primary fw-bolder">Convert Currency</h2>
      <br/>
      <div className="mb-3">
      <label htmlFor="amount" className="form-label fw-bolder text-primary">Amount to Convert</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="d-flex mb-3">
        <select
          className="form-select me-2"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(conversionRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <button className="btn btn-light" onClick={() => {
          const temp = fromCurrency;
          setFromCurrency(toCurrency);
          setToCurrency(temp);
        }}>
          ⇄
        </button>

        <select
          className="form-select ms-2"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(conversionRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary fw-bolder" onClick={handleConvert} disabled={!amount}>Convert</button>

      {result && <div className="mt-3 alert alert-info">{result}</div>}
    </div>
  );
}

export default Converter;