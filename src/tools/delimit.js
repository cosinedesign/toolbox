/**
 * Created by Jim Ankrom on 12/14/2014.
 */

// Delimit all optional arguments with delimiter
function delimit (delimiter) {
    var out;
    for (var i=1; i < arguments.length; i++)
    {
        if (out) {
            out+=delimiter;
        } else {
            out = '';
        }
        out+=arguments[i];
    }
    return out;
}


