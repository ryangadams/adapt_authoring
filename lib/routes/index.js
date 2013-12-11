var navigation = require("../interface/navigation"),
  welcomeMessage = require("../interface/welcome"),
  projects = require("../interface/projects"),
  viewPath = app.server.get("views"),
  navigationContent = navigation.navigation(viewPath);



// add / route
app.get('/', function (req, res, next) {
  console.log('loading homepage');
  welcomeMessage(req.session, viewPath, function (data) {
    res.render('index', {
      nav: navigationContent,
      welcome: data,
      projects: projects(viewPath)
    });
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