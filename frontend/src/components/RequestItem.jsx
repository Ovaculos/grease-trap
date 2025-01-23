/* eslint-disable react/prop-types */

import ReqBody from "./ReqBody";
import ReqHeaders from "./ReqHeaders";
import ReqQueryParams from "./ReqQueryParams";

function RequestItem({ req }) {
  const currDateTime = req.date_time * 1000;
  const dateObj = new Date(currDateTime);
  const time = dateObj.toLocaleTimeString();
  const date = dateObj.toLocaleDateString();

  // const addEmojiToRequestType = () => {
  //   let method;
  //   if (req.method.toUpperCase() === "GET") {
  //     method = `&#x1F35F;`;
  //   } else if (req.method.toUpperCase() === "POST") {
  //     method = `&#x1F354;`;
  //   } else if (req.method.toUpperCase() === "PUT") {
  //     method = "&#x1F366;";
  //   } else {
  //     method = `🥤`;
  //   }

  //   return method;
  // }

  return (
    <tr className="request-item">
      <td className="info">
        <ul>
          {req.method.toUpperCase() === "GET" && <li>&#x1F35F; [ {req.method.toUpperCase()} ]</li>}
          {req.method.toUpperCase() === "POST" && <li>&#x1F354; [ {req.method.toUpperCase()} ]</li>}
          {req.method.toUpperCase() === "PUT" && <li>&#x1F366; [ {req.method.toUpperCase()} ]</li>}
          {req.method.toUpperCase() === "DELETE" && <li>&#x1F355; [ {req.method.toUpperCase()} ]</li>}
          <li>&#x23F2; {time}</li>
          <li>&#x270F; {date}</li>
        </ul>
      </td>
      <td className="data">
        <ul>
          <li className="path">{req.path}</li>
          <ReqHeaders headers={req.header}/>
          {req.query ? <ReqQueryParams queryParams={req.query} /> : ""}
          {req.body ? <ReqBody body={req.body} /> : ""}
        </ul>
      </td>
    </tr>
  )
}

export default RequestItem;
