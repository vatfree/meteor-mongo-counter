export const Counters = new Mongo.Collection("counters");

Tinytest.add('mongo-counter delete counters',
    (test) => {
        deleteCounters(Counters)
    })

Tinytest.add('mongo-counter inc counters', (test) => {
    test.equal(incrementCounter(Counters, 'foo'), 1)
    test.equal(incrementCounter(Counters, 'foo'), 2)
    test.equal(incrementCounter(Counters, 'foo'), 3)
    test.equal(incrementCounter(Counters, 'foo', 10), 13)
})

Tinytest.add('mongo-counter dec counters', (test) => {
    test.equal(decrementCounter(Counters, 'foo'), 12)
})

Tinytest.add('mongo-counter set counter', (test) => {
    setCounter(Counters, 'foo', 100)
    test.equal(incrementCounter(Counters, 'foo'), 101)
    test.equal(incrementCounter(Counters, 'bar'), 1)
})

Tinytest.add('mongo-counter set counter again', (test) => {
    setCounter(Counters, 'bar', 100)
    test.equal(decrementCounter(Counters, 'bar'), 99)
})

export const Counters2 = new Mongo.Collection("counters2");

Tinytest.add('mongo-counter run setCounter on fresh collection', (test) => {
    deleteCounters(Counters2)
    setCounter(Counters2, 'bar', 100)
    test.equal(decrementCounter(Counters2, 'bar'), 99)
})
