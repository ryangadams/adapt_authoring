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

app.get("/courses/new", function (req, res, next) {
  var pageValues = {};
  pageValues.nav = navigationContent;
  pageValues.page_title = "Adapt Builder - New Course";
  res.render('new-course', pageValues);
});

app.post("/courses", function (req, res, next) {
  var ContentManager = require("../contentmanager");
  var courseObject = {
    name: req.body.coursename,
    deleted: false
  };
  console.log(courseObject);
  ContentManager.create("course", courseObject, function (error, result) {
    if (error) next(error);
    res.redirect("/");
  });
});

app.get("/courses/:id", function (req, res, next) {
  var ContentManager = require("../contentmanager");
  var pageValues = {};
  async.parallel([
    function (callback) {
      ContentManager.retrieve("course", {_id: req.params.id}, function (err, results) {
        if (err) return callback(err);
        pageValues.course = results[0];
        callback();
      });
    }
  ], function (err) {
    if (err) return next(err);
    res.render('course-view', pageValues);
  });
});

app.get('/create-user/:username', function (req, res, next) {
  var userObj = {
    email: '',
    password: '',
    plainPassword: 'password',
    auth: 'local',
    tenant: 0
  };

  userObj.email = req.params.username;

  require('../auth').hashPassword(userObj.plainPassword, function (error, hash) {
    if (error) {
      return next(error);
    }

    userObj.password = hash;
    require('../usermanager').createUser(userObj, function (error, user) {
      if (error) {
        return next(error);
      }

      // assign permissions for all!
      var permissions = require('../permissions');
      permissions.createPolicy(user._id, function (error, policy) {
        // add a new policy statement
        permissions.addStatement(policy, ['create', 'read', 'update', 'delete'], permissions.buildResourceString(userObj.tenant, '/*'), 'allow', function (error) {
          if (error) {
            return next(error);
          }

          // notify user
          res.statusCode = 200;
          res.write("Create User succeeded!\nEmail: " + userObj.email + "\nPassword:" + userObj.plainPassword);
          res.end();
        });
      });
    });
  });
});