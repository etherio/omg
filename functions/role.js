const json = require("./utils/json");
const admin = require("./src/admin");
const allowRoles = ["admin"];
const acceptRoles = ["admin", "moderator"];

async function setRole(auth, uid, role) {
  if (role) {
    if (!acceptRoles.includes(role)) {
      throw Error(`Unexcepted input value [${role}]`);
    }
    return await auth.setCustomUserClaims(uid, {
      role,
    });
  }
  return await auth.setCustomUserClaims(uid, null);
}

exports.handler = async (event, context) => {
  var status, response;
  let method = event.httpMethod;
  let { authorization: token } = event.headers;
  let { uid, role } = event.queryStringParameters;
  if (method === "OPTIONS") {
    method = event.headers["access-control-request-method"];
  }
  if (token) {
    const app = await admin.init();
    const auth = await app.auth();
    const user = await auth.verifyIdToken(token);
    // allow only "admin"
    if (user && allowRoles.includes(user.role)) {
      try {
        await setRole(auth, uid, role);
        status = 202;
      } catch (e) {
        context.fail(json({ error: e.message }));
      }
    } else {
      context.fail(json({ error: "Access token is not valid" }));
    }
  } else {
    context.fail(json({ error: "Access token is required" }));
  }

  return {
    statusCode: status,
    headers: {
      "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "access-control-allow-origin": "*",
      "content-type": "application/json;charset=utf-8",
    },
    body: json(response),
  };
};
