import './Main.css';

/*
Planning:

Two Main Pages:

1. Home Page => Add a new basket
  - if state of currBasker is empty string show homepage


2. Basket Page => Basket info + List of Requests
  - if state of currBasket is a basket show that basket instead

*/



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
      <div className='main'>
        <p>Request will go here</p>
      </div>
    )
  }


}


export default Main;