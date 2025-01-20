/* eslint-disable react/prop-types */

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

*/


function RequestItem({ req }) {
  return (
    <tr className="request-item">
      <td className="info">
        <ul>
          <li>Method</li>
          <li>Date</li>
        </ul>
        
      </td>
      <td className="data">
        <ul>
          <li>Path</li>
          <li>Header</li>

        </ul>
      </td>
    </tr>

  )
}

export default RequestItem;