import { useState } from "react";

/* eslint-disable react/prop-types */
function ReqQueryParams({ queryParams }) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
      <button className="queries" onClick={() => setIsOpen(!isOpen)}>Query Params</button>
      <div className={isOpen ? "info-dropdown queries" : "hidden"}>
        {queryParams.split('&').map((query, idx) => {
          return <p key={idx}>{query}</p>;
        })}
      </div>
      
    </div>

  );
}

export default ReqQueryParams;
