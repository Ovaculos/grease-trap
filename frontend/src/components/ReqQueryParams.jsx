/* eslint-disable react/prop-types */
function ReqQueryParams({ queryParams }) {

  return (
    <div>
      <p>Query Params</p>
      <div className="info-dropdown">
        {queryParams.split('&').map((query, idx) => {
          return <p key={idx}>{query}</p>;
        })}
      </div>
      
    </div>

  );
}

export default ReqQueryParams;