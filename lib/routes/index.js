var async = require('async'),
  navigation = require('../interface/navigation'),
  welcomeMessage = require('../interface/welcome'),
  courses = require('../interface/courses');

// fetch some data once for all
var viewPath = app.server.get('views'),
  navigationContent = navigation.navigation(viewPath);



// add / route
app.get('/', function (req, res, next) {
  console.log('loading homepage');
  var pageValues = {};
  pageValues.nav = navigationContent;
  pageValues.page_title = "Adapt Builder - Dashboard";
  async.parallel([
    function (callback) {
      welcomeMessage(req.session, viewPath, function (err, data) {
        if (err) return callback(err);
        pageValues.welcome = data;
        callback();
      });
    },
    function (callback) {
      courses(viewPath, function (err, data) {
        if (err) return callback(err);
        pageValues.projects = data;
        callback();
      });
    }
  ], function (err) {
    if (err) return next(err);
    res.render('index', pageValues);
  });

});

app.get("/login", function (req, res, next) {
  res.render("login", {
    nav: navigationContent
  });
});

app.post('/login', function (req, res, next) {
  var configuration = require('../configuration'),
    auth = require('../auth');
  console.log("executing /login post status");
  auth.getAuthPlugin(configuration.getConfig('auth'), function (error, authPlugin) {
    if (error) {
      return next({ statusCode: 500, message: error }, req, res);
    }
    // redirect to homepage if login is successful
    var callback = function(user) {
      if (res.statusCode === 200) {
        console.log("redirecting to homepage");
        res.redirect("/");
      }
    };
    authPlugin.authenticate(req, res, callback);
  });
});