var navigation = require("../interface/navigation"),
  welcomeMessage = require("../interface/welcome");;
// add / route
app.get('/', function (req, res, next) {
  console.log('loading homepage');
  var viewPath = app.server.get("views");
  res.render('index', {
    nav: navigation.navigation(viewPath),
    appContents: welcomeMessage(req.cookies.user, viewPath)
  });
});
app.get("/nav", function (req, res, next) {
  res.render(navigation.navigation(app.server.get("views")));
});
app.get("/login", function (req, res, next) {
  res.render("login");
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