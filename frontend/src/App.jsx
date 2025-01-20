import { useEffect, useState } from 'react'
import './index.css'
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';

const baskets = [
    "basket1",
    "basket2",
    "basket3"
  ]

const basket1 = {
    "requests": [
      {
        "headers": "Accept: */* \nAccept-Encoding: gzip, deflate \nConnection: close \nUser-Agent: HTTPie/3.2.4 \nX-City: La Crosse \nX-Country: US \nX-Forwarded-For: 184.97.26.131 \nX-Real-Ip: 184.97.26.131",
        "method": "GET",
        "query": "hello=world&laren=tired",
        "body": "",
        "date_time": 1737224774543
      },
      {
        "headers":"Accept: */* \nAccept-Encoding: gzip, deflate \nConnection: close \nUser-Agent: HTTPie/3.2.4 \nX-City: La Crosse \nX-Country: US \nX-Forwarded-For: 184.97.26.131 \nX-Real-Ip: 184.97.26.131",
        "method": "POST",
        "query": "",
        "body": {"id":13399049247,"kind":"comment_created"}
      }
    ]
}

function App() {
  const [currBasket, setCurrBasket] = useState("basket1");

  const returnToHome = () => {
    setCurrBasket("");
  }; 

  const handleButtonClick = (basketName) => {
    console.log("button clicked");
    setCurrBasket(basketName);
  }


  return (
    <>
      <Header 
        basket={currBasket}
        returnToHome={returnToHome}
      />
      <div className="main_and_side">
        <Main basket={currBasket}/>
        <Sidebar baskets={baskets} onChange={handleButtonClick}/>
        {console.log(currBasket)}
      </div>
    </>
  )
}

export default App
