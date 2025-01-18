// import { useState } from 'react'
import './index.css'

function Header() {
  return (
    <div className='header'>
      <a href="http://localhost:5173">HOME</a>
      <h1>Welcome to the GREASETRAP</h1>
    </div>
  )
}

function Main() {
  return (
    <div className='main'>
      <form action="">
        <input placeholder='Basket name' />
        <button>Create Basket</button>
      </form>
    </div>
  )
}

function Sidebar() {
  return (
    <div className='sidebar'>
      <p>Paragraph</p>
    </div>
  )
}

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="main_and_side">
        <Main />
        <Sidebar />
      </div>
    </>
  )
}

export default App
