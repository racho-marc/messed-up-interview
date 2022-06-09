import { useEffect, useState } from 'react';

const SelectedCurrency = (props) => {
  if (!props.currency) {
      return null;
  }
  return (
      <p>The selected currency is <strong>{props.currency.name} ({props.currency.symbol})</strong></p>
  )
}
const CurrencySelecter = () => {
  let [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currencyHash, setCurrencyHash] = useState(null);
  const apiUrl = "https://restcountries.com/v3.1/all";
  

  const getCountries = function() {
    const currencyData = {};
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then((countriesData) => {
        countriesData
          .filter(({currencies}) => currencies )
          .map(({currencies}) => { 
              for(const cur in currencies) {                
                if(!currencyData[cur]) {
                  currencyData[cur] = currencies[cur];
                }
              }
          });
          setCurrencyHash(currencyData)
      });
  };
  
  useEffect(() => {      
    getCountries();
  }, []);

  
  const handleChange = (e) => {
    const selectedCurrency = {
      name: e.target.value,
      symbol: e.target.options[e.target.selectedIndex].dataset.symbol
    }
    setSelectedCurrency(selectedCurrency);
    
  }
  
  return (
    <div>
      <form>
        <select onChange={handleChange}>
          <option>Select Currency</option>
          {currencyHash && Object.entries(currencyHash).map(([key, {name, symbol}]) => {
              return <option key={key} value={key} data-symbol={symbol}>{name}</option>
          })}
        </select>
      </form>
      <SelectedCurrency currency={selectedCurrency} />
    </div>
  );

}



export default CurrencySelecter;