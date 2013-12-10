var Browser = require('zombie'),
  HTML5 = require('html5'),
  should = require('should');
  //server = require('../../server');

var World = function (callback) {
  this.browser = new Browser(
    {runScripts: false, debug: false, htmlParser: HTML5}
  );

  this.page = function (path) {
    return "http://localhost:8080" + path;
  };

  this.visit = function (path, callback) {
    this.browser.visit( this.page(path), function (err, browser, status) {
      callback(err, browser, status);
    });
  };
  callback();
};

exports.World = World;