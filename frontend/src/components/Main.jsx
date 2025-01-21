/* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react'
import { useState } from 'react';
import './Main.css';
import RequestList from './RequestList';

/*
Planning:

Two Main Pages:

1. Home Page => Add a new basket
  - if state of currBasker is empty string show homepage


2. Basket Page => Basket info + List of Requests
  - if state of currBasket is a basket show that basket instead

*/

const baskets = [
  "basket1",
  "basket2",
  "basket3"
];


// eslint-disable-next-line react/prop-types
function Main({ currBasket, baskets, setBaskets }) {
  const [basketName, setNewBasket] = useState("");
  // create a random url generator 
  //  => make sure it's not already in db
  // => call with useEffect and set basketName to this state

  const addNewBasket = (e) => {
    e.preventDefault();
    // change to actually making a post request
    
    setBaskets(baskets.concat([basketName]));
  }

  if (!currBasket) { //!basket
    return (
      <div className='main'>
        <form action="" onSubmit={(e) => addNewBasket(e)}>
          <input placeholder='Basket name'
                 value={basketName}
                 onChange={(e) => setNewBasket(e.target.value)}
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