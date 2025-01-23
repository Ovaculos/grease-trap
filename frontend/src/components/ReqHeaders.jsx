import { useState } from "react";

/* eslint-disable react/prop-types */
function ReqHeaders( { headers }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(headers);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Headers</button>
      <div className="info-dropdown">
        {isOpen && <pre id="json">{headers}</pre>}
      </div>
    </>


  );
}

export default ReqHeaders;
