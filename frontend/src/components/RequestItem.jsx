/* eslint-disable react/prop-types */

import ReqBody from "./ReqBody";
import ReqHeaders from "./ReqHeaders";
import ReqQueryParams from "./ReqQueryParams";

function RequestItem({ req }) {
  const currDateTime = req.date_time * 1000;
  const dateObj = new Date(currDateTime);
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
          <ReqHeaders headers={req.header}/>
          {req.query ? <ReqQueryParams queryParams={req.query} /> : ""}
          {req.body ? <ReqBody body={req.body} /> : ""}
        </ul>
      </td>
    </tr>
  )
}

export default RequestItem;
