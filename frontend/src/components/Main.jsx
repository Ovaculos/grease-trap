/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Main.css';
import RequestList from './RequestList';


function Main({ currBasket, baskets, setBaskets }) {
  const [basketName, setNewBasket] = useState("");
  
  // create a random url generator 
  //  => make sure it's not already in db
  // => call with useEffect and set basketName to this state

  const isValidBasketName = (name) => {
    if (baskets.includes(name)) {
      alert("That basket name is already present. Try another name!");
      return false;
    }

    if (!/^[\w\d\-_.]{1,250}$/.test(name)) {
      alert("Your basket name should be in this pattern");
      return false;
    }

    return true;
  }

  const addNewBasket = (e) => {
    e.preventDefault();

    if (isValidBasketName(basketName)) {
      // change to actually making a post request
    
      setBaskets(baskets.concat([basketName]));
    }
  }

  if (!currBasket) {
    return (
      <div className='main'>
        <form action="" onSubmit={(e) => addNewBasket(e)}>
          <input type="text"
                 placeholder='Basket name'
                 value={basketName}
                 onChange={(e) => setNewBasket(e.target.value)}
                //  pattern="^[\w\d\-_\.]{1,250}$"
           />
          <input type="submit" value="Create Basket" />
        </form>
      </div>
    )
  } else {
    return (
      <div id="request-page" className='main'>
        <RequestList />
      </div>
    )
  }
}


export default Main;