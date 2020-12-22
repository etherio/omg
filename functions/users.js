const json = require("./utils/json");
const admin = require("./src/admin");
const roles = ["admin"];

async function deleteUser(auth, uid) {
  return {
    status: 201,
    response: await auth.deleteUser(uid),
  };
}

async function getUser(auth) {
  const { users } = await auth.listUsers();
  return {
    status: 200,
    response: users.map((user) => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: user.metadata.creationTime,
      lastLogin: user.metadata.lastSignInTime,
      role: (user.customClaims && user.customClaims.role) || null,
      providers: user.providerData.map((provider) => provider.providerId),
    })),
  };
}

exports.handler = async (event, context) => {
  var status, response;
  let method = event.httpMethod;
  let { authorization: token } = event.headers;
  let { uid } = event.queryStringParameters;
  if (method === "OPTIONS") {
    method = event.headers["access-control-request-method"];
  }
  if (token) {
    const app = await admin.init();
    const auth = await app.auth();
    const user = await auth.verifyIdToken(token);
    // allow only "admin"
    if (user && roles.includes(user.role)) {
      try {
        switch (method) {
          case "DELETE":
            if (uid === user.uid) {
              context.fail(
                json({
                  error:
                    "You cannot delete your own account by using this operation",
                })
              );
            } else {
              var { status, response } = await deleteUser(auth, uid);
            }
            break;
          default:
            var { status, response } = await getUser(auth, user.uid);
            response = response.filter((u) => u.uid !== user.uid);
        }
      } catch (e) {
        context.fail(json({ error: "Unexcepted error" }));
      }
    } else {
      context.fail(json({ error: "Access token is invalid" }));
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
