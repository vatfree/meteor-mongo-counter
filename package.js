Package.describe({
    name: 'niklasdada:mongo-counter',
    summary: 'Atomic counters stored in MongoDB (rewritten in JS)',
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
        api.export('deleteCounters', 'server', {testOnly: true})
    }
})

Package.onTest(function (api) {
    api.use('niklasdada:mongo-counter')
    api.use('ecmascript')
    api.use('mongo')
    api.use('tinytest')
    api.addFiles('counter.tests.js', 'server');
})
