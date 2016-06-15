/**
 * Created by Jim Ankrom on 1/30/2016.
 */

// Turn pipe on and off
// TODO: perhaps this is the 'throttle' gate?
// TODO: allow options to accept a gate method and an invoker method
// TODO: this cannot be used in the middle of a pipe - it is asynchronous. Perhaps there's a way to attach a throttle into a pipe?
/**
 *
 * @param callback
 * @param options { open }
 * @returns {invoke}
 */
function throttle (callback, options) {
    options = options || {};
    options.open = options.open || true;
    options.gater = options.gater || simpleGate;
    //options.count = options.count || 0;
    //options.originalCount = options.count;

    // Open the gate
    function on() {
        options.open = true;
    }

    // Close the gate
    function off() {
        options.open = false;
    }

    // Basic on/off gate
    function simpleGate () {
        return options.open;
    }

    // TODO: Future
    //function countedGate () {
    //    // If there's a limit set, evaluate / update it
    //    options.count--;
    //    if (!options.count) invoke.off();
    //    return simpleGate();
    //    // TODO: reset if needed
    //}
    //// Only allow n# of iterations then stop
    //function count(value) {
    //    options.originalCount = value;
    //    invoke.reset();
    //}

    // TODO: raise an event when this is called
    function statefulInvoker () {
        callback.apply(null, options.arguments);
    }

    function start_interval () {
        // TODO: this isn't the right invoker, I think.
        options.intervalId = setInterval(statefulInvoker, options.interval);
    }

    function stop_interval () {
        clearInterval(options.intervalId);
    }

    // send values on interval, regardless of input
    function interval (interval) {
        options.stateful = true;
        options.interval = interval || options.interval;
        // Turn off the usual gate
        off();
        start_interval();
    }

    // Reset everything in the valve
    function reset() {
        // options.count = options.originalCount;
        if (options.intervalId) {
            stop_interval();
        }
        on();
    }

    // Invoke function to invoke the throttle
    function invoke() {
        // TODO: consider an arguments filter to be applied that evaluates raising an onchange?
        // TODO: consider a gate that only sends when we have changed data
        if (arguments.length) options.arguments = arguments;
        if (options.gater && options.gater()) {
            return callback.apply(null, options.arguments);
        }
    }

    // Build invoke
    invoke.on = on;
    invoke.off = off;
    invoke.reset = reset;
    invoke.interval = interval;
    invoke.interval.stop = stop_interval;
    invoke.interval.start = start_interval;

    return invoke;
}