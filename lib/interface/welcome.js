var jade = require("jade"),
  userManager = require("../usermanager");
var welcome = function (sessionObject, viewPath, callback) {
  var userName = "Guest",
    contents = "";
  if (sessionObject) {
    console.log(sessionObject);
    userManager.retrieveUser({_id: sessionObject.passport.user._id}, function (error, userObject) {
      console.log("in welcome");
      console.log(arguments);
      if (userObject) {
        userName = userObject.email;
      }
      contents = jade.renderFile(viewPath + "/welcome.jade", {user: userName});
      callback(contents);
    });
  } else {
    userName = "Guest";
    contents = jade.renderFile(viewPath + "/welcome.jade", {user: userName});
    callback(contents);
  }
};

module.exports = welcome;