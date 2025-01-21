/* eslint-disable react/prop-types */
function ReqBody({ body }) {
  return (
    <div>
      <p>Body</p>
      <div>
        <pre>
          <code>{JSON.stringify(body)}</code>
        </pre>
        {/* <code>{JSON.stringify(body)}</code> */}
      </div>
      
    </div>
  );
}

export default ReqBody;