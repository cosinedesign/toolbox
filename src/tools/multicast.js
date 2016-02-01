/**
 * Created by Jim Ankrom
 */
// Multicast Delegate for Event Handlers
// inspired by .NET delegate
function multicast (callback) {
    var multicast, disabled;

    // TODO: allow callback to be an array

    if (callback) add(callback);

    // main method of execution
    function invoke () {
        var i, results, len = multicast.length;
        if (!disabled) {
            results = [];
            for (i = 0; i < len; i++) {
                results.push(multicast[i].apply(this, arguments));
            }
        }
        return results;
    }

    // Add callback to the multicast
    function add (callback) {
        // TODO: allow callback to be an array of callbacks

        if (multicast) {
            if (multicast.push) {
                multicast.push(callback);
            }
            else {
                multicast = [multicast, callback];
            }
        } else {
            multicast = callback;
        }

        return this;
    }

    // Remove callback from the multicast
    function remove (callback) {
        var i, len = multicast.length;

        if (callback && len > 1) {
            for (i = 0; i < len; i++) {
                if (multicast[i] === callback) {
                    multicast.splice(i, 1);
                    return;
                }
            }
        } else {
            // only one callback in the multicast
            multicast = null;
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