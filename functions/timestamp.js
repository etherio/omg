const sendResponse = require("./utils/sendResponse");

exports.handler = async (event, context) => {
  const timestamp = Date.now();

  return sendResponse(200, {
    timestamp,
  });
};
