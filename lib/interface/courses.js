var jade = require("jade"),
  async = require("async"),
  ContentManager = require("../contentmanager");

var projects = function (viewPath, callback) {
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

}

module.exports = projects;