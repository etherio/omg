const sendResponse = require("./utils/sendResponse");
const admin = require("./src/admin");
const roles = ["admin"];

async function listUsers(auth) {
  const { users } = await auth.listUsers();

  return users.map((user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: user.metadata.creationTime,
    lastLogin: user.metadata.lastSignInTime,
    role: (user.customClaims && user.customClaims.role) || null,
    providers: user.providerData.map((provider) => provider.providerId),
  }));
}

exports.handler = async (event, context) => {
  let method = event.httpMethod;
  let { "x-access-token": token } = event.headers;
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
              return sendResponse(401, {
                error:
                  "You cannot delete your own account by using this operation",
              });
            }
            return sendResponse(201, await auth.deleteUser(uid));
          case "GET":
            let users = await listUsers(auth, uid);
            console.log(users);
            return sendResponse(
              200,
              users.filter((u) => u.uid !== user.uid)
            );
        }
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
