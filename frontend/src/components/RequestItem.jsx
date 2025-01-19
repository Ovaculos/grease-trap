/* eslint-disable react/prop-types */


function RequestItem({ req }) {
  console.log(req);
  return (
    <div className="request-container">
      <tr >
        <td>{req.method}</td>
        <td>{req.date_time}</td>
        <td>{req.headers}</td>
      </tr>
      </div>
  )
}

export default RequestItem;