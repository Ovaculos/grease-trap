/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import RequestItem from "./RequestItem";
import { getRequests } from "../services/basketService";
import { io } from 'socket.io-client';

const socket = io(`http://${import.meta.env.VITE_host}:${import.meta.env.VITE_backPort}`);

function RequestList({ currBasket }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, [currBasket]);

  useEffect(() => {
    socket.on(currBasket, (data) => {
      setRequests((prevRequests) => [data, ...prevRequests]);
    });

    return () => {
      socket.off(currBasket);
    };
  }, [currBasket]);

  const fetchRequests = async () => {
    const data = await getRequests(currBasket);
    setRequests(data);
  }

  const basketURL = `https://larebear007.org/${currBasket}`;

  const copyURL = async () => {
    await navigator.clipboard.writeText(basketURL);
  }

  return (
    <>
      <div className="path-link-container">
        <p>Orders being served at:</p>
        <pre><code>{basketURL}</code></pre>
        <button onClick={() => copyURL()}>COPY URL</button>
      </div>

      <p id="total-requests">Total Requests: {requests.length}</p>
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
