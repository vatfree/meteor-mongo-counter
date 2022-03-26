Package.describe({
  name: 'niklasdahlheimer:mongo-counter',
  summary: 'Atomic counters stored in MongoDB',
  version: '1.0.0',
  git: 'https://github.com/niklasdahlheimer/meteor-mongo-counter',
})

Package.onUse(function (api) {
  api.versionsFrom('METEOR@2.0')
  api.use(['ecmascript'], 'server')
  api.addFiles('counter.js', 'server')
  if (api.export) {
    api.export('incrementCounter', 'server')
    api.export('decrementCounter', 'server')
    api.export('setCounter', 'server')
    api.export('getCounter', 'server')
    api.export('deleteCounters', 'server', { testOnly: true })
  }
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('mongo')
  api.use('niklasdahlheimer:mongo-counter')
  api.addFiles('counter.tests.js', 'server');
})
