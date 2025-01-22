const filterRequest = (req) => {
  return {
    header: req.header,
    method: req.method,
    query: req.query,
    date_time: req.date_time,
    path: req.path,
    body: req.body
  };
}

export const attachBodies = (requests, bodies) => {
  let b = 0;

  for (let r = 0; r < requests.length; r++) {
    if (bodies[b] && requests[r].request_id === bodies[b].request_id) {
      requests[r].body = bodies[b].body;
      b++;
    } else {
      requests[r].body = ''
    }
  }

  return requests.map(filterRequest).sort((a, b) => b.date_time - a.date_time);
}

export const parseRequest = (req) => {
  const header = JSON.stringify(req.headers);
  let body = req.body.toString();
  if (body === '[object Object]') body = '';
  const method = req.method;
  const path = req.originalUrl;
  const query = new URLSearchParams(req.query).toString();
  return {
    header,
    body,
    method,
    path,
    query
  }
}
