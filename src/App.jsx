import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Converter from './components/Converter.jsx';
import ExchangeRates from './components/ExchangeRates.jsx';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [conversionRates, setConversionRates] = useState({});
  const [view, setView] = useState('converter');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/37c110efe4ea89fc7acdc12f/latest/USD');
        setConversionRates(response.data.conversion_rates);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };
    fetchRates();
  }, [baseCurrency]);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Currency Application</h1>

      <div className="mb-4">
        <button onClick={() => setView('converter')} className="btn btn-primary me-2">
          Converter
        </button>
        <button onClick={() => setView('rates')} className="btn btn-secondary">
          Exchange Rates
        </button>
      </div>

      {view === 'converter' ? (
        <Converter baseCurrency={baseCurrency} conversionRates={conversionRates} />
      ) : (
        <ExchangeRates conversionRates={conversionRates} baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} />
      )}
    </div>
  );
}

export default App;