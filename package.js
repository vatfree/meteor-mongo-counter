Package.describe({
    name: 'vatfree:mongo-counter',
    summary: 'Atomic counters stored in MongoDB (rewritten in JS, added getCounter(), compatible with Meteor 2.6)',
    version: '0.1.3',
    git: 'https://github.com/vatfree/meteor-mongo-counter.git',
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
