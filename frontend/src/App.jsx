import { useEffect, useState } from 'react'
import './index.css'

import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import { deleteBasket, getBaskets } from './services/basketService';

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

  const destroyBasket = async () => {
    try {
      let userConfirmation = confirm(`Are you sure you want to permanently destroy this basket and delete all collected requests?`);
      if (userConfirmation) {
        const basketToDelete = currBasket;
        const idxOfBasketToDelete = baskets.findIndex(b => b === basketToDelete);
        
        setCurrBasket("");
  
        const deleted = await deleteBasket(basketToDelete);
  
        if (!deleted) {
          alert("Sorry! That basket was unable to be destroyed");
        }
  
        const newBaskets = baskets.slice();
        newBaskets.splice(idxOfBasketToDelete, 1);
  
        setBaskets(newBaskets);
      } else {
        return;
      }
      
      
    } catch (error) {
      console.error("Error deleting basket:", error);
    }
  }

  return (
    <>
      <Header 
        basket={currBasket}
        returnToHome={returnToHome}
        destroyBasket={destroyBasket}
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
