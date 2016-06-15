/**
 * Created by Jim Ankrom on 3/3/2016.
 */
// var p = pipe(callback1)
//  .then(callback2)
//  .then(callback3)
//  .then(callback4)
/**
 *
 * @param callback
 * @returns {invoke}
 */
function pipe(callback) {

    var _current;

    if (callback) {
        _current = function (data) {
            return callback(data);
        };
    }

    var invoke = function (data) {
        if (_current) return _current(data);
        return data;
    };

    // Next needs to wrap current
    invoke.next = function (callback) {
        var previous = _current;

        if (_current) {
            _current = function (data) {
                var result = previous(data);
                return callback(result);
            };
        } else {
            _current = function (data) {
                return callback(data);
            };
        }

        return this;
    };

    invoke.add = function (callbacks) {
        // TODO: support an each method
        var i, item, len = callbacks.length;

        // support to add one function (you really should use NEXT)
        if (typeof callbacks == 'function') {
            invoke.next(callbacks);
        } else {
            for (i = 0; i < len; i++) {
                item = callbacks[i];
                invoke.next(item);
            }
        }
        return this;
    };

    return invoke;
}
