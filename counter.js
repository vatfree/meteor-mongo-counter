// counter.js
// Converted from counter.coffee
//

const getCounterCollection = (collection) => collection.rawCollection()

const callCounter = function (method, collection, ...args) {
  const Counters = getCounterCollection(collection)
  return Meteor.wrapAsync(Counters[method].bind(Counters))(...Array.from(args || []))
}

const _deleteCounters = (collection) =>
  callCounter('remove', collection, {}, {safe: true})

const _incrementCounter = function (collection, counterName, amount = 1) {
  const newDoc = callCounter(
    'findOneAndUpdate',
    collection,
    {_id: counterName}, // query
    {$inc: {next_val: amount}}, // update
    {returnDocument: 'after', upsert: true} // options
  ) // callback added by wrapAsync
  if (newDoc && newDoc.value && newDoc.value.next_val) {
    return newDoc.value.next_val
  }
  return null
}

const _decrementCounter = function (collection, counterName, amount) {
  if (amount == null) {
    amount = 1
  }
  return _incrementCounter(collection, counterName, -amount)
}

const _setCounter = function (collection, counterName, value) {
  callCounter('update', collection, {_id: counterName}, {$set: {next_val: value}})
}

const _getCounter = function (collection, counterName) {
    const result = callCounter(
      'findOne',
      collection,
      {_id: counterName},
    )
  return result != null ? result.next_val : 0
}


// Any variables defined without const/var/let are 'published' for the package... this is
// done in package.js

incrementCounter = _incrementCounter
decrementCounter = _decrementCounter
setCounter = _setCounter
getCounter = _getCounter
deleteCounters = _deleteCounters
