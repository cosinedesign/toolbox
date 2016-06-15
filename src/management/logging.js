/**
 * Created by Jim Ankrom on 3/12/2016.
 */

function log (message, logModule, logObject) {
    if (this.debug) {
        if (console && console.log) {
            var extended = '';
            if (logObject) extended = ': ' + JSON.stringify(logObject);
            if (logModule)
                console.log('[' + logModule + '] - ' + message + extended );
            else
                console.log(message + extended );
        }
    }
}




