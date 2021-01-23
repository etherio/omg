const admin = require("firebase-admin");

function verifyToken(token) {
  return admin
    .auth()
    .verifyIdToken(token)
    .then((user) => user)
    .catch((err) => err);
}

async function auth(req, res, next) {
  if (process.env.NODE_ENV === "development") {
    // return next();
  }
  const { roles } = this;
  try {
    if (!req.accessToken) throw { status: 401, code: "unauthorized", message: "access token required" };
    const auth = await verifyToken(req.accessToken);
    if (!auth.role || !roles.includes(auth.role)) {
      throw { status: 403, code: "forbidden", message: "access denied" };
    }
    req.auth = auth;
    next();
  } catch (e) {
    res
      .status(e.status || 503)
      .json(e)
      .end();
  }
}

auth.uid = async function (req, res) {
  
};

class Guard {
  static firebase(...roles) {
    return auth.bind({ roles });
  }
}

module.exports = Guard;
