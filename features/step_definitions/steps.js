var steps = function () {
  this.World = require('../support/world').World;

  var pages = {};
  pages["Authoring Tool homepage"] = "/";
  pages["Login page"] = "/login";
  pages["User Dashboard"] = "/";

  var logins = {};
  logins.nocourses = "password";
  logins.admin = "password";

  this.Given(/^I am logged in as "([^"]*)"$/, function (username, next) {
    // express the regexp above with the code you wish you had
    var b = this.browser;
    this.visit(pages["Login page"], function (callback) {
      b.fill("email", username)
        .fill("password", logins[username])
        .pressButton("Login", function () {
          b.wait(next);
        });
    });
  });

  this.When(/^I go to the "([^"]*)"$/, function (pageName, next) {
    // express the regexp above with the code you wish you had
    this.visit(pages[pageName], next);
  });

  this.Then(/^I should see a "([^"]*)" with "([^"]*)"$/,
    function (elementType, buttonText, next) {
      var element = elementType;
      if (elementType.toLowerCase() === "link") {
        element = "a";
      }
      if (this.browser.text(element).should.include(buttonText)) {
        next();
      } else {
        next.fail(new Error("Expected a " + elementType + " with " + buttonText));
      }
    });

  this.When(/^I log in as "([^"]*)" with password "([^"]*)"$/, function (username, password, next) {
    var browser = this.browser;
    browser.fill("email", username)
      .fill("password", password)
      .pressButton("Login", function () {
        browser.wait(next);
      });
  });

  this.Then(/^I am redirected to my dashboard$/, function (next) {
    // express the regexp above with the code you wish you had
    if (this.browser.location == this.page(pages["User Dashboard"])) {
      next();
    } else {
      next.fail(
        new Error("Not redirected to " + this.page(pages["User Dashboard"]) +
          " on submit, " +
          "instead went to " + this.browser.location)
      );
    }
  });

  this.Then(/^I see "([^"]*)"$/, function (stringOfText, next) {

    if (this.browser.text("#app").should.include(stringOfText)) {
      next();
    } else {
      next.fail(new Error("Expected to see '" + stringOfText + "'"));
    }
  });


  this.When(/^I have no courses available$/, function(callback) {
    // for now, just assume this works - need to fix later
    callback();
  });

  this.When(/^I click "([^"]*)"$/, function(buttonToClick, next) {
    // express the regexp above with the code you wish you had
    var browser = this.browser;
    browser.clickLink(buttonToClick, function () {
      browser.wait(next);
    });
  });

  this.When(/^I enter a name of "([^"]*)"$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^the course appears in my course listing$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });


};

module.exports = steps;