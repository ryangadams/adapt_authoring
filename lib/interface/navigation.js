var jade = require("jade");
var navigation = {
  "navigation" : function (viewPath) {
    var contents = jade.renderFile(viewPath + "/navigation.jade");
    return contents;
  }
};

module.exports = navigation;