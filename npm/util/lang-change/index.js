'use strict';

var path = require('path');
var url = require('url');

var _ = require('lodash');
var es = require('event-stream');
var rs = require('replacestream');

var defaults = {
  baseUrl: "/dist/main/my/",
  lang: "ms"
};


var plugin = function(options) {
  var opts = _.extend({}, defaults, options);
  const changeRegex = /<html lang="en">/

  var replaceFunc = function(match, group) {
    return "<html lang=\"" + opts.lang + "\">";
  };

  return es.map(function(file, cb) {
    var out = file;

    if (file.isNull() ||
        file.history[0].indexOf(opts.baseUrl) === -1
        ) {
      return cb(null, out);
    }
    if (file.isBuffer()) {
      file.contents = new Buffer(String(file.contents)
          .replace(changeRegex, replaceFunc));
    }
    else if (file.isStream()) {
      out = file.pipe(rs(changeRegex, replaceFunc));
    }
    return cb(null, out);
  });
};

module.exports = plugin;
