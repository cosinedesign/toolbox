/**
 * Created by Jim Ankrom on 2/3/2016.
 */

// A lifecycle is an ordered series of callbacks, that are executed in the order specified in phases
// This is essential for beforePhase / phase / afterPhase style handlers
// Depends on multicast, property
function lifecycle (phases, callbacks) {
    // iterate over the phases, import the callbacks as multicasts
    var i,
        key,
        callback,
        len = phases.length,
        state = {};

    for (i=0; i < len; i++) {
        key = phases[i];
        callback = callbacks[key];
        if (callback) state[key] = multicast(callback);
    }

    function invoke () {
        var i,
            len = invoke.phases.length,
            results = [];

        for (i = 0; i < len; i++) {
            results.push(invoke.handlers[invoke.phases[i]].apply(this, arguments));
        }
        return results;
    }

    // expose access to phases
    invoke.phases = phases;
    // TODO: assess if this should be a property. We may prefer to encapsulate access to this... but is that moot?
    invoke.handlers = state;

    return invoke;
}