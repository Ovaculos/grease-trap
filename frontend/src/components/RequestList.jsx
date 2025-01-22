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
  
  const copyURL = () => {
    console.log("pretending to copy url");
  }

  return (
    <>
      <p>Orders being served at:</p>
      <p>{`https://OURURL/${currBasket}`}</p>
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
