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