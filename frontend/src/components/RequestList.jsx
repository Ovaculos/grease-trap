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
    socket.on('newRequest', (data) => {
      console.log('New request received:', data);
      setRequests((prevRequests) => [data, ...prevRequests]);
    });

    return () => {
      socket.off('newRequest');
    };
  }, []);

  const fetchRequests = async () => {
    const data = await getRequests(currBasket);
    setRequests(data);
  }

  return (
    <>
      <p>Orders being served at: [copy-able path here] </p>
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
