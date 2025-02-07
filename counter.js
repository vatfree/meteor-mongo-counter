// counter.js
// Converted from counter.coffee
//

const getCounterCollection = (collection) => collection.rawCollection()

const callCounter = function (method, collection, ...args) {
    const Counters = getCounterCollection(collection)
    return Meteor.wrapAsync(Counters[method].bind(Counters))(...Array.from(args || []))
}

const _deleteCounters = (collection) =>
    callCounter('deleteMany', collection, {}, {safe: true})

const _incrementCounter = function (collection, counterName, amount = 1) {
    const newDoc = callCounter(
        'findOneAndUpdate',
        collection,
        {_id: counterName}, // query
        {$inc: {next_val: amount}}, // update
        {returnDocument: 'after', upsert: true} // options
    ) // callback added by wrapAsync

    return (newDoc && newDoc.value && newDoc.value.next_val) ? newDoc.value.next_val : null
}

const _decrementCounter = function (collection, counterName, amount = 1) {
    return _incrementCounter(collection, counterName, -amount)
}

const _setCounter = function (collection, counterName, value) {
    return callCounter('updateOne',
        collection,
        {_id: counterName},
        {$set: {next_val: value}},
        {upsert: true}
    )
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
