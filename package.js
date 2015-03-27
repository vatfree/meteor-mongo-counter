Package.describe({
  summary: "Atomic counters stored in MongoDB",
  version: "0.1.0",
  git: "https://github.com/osv/meteor-mongo-counter.git",
  name: "osv:mongo-counter"
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@1.0.4");
  api.use(['coffeescript', 'mongo-livedata'], 'server');
  api.addFiles('counter.coffee', 'server');
  if (api.export) {
    api.export('incrementCounter', 'server');
    api.export('decrementCounter', 'server');
    api.export('setCounter', 'server');
    api.export('deleteCounters', 'server', {testOnly: true});
  }
});

Package.on_test(function(api) {
  api.use(['coffeescript', 'tinytest', "osv:mongo-counter"]);
  api.addFiles('counter-tests.coffee', 'server');
});
