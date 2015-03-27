Tinytest.add 'mongo-counter delete counters', (test) ->
  deleteCounters('_counters')
Tinytest.add 'mongo-counter inc counters', (test) ->
  test.equal incrementCounter('_counters', 'foo'), 1
  test.equal incrementCounter('_counters', 'foo'), 2
  test.equal incrementCounter('_counters', 'foo'), 3
  test.equal incrementCounter('_counters', 'foo', 10), 13
Tinytest.add 'mongo-counter dec counters', (test) ->
  test.equal decrementCounter('_counters', 'foo'), 12
Tinytest.add 'mongo-counter set counter', (test) ->
  setCounter('_counters', 'foo', 100)
  test.equal incrementCounter('_counters', 'foo'), 101
  test.equal incrementCounter('_counters', 'bar'), 1
