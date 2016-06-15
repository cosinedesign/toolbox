/**
 * Created by Jim Ankrom on 1/31/2016.
 *
 * Property toolkit
 *
 * To enable:
 * - Lazy loaded properties
 * - Observeable properties
 * - Transformations / calculated properties
 *
 */

// TODO: test for memory leaks

/*
    options.loader
    options.observer (can also function as transform
 */


/*

 When we initialize a property, it should be extensible
 set.transform
 set.observer
 get.loader

 * */

function buildLoader (state, callback) {
    return function () {
        if (!(state.value)) {
            state.value = callback();
        }
        return state.value;
    };
}
function buildObserver (state, callback, target) {
    return function (value) {
        state.value = callback(value, state.value, target)
    };
}

function property (name, options, target) {
    // target last to allow bind / call / apply to override this
    target = target || this;
    var state = {},
        getter,
        setter;

    if (options.loader) {
        getter = buildLoader(state, options.loader, target);
    } else {
        getter = function () {
            return getter.state.value;
        };
    }
    getter.state = state;

    if (options.observer) {
        setter = buildObserver(state, options.observer, target);
    } else {
        setter = function (value) {
            state.value = value;
            return value;
        };
    }

    //var definition = {
    //    enumerable: true,
    //    configurable: false,
    //    writable: false,
    //    value: null
    //};

    Object.defineProperty(target, name, {
        get: getter,
        set: setter
    });

    return this;
}


