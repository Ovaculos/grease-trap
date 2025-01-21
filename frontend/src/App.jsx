import { useEffect, useState } from 'react'
import './index.css'

import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import { getBaskets } from './services/basketService';

function App() {
  const [currBasket, setCurrBasket] = useState("");
  const [baskets, setBaskets] = useState([]);

  useEffect(() => {
    fetchBaskets();
  }, []);

  const fetchBaskets = async () => {
    try {
      let data = await getBaskets();
      setBaskets(data);
    } catch (error) {
      console.error("Failed to fetch baskets:", error);
    }
  }

  const returnToHome = () => {
    setCurrBasket("");
  }; 

  const handleButtonClick = (basketName) => {
    setCurrBasket(basketName);
  }

  return (
    <>
      <Header 
        basket={currBasket}
        returnToHome={returnToHome}
      />
      <div className="container">
        <Main currBasket={currBasket}
              baskets={baskets}
              setBaskets={setBaskets}
        />
        <Sidebar baskets={baskets} onChange={handleButtonClick}/>
      </div>
    </>
  )
}

export default App
