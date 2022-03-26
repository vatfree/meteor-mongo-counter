Package.describe({
  name: 'Back2bikes:mongo-counter',
  summary: 'Atomic counters stored in MongoDB',
  version: '1.0.0',
  git: 'git@github.com:Back2bikes/meteor-mongo-counter.git',
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
  api.use('Back2bikes:mongo-counter')
})
