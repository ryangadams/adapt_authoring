var jade = require("jade");

var projects = function (viewPath) {
  var contents = jade.renderFile(viewPath + "/projects.jade", {projects: null});
  return contents;
}

module.exports = projects;