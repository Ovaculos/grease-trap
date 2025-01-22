// eslint-disable-next-line react/prop-types
function Header({ basket, returnToHome}) {
  const deleteBasket = async () => {
    try {
      console.log("delete basket")
      // 1. warning

      // 2. api call

      // 3. set current basket to empty text to return home
      
    } catch (error) {
      console.error("Error deleting basket:", error);
    }
  }


  if (basket) {
    return (
      <div className='header'>
        <a  onClick={returnToHome}>HOME</a>
        <h1>{basket}</h1>
        <button onClick={() => deleteBasket()}>Delete Basket</button>
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


