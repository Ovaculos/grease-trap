/* eslint-disable react/prop-types */
// pass basket's requests to Request List
import { useEffect, useState } from "react";
import RequestItem from "./RequestItem";


// eslint-disable-next-line no-unused-vars
const basket1 = {
  "requests": [
    {
      "path": "/basket1/github?hello=world&laren=tired",
      "headers": "Accept: */* \nAccept-Encoding: gzip, deflate \nConnection: close \nUser-Agent: HTTPie/3.2.4 \nX-City: La Crosse \nX-Country: US \nX-Forwarded-For: 184.97.26.131 \nX-Real-Ip: 184.97.26.131",
      "method": "GET",
      "query": "hello=world&laren=tired",
      "body": "",
      "date_time": 1737224774543
    },
    {
      "path": "/basket1",
      "headers":"Accept: */* \nAccept-Encoding: gzip, deflate \nConnection: close \nUser-Agent: HTTPie/3.2.4 \nX-City: La Crosse \nX-Country: US \nX-Forwarded-For: 184.97.26.131 \nX-Real-Ip: 184.97.26.131",
      "method": "POST",
      "query": "",
      "body": {"id":13399049247,"kind":"comment_created"},
      "date_time": 1737417679576
    }
  ]
}

function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // AJAX call to get request for this basket;
    setRequests(basket1.requests); // change this to real response later
  }, []);

  return (
    <>
      <p>Orders being served at: [copy-able path here] </p>
      <p>Requests: {requests.length}</p>
      <table>
        <tbody>
          {requests.map((req, idx) => {
            return <RequestItem key={idx} req={req} />;
          })}
        </tbody>
      </table>
    </>
  )
}

export default RequestList;