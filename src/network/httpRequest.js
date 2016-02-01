/**
 * Created by Jim Ankrom on 1/1/2015.
 *
 * Custom XHR request module, for when you don't want/need other libraries
 */

var httpRequest = {
    delete: function (url, params, options) {
        return this.request(url, 'DELETE', params, options);
    },
    get: function (url, params, options) {
        return this.request(url, 'GET', params, options);
    },
    post: function (url, params, options) {
        return this.request(url, 'POST', params, options);
    },
    request: function (url, verb, params, options) {
        var options = options || {};
        if (window.XMLHttpRequest) {
            var http = new XMLHttpRequest();
            http.withCredentials = true;
            options.responseType = options.responseType || "json";
            if (http.responseType) http.responseType = options.responseType;

            http.onreadystatechange = function () {
                if (http.readyState == 4) {
                    if (http.status == 200) {
                        var response;
                        if (!http.responseType) {
                            if (options.responseType == 'json' && http.responseText) {
                                try {
                                    response = JSON.parse(http.responseText);
                                } catch (ex) {
                                    response = ex;
                                }
                            } else {
                                response = http.responseText;
                            }
                        }

                        if (options.success) {
                            options.success(http, response);
                        }

                    } else {
                        if (options.error) {
                            options.error(http, http.response);
                        }
                    }
                }
            };
            var message = JSON.stringify(params);
            //console.log(url);
            http.open(verb, url, true);
            http.setRequestHeader('Accept', '*/*');
            http.setRequestHeader('Content-Type', 'application/json');

            //http.setRequestHeader("Content-Length", message.length);
            //http.send(params);
            http.send(message);
            return http;
        }
        // because IE5&6 needs to go away
        return 'You are using a browser that does not support required technology';
    }
};
