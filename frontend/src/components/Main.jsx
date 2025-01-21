/*
Planning:

Two Main Pages:

1. Home Page => Add a new basket
  - if state of currBasker is empty string show homepage


2. Basket Page => Basket info + List of Requests
  - if state of currBasket is a basket show that basket instead

*/

// eslint-disable-next-line no-unused-vars
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


// eslint-disable-next-line react/prop-types
function Main({ basket }) {
  // useEffect to get requests for this basket

  if (!basket) { //!basket
    return (
      <div className="main form">
        <form action="">
          <input placeholder='Basket name' />
          <button>Create Basket</button>
        </form>
      </div>
    )
  } else {
    return (
      <div className='main requests'>
        <p>Request will go here</p>
      </div>
    )
  }


}


export default Main;
