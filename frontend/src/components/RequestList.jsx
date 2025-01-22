/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import RequestItem from "./RequestItem";
import { getRequests } from "../services/basketService";


function RequestList({ currBasket }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, [currBasket]);

  const fetchRequests = async () => {
    const data = await getRequests(currBasket);
    setRequests(data);
  }

  const basketURL = `https://OURURL/${currBasket}`;
  
  const copyURL = async () => {
    await navigator.clipboard.writeText(basketURL);
  }

  return (
    <>
      <p>Orders being served at:</p>
      <pre><code>{basketURL}</code></pre>
      <button onClick={() => copyURL()}>COPY URL</button>
      <p>Requests: {requests.length}</p>
      <hr/>
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
