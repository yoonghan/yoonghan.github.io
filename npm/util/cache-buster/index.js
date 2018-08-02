'use strict';

var path = require('path');
var url = require('url');

var _ = require('lodash');
var es = require('event-stream');
var rs = require('replacestream');

var defaults = {
  assetRoot: '',
  tokenRegExp: /ASSET{(.*?)}/g
};


var plugin = function(options) {
  var opts = _.extend({}, defaults, options);
  var timestamp = new Date().getTime();

  var replaceFunc = function(match, group) {
    var parts = group.split(',');
    var assetPath = _.first(parts);
    var p = path.join(opts.assetRoot, assetPath);
    var u = url.parse(assetPath);
    //u.query = _.extend({}, u.query, {v: timestamp});
    return url.format(u);
  };
  return es.map(function(file, cb) {
    var out = file;
    if (file.isNull()) { return cb(null, out); }
    if (file.isBuffer()) {
      file.contents = new Buffer(String(file.contents)
          .replace(opts.tokenRegExp, replaceFunc));
    }
    else if (file.isStream()) {
      out = file.pipe(rs(opts.tokenRegExp, replaceFunc));
    }
    return cb(null, out);
  });
};

module.exports = plugin;
