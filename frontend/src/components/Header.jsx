import './Header.css';

/*
Planning:

Two Headers:

1. Home button:
  - when you click, current basket is resest to nothing

2. Home Page => Welcome to Grease Trap
  - if state of currBasker is empty string show homepage


3. Basket Page => Current Basket Name
  - if state of currBasket is a basket show that basket instead

*/

const testBasket = "basket1";



// eslint-disable-next-line react/prop-types
function Header({ basket, returnToHome}) {
  return (
    <div className='header'>
      <a  onClick={returnToHome}>HOME</a>
      <h1>{basket ? basket : "Welcome to Grease Trap!"}</h1>
    </div>
  )
}

export default Header;