import { useState } from "react";

/* eslint-disable react/prop-types */
function ReqBody({ body }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Body</button>
      <div className="info-dropdown">
        {isOpen && <pre><code>{body}</code></pre>}
      </div>
      
    </div>
  );
}

export default ReqBody;