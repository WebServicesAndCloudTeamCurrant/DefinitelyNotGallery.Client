/// <reference path="jquery-2.0.2.js" />
define(['jquery'], function () {

    var httpRequester = (function () {
        function getJSON(url, success, error) {
            $.ajax({
                url: url,
                type: "GET",
                timeout: 15000,
                contentType: "application/json",
                success: success,
                error: error
            });
        }

        function postJSON(url, data, success, error, headers) {
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                contentType: "application/json",
                timeout: 150000,
                data: JSON.stringify(data),
                success: success,
                error: error
            });
        }

        function post(url, data, success, error, headers) {
            $.ajax({
                url: url,
                type: "POST",
                headers: headers,
                contentType: "application/x-www-form-urlencoded",
                timeout: 150000,
                data: data,
                success: success,
                error: error
            });
        }

        function put(url, success, error, headers) {
            $.ajax({
                url: url,
                type: "PUT",
                headers: headers,
                timeout: 5000,
                success: success,
                error: error
            });
        }
        return {
            getJSON: getJSON,
            postJSON: postJSON,
            post: post,
            put: put
        };
    }());

    return httpRequester;
});