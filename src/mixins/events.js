/**
 * Created by Jim Ankrom on 1/30/2016.
 */

// Depends on multicast
    var mixins = $root.mixins = {

        // Make target into an evented object
        // Depends on multicast
        events: function (target, events) {
            options = options || {};
            var targetEvents = events || {};

            // add event handler for event
            target.on = function (eventName, handler) {
                if (!targetEvents) targetEvents = {};
                if (!targetEvents[eventName]) {
                    targetEvents[eventName] = Xpdm.utility.multicast(handler);
                } else {
                    targetEvents[eventName].add(handler);
                }
                return this;
            };

            // remove specific event
            target.off = function (eventName, callback) {
                doIfExists(eventName, function (handlers) {
                    handlers.remove(callback);
                });
            };

            // remove all events
            target.allOff = function () {
                targetEvents = {};
            };

            // enable the event
            target.enableEvent = function (eventName) {
                doIfExists(eventName, function (handlers) {
                    handlers.enable();
                });
            };

            // disable the event
            target.disableEvent = function (eventName) {
                doIfExists(eventName, function (handlers) {
                    handlers.disable();
                });
            };

            // trigger the event
            target.trigger = function (eventName) {
                var myEvent = eventName;
                [].splice.call(arguments, 0, 1); // slick hack to shift arguments "array" that isn't an array
                var thatArgs = arguments;
                doIfExists(myEvent, function (handlers) {
                    handlers.apply(target, thatArgs);
                });
                return this;
            };


            function doIfExists(eventName, action) {
                if (targetEvents) {
                    var handlers = targetEvents[eventName];
                    if (handlers) {
                        action(handlers);
                    }
                }
            }

            return target;
        }
    };

