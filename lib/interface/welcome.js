var jade = require("jade");
var welcome = function (cookieObject, viewPath) {
  var userName = "Guest";
  if (cookieObject) {
    userName = cookieObject.email;
  }
  contents = jade.renderFile(viewPath + "/welcome.jade", {user: userName});
  return contents;
};

module.exports = welcome;