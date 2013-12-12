var jade = require("jade"),
  userManager = require("../usermanager");
var welcome = function (sessionObject, viewPath, callback) {
  var userName = "Guest",
    contents = "";
  if (sessionObject && sessionObject.passport && sessionObject.passport.user) {
    userManager.retrieveUser({_id: sessionObject.passport.user._id}, function (error, userObject) {
      if (userObject) {
        userName = userObject.email;
      }
      contents = jade.renderFile(viewPath + "/welcome.jade", {user: userName});
      callback(null, contents);
    });
  } else {
    userName = "Guest";
    contents = jade.renderFile(viewPath + "/welcome.jade", {user: userName});
    callback(null, contents);
  }
};

module.exports = welcome;