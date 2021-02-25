callCounter = (method, collectionName, args...) ->
  mongo = MongoInternals.defaultRemoteCollectionDriver().mongo
  Counters = mongo.rawCollection(collectionName)
  Meteor.wrapAsync(_.bind(Counters[method], Counters))(args...)

_deleteCounters = (collectionName) ->
  callCounter('remove', collectionName, {}, {safe: true})


_incrementCounter = (collectionName, counterName, amount = 1) ->
  newDoc = callCounter(
    'findAndModify',
    collectionName,
    {_id: counterName},         # query
    null,                       # sort
    {$inc: {next_val: amount}},      # update
    {new: true, upsert: true},  # options
  )                             # callback added by wrapAsync
  return newDoc?.value?.next_val or newDoc.next_val


_decrementCounter = (collectionName, counterName, amount = 1) ->
  _incrementCounter(collectionName, counterName, -amount)


_setCounter = (collectionName, counterName, value) ->
  callCounter(
    'update',
    collectionName,
    {_id: counterName},
    {$set: {next_val: value}},
    {upsert: true}
  )
  return

_getCounter = (collectionName, counterName) ->
  result = callCounter(
    'findOne',
    collectionName,
    {_id: counterName},
  )
  return if result != null then result.next_val else 0

if Package?
  incrementCounter = _incrementCounter
  decrementCounter = _decrementCounter
  setCounter = _setCounter
  getCounter = _getCounter
  deleteCounters = _deleteCounters
else
  @incrementCounter = _incrementCounter
  @decrementCounter = _decrementCounter
  @setCounter = _setCounter
  @getCounter = _getCounter
  @deleteCounters = _deleteCounters
