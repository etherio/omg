const fs = require("fs");
const { rotate } = require("jimp");
const path = require("path");
const ALLOW_FILENAME = /^[^\.][\w\d_-]+\.js$/;

exports.autoRoute = function autoRoute({ routePath, router, ignore, include }) {
  if (!fs.existsSync(routePath)) {
    throw new Error(`Route directory: ${routePath} does not exist`);
  }
  let routeFiles = fs.readdirSync(routePath);
  routeFiles = routeFiles
    .filter(
      (routeFile) =>
        !(ignore || []).includes(routeFile) && routeFile.match(ALLOW_FILENAME)
    )
    .map((file) => file.split(".")[0]);

  for (i in routeFiles) {
    const route = routeFiles[i];
    const absolutePath = path.resolve(routePath, route);
    try {
      const middleware = require(absolutePath);
      router.use("/" + route, middleware);
    } catch (e) {
      console.warn(
        "\033[1;43m WARNING \033[0m",
        `route: ${route}(${absolutePath}) is loaded`
      );
    }
    // router.use(`/${routeName}`, );
  }
};
