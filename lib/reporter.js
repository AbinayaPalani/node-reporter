// Generated by CoffeeScript 1.6.3
(function() {
  var DEFAULT_FOLDER, Reports, fs, path, _;

  _ = require('underscore');

  fs = require('fs');

  path = require('path-extra');

  DEFAULT_FOLDER = path.join(path.homedir(), 'Dropbox/Apps/Reporter-App/');

  module.exports = Reports = function(options) {
    this.options = options != null ? options : {
      directory: DEFAULT_FOLDER
    };
  };

  (function() {
    return this.list = function(options, cb) {
      var connections, directory, impetus, reports, _ref;
      if (typeof options === 'function') {
        _ref = [options, null], cb = _ref[0], options = _ref[1];
      }
      reports = [];
      directory = this.options.directory;
      fs.readdirSync(directory).forEach(function(file) {
        var data, snapshots;
        if (file.match(/.json$/)) {
          data = fs.readFileSync(path.join(directory, file));
          snapshots = JSON.parse(data).snapshots;
          return _.each(snapshots, function(report) {
            return reports.push(report);
          });
        }
      });
      if (options != null) {
        if (options.type != null) {
          impetus = ['button', 'buttonAsleep', 'notification', 'sleep', 'wake'];
          reports = _.filter(reports, function(r) {
            return (r.reportImpetus != null) && r.reportImpetus === impetus.indexOf(options.type);
          });
        }
        if (options.connection != null) {
          connections = ['cellular', 'wifi', 'none'];
          reports = _.filter(reports, function(r) {
            return r.connection === connections.indexOf(options.connection);
          });
        }
      }
      if (cb != null) {
        return cb(null, reports);
      } else {
        return reports;
      }
    };
  }).call(Reports.prototype);

}).call(this);