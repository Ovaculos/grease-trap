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
    <li className="request-item">
      <div className="request-info">
        <ul>
          <li>{req.method}</li>
          <li>Time:{req.date_time}</li>
          <li>Date:</li>
        </ul>
      </div>
      <div className="request-data">
        <ul>
          <li>Original Request Path</li>
          <li>Headers:{req.headers}</li>
          <li>Query Params:{req.query}</li>
          <li>Body:{req.body.toString()}</li>
        </ul>
      </div>
    </li>
  )
}

export default RequestItem;