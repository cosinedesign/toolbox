/**
 * Created by Jim Ankrom on 2/3/2016.
 */

    // polyfill Symbol?
    var Symbol = Symbol || {};
    Symbol.iterator = Symbol.iterator || "next";


function Iterable () {

    // Symbol.iterator function returns an object with a next() function
    this[Symbol.iterator] = function () {
        return {
            next: function () {
                if (iter == 1) return { done: true };
                iter++;
                return { value: "hello world", done: false };
            }
        };
    }
}

// TODO : iterable with a