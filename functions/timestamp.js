exports.handler = async (event, context) => {
  const timestamp = Date.now();

  return {
    headers: {
      "access-control-allow-origin": "*",
      "content-type": "application/json;charset=utf-8",
    },
    statusCode: 200,
    body: JSON.stringify({ timestamp }),
  };
};
