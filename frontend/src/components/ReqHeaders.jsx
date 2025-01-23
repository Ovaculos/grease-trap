import { useState } from "react";

/* eslint-disable react/prop-types */
function ReqHeaders( { headers }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="headers" onClick={() => setIsOpen(!isOpen)}>Headers</button>
      <div className={isOpen ? "info-dropdown headers" : "hidden"}>
        <pre>{headers}</pre>
      </div>
    </>


  );
}

export default ReqHeaders;
