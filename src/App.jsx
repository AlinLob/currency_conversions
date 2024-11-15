import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Converter from './components/Converter';
import ExchangeRates from './components/ExchangeRates';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [conversionRates, setConversionRates] = useState({});
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/37c110efe4ea89fc7acdc12f/latest/USD');
        setConversionRates(response.data.conversion_rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
    fetchRates();
  }, [baseCurrency]);

  return (
    <Router>
      <div className="container mt-5">
        <nav className="mb-4">
          <Link to="/" className="btn btn-outline-primary me-2">Converter</Link>
          <Link to="/exchange-rates" className="btn btn-outline-primary">Exchange Rates</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Converter baseCurrency={baseCurrency} conversionRates={conversionRates} />}
          />
          <Route
            path="/exchange-rates"
            element={<ExchangeRates conversionRates={conversionRates} baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;