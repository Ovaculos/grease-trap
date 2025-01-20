// import { useEffect, useState } from 'react'
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




// eslint-disable-next-line react/prop-types
function Main({ basket }) {


  if (!basket) { //!basket
    return (
      <div className='main'>
        <form action="">
          <input placeholder='Basket name' />
          <button>Create Basket</button>
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