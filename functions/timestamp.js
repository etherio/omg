const response = require("./utils/sendResponse");

exports.handler = async (event, context) => {
  const timestamp = Date.now();

  return response(200, {
    timestamp,
  });
};
