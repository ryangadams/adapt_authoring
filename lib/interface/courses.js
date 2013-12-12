var jade = require("jade");

var projects = function (viewPath, callback) {
  var contents = jade.renderFile(viewPath + "/courses.jade", {projects: null});
  callback(null, contents);
}

module.exports = projects;