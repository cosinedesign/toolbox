/**
 * Created by Jim Ankrom
 */
// Multicast pipeline, useful for event handlers
// inspired by .NET delegate
function multicast (callback) {
    var callbacks, disabled;

    // TODO: allow callback to be an array

    if (callback) add(callback);

    // main method of execution
    function invoke () {
        if (disabled) return;
        if (!callbacks) return;
        // TODO: testing for callbacks.length is NOT the right way to test for an array
        var i, results, len = callbacks.length;

        if (typeof callbacks == 'function') return callbacks.apply(this, arguments);

        results = [];
        if (len) {
            for (i = 0; i < len; i++) {
                results.push(callbacks[i].apply(this, arguments));
            }
        } else {
            if (callbacks) results.push(callbacks.apply(this, arguments));
        }

        return results;
    }

    // Add callback to the multicast
    function add (callback) {
        // TODO: allow callback to be an array of callbacks

        if (callbacks) {
            if (callbacks.push) {
                callbacks.push(callback);
            }
            else {
                callbacks = [callbacks, callback];
            }
        } else {
            callbacks = callback;
        }

        return this;
    }

    // Remove callback from the multicast
    function remove (callback) {
        var i, len = callbacks.length;

        if (callback && len > 1) {
            for (i = 0; i < len; i++) {
                if (callbacks[i] === callback) {
                    callbacks.splice(i, 1);
                    return;
                }
            }
        } else {
            // only one callback in the multicast
            callbacks = null;
        }
        return this;
    }

    // Expose add and remove methods on the invoke function
    invoke.add = add;
    invoke.remove = remove;

    // Enable the multicast
    invoke.enable = function () {
        disabled = false;
        return this;
    };

    // Disable the multicast
    invoke.disable = function () {
        disabled = true;
        return this;
    };

    return invoke;
}
