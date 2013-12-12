var jade = require("jade"),
  async = require("async"),
  ContentManager = require("../contentmanager"),
  userManager = require("../usermanager");

var courses = {
  courses: function (viewPath, callback) {
    var pageContents = {};
    async.parallel([
      function (cb) {
        var searchParams = {
        };
        ContentManager.retrieve("course", searchParams, function (error, results) {
          console.log(results);
          pageContents.courses = results;
          cb();
        });
      }
    ], function (err) {
      if (err) return callback(err);
      var contents = jade.renderFile(viewPath + "/courses.jade", pageContents);
      callback(null, contents);
    });
  },
  newCourse: function (requestObject, callback) {
    var courseObject = {
      name: requestObject.body.coursename,
      deleted: false,
      tenant_id: 0,
      last_updated: new Date()
    };
    if (!requestObject.session && !requestObject.session.passport) {
      callback(new Error("No user session found"));
    }
    userManager.retrieveUser(
      {_id: requestObject.session.passport.user._id},
      function (error, userObject) {
        if (error) callback(error);
        courseObject.tenant_id = userObject.tenant;
        ContentManager.create("course", courseObject, function (error, result) {
          if (error) callback(error);
          callback();
        });
      }
    );
  }
};

module.exports = courses;