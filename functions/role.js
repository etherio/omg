const admin = require("./src/admin");
const allowRoles = ["admin"];
const acceptRoles = ["admin", "moderator"];
const sendResponse = require("./utils/sendResponse");

async function setRole(auth, uid, role) {
  if (role) {
    if (!acceptRoles.includes(role)) {
      return false;
    }
    return await auth.setCustomUserClaims(uid, {
      role,
    });
  }
  return await auth.setCustomUserClaims(uid, null);
}

exports.handler = async (event, context) => {
  let method = event.httpMethod;
  let { "x-access-token": token } = event.headers;
  if (method === "OPTIONS") {
    method = event.headers["access-control-request-method"];
  }
  if (token) {
    const app = await admin.init();
    const auth = await app.auth();
    const user = await auth.verifyIdToken(token);
    if (user && allowRoles.includes(user.role)) {
      let { uid, role } = event.queryStringParameters;
      try {
        switch (method) {
          case "PUT":
            await setRole(auth, uid, role);
            return sendResponse(201);
        }
        return sendResponse(404);
      } catch (e) {
        console.error(e);
        return sendResponse(500, { error: "Unexcepted error" });
      }
    } else {
      return sendResponse(403, { error: "Access token is invalid" });
    }
  }
  return sendResponse(204);
};
