import './Header.css';

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