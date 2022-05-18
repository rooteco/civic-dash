/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "build/index.js",
  publicPath: "/build/",
  serverDependenciesToBundle: [/^@observablehq\/plot.*/,
                               /^d3.*/, 
                               "isoformat",
                               "delaunator",
                               "internmap",
                               "robust-predicates"],
};
