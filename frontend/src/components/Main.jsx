/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Main.css';
import RequestList from './RequestList';
import { createBasket } from '../services/basketService';


function Main({ currBasket, baskets, setBaskets }) {
  const [basketName, setBasketName] = useState("");

  useEffect(() => {
    setValidRandomURL();
  }, []);
  
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

  const generateRandomURL = () => {
    const VALID_CHARS = '0123456789abcdefghijklmnopqrstuvwxyz'
    const NUM_OF_CHARS = 7;

    let randomURL = "";

    for (let idx = 0; idx <= NUM_OF_CHARS; idx += 1) {
      const randomIdx = Math.floor(Math.random() * VALID_CHARS.length);
      const randomChar = VALID_CHARS[randomIdx];

      randomURL += randomChar;
    }


    return randomURL;
  }

  const setValidRandomURL = () => {
    let randomBasket = generateRandomURL();
    while (!isValidBasketName(randomBasket)) {
      randomBasket = generateRandomURL();
    }
    setBasketName(randomBasket);
  }

  const addNewBasket = async (e) => {
    try {
      e.preventDefault();

      if (isValidBasketName(basketName)) {
        const newBasket = { name: basketName}

        const data = await createBasket(newBasket);
        console.log("In addNewBasket:", data);

      
        setBaskets(baskets.concat([data]));
        setValidRandomURL();
      }
    } catch (error) {
      console.error("Failed to create new basket:", error);
    }

  }

  if (!currBasket) {
    return (
      <div className='main'>
        <form action="" onSubmit={(e) => addNewBasket(e)}>
          <input type="text"
                 placeholder='Basket name'
                 value={basketName}
                 onChange={(e) => setBasketName(e.target.value)}
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


const generateRandomURL = () => {
  // 7 chars long
  const VALID_CHARS = '0123456789abcdefghijklmnopqrstuvwxyz_-.'
  const NUM_OF_CHARS = 7;

  let randomURL = "";

  for (let idx = 0; idx <= NUM_OF_CHARS; idx += 1) {
    const randomIdx = Math.floor(Math.random() * VALID_CHARS.length);
    const randomChar = VALID_CHARS[randomIdx];

    randomURL += randomChar;
  }

  return randomURL;
}

generateRandomURL();


export default Main;