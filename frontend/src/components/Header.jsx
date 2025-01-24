// eslint-disable-next-line react/prop-types
function Header({ basket, returnToHome, destroyBasket}) {
  if (basket) {
    return (
      <div className='header'>
        <a  onClick={returnToHome}>HOME</a>
        <h1>{basket}</h1>
        <button onClick={() => destroyBasket()}>Destroy Basket</button>
      </div>
    )
  } else {
    return (
      <div className='header'>
        <a  onClick={returnToHome}>HOME</a>
        <h1>{"Welcome to GREASETRAP!"}</h1>
      </div>
    )
  }
}

export default Header;


