exports.handler = (request) => {
  let statusCode = 200;
  let headers = {
    "access-control-allow-origin": "*",
  };
  let response = {
    errors: [],
    data: [],
  };

  //

  return {
    headers,
    statusCode,
    body: JSON.stringify(response),
  };
};
