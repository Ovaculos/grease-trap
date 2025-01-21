import { useState } from "react";

/* eslint-disable react/prop-types */
function ReqQueryParams({ queryParams }) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Query Params</button>
      <div className="info-dropdown">
        {isOpen && queryParams.split('&').map((query, idx) => {
          return <p key={idx}>{query}</p>;
        })}
      </div>
      
    </div>

  );
}

export default ReqQueryParams;