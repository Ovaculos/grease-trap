/* eslint-disable react/prop-types */

import ReqBody from "./ReqBody";
import ReqHeaders from "./ReqHeaders";
import ReqQueryParams from "./ReqQueryParams";

/*
Each request has two parts:

1. Meta Data
  - Method
  - Time
  - Date
2. Request Content
  - Request Path
  - Headers
  - Query Params (only shows if present)
  - Body (only shows if present)


Clickable content:
- Headers, Query Params, Body

- Body: eventual try to format as a code block not a string

*/


function RequestItem({ req }) {
  const dateObj = new Date(req.date_time);
  const time = dateObj.toLocaleTimeString();
  const date = dateObj.toLocaleDateString();

  return (
    <tr className="request-item">
      <td className="info">
        <ul>
          <li>[ {req.method.toUpperCase()} ]</li>
          <li>{time}</li>
          <li>{date}</li>
        </ul>
        
      </td>
      <td className="data">
        <ul>
          <li>{req.path}</li>
          <ReqHeaders headers={req.headers}/>
          {req.query ? <ReqQueryParams queryParams={req.query} /> : ""}
          {req.body ? <ReqBody body={req.body} /> : ""}
        </ul>
      </td>
    </tr>

  )
}

export default RequestItem;