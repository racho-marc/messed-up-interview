import { useState, useEffect } from 'react';
import CurrencySelecter from './components/currency-selecter/currency-selecter.component';
import './App.css';

// https://restcountries.com/v3.1/all
// https://restcountries.com/v3.1/alpha/usa

function App() {
  return (
    <div className="App">
      <CurrencySelecter />
    </div>
  );
}

export default App;
