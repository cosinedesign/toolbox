/**
 * Created by Jim Ankrom
 */
// Multicast Delegate for Event Handlers
// TODO: Build a chain into multicast
function multicast(callback) {
    var self = this,
        delegates = [];

    if (callback) delegates.push(callback);

    // Invoke the delegate list
    function invoke () {
        for (var i = 0; i < delegates.length; i++) {
            delegates[i].apply(self, arguments);
        }
    }
    // Add callback to the multicast
    function add (callback) {
        delegates.push(callback);
        return this;
    }

    invoke.items = delegates;
    invoke.add = add;

    return invoke;
}
