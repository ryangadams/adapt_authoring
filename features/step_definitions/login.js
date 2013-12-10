var login = function () {
  this.World = require('../support/world').World;

  var pages = {};
  pages["Authoring Tool homepage"] = "/";
  pages["Login page"] = "/login";
  pages["User Dashboard"] = "/";

  this.When(/^I go to the "([^"]*)"$/, function(pageName, next) {
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

  this.When(/^I login$/, function (next) {
    var browser = this.browser;
    browser.fill("email", "admin")
      .fill("password", "password")
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

  this.Then(/^I see the login greeting$/, function (next) {

    if (this.browser.text("#app").should.include("Hello admin")) {
      next();
    } else {
      next.fail(new Error("Expected to see a cheery greeting"));
    }
  });

};

module.exports = login;