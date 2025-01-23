import { useState } from "react";

/* eslint-disable react/prop-types */
function ReqBody({ body }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="body" onClick={() => setIsOpen(!isOpen)}>Body</button>
      <div className={isOpen ? "info-dropdown body" : "hidden"}>
        <pre><code>{body}</code></pre>
      </div>
      
    </div>
  );
}

export default ReqBody;
