﻿/// <reference path="http-requester.js" />
/// <reference path="class.js" />
/// <reference path="libs/sha1.js" />
define(['jquery', 'request', 'mustache', 'sha1'], function ($, httpRequester, mustache) {

    var persisters = (function () {
        //TO DO Extract this into module!
        // DONE =)
        var serverUrl = 'http://definitelynotgallery.apphb.com/';
        //var serverUrl = 'http://localhost:19822/';

        function saveUserData(userData) {
            localStorage.setItem("token", userData.access_token);
            localStorage.setItem("user", userData.userName);
        }

        function clearUserData() {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }

        function registerUser(username, email, password, confirmedPassword) {
            httpRequester.postJSON(
                serverUrl + 'api/Account/Register',
                {
                    "UserName": username,
                    "Email": email,
                    "Password": password,
                    "ConfirmPassword": confirmedPassword
                },
                function () {
                    window.location = '#/app/';
                },
                function (err) {
                    //alert(err.responseJSON.message);
                    //console.log('ERROR');
                    console.log(err);
                });
        }

        function loginUser(username, password) {
            //authCode = CryptoJS.SHA1(username + password).toString();
            httpRequester.post(
                serverUrl + 'Token',
                'grant_type=password&username=' + username + '&password=' + password,
                function (data) {
                    window.location = '#/app/';
                    //console.log(data);
                    saveUserData(data);
                },
                function (err) {
                    console.dir(err);
                    //console.log('ERROR');
                    //console.log(err);
                });
        }

        function logoutUser() {
            if (localStorage.getItem("user")) {
                clearUserData();
                window.location = '#/home';
            }
            else {
                clearUserData();
                window.location = '#/home';
            }
        }

        function isUserLogged() {
            if (localStorage.getItem('user')) {
                return true;
            }

            return false;
        }

        function allPosts() {
            httpRequester.getJSON(
                serverUrl + '/post',
                function (data) {
                    console.log(data);
                    var messagesList = $("<ul />");
                    var templateString = $("#posts-template").html();
                    var template = mustache.compile(templateString);
                    for (var i = data.length; i >= 0; i -= 1) {
                        var message = data[i];
                        var templatedMessage = template(message);
                        var messageItem = $("<li />").addClass("post-item")
                                    .html(templatedMessage);
                        messagesList.append(messageItem);
                    }
                    $('#posts-container').html(messagesList);
                },
                function (err) {

                });
        }

        function sendPost(title, body) {
            if (!isUserLogged()) {
                alert('Guests cannot send posts!');
                return;
            }

            httpRequester.postJSON(
            serverUrl + '/post',
            {
                "title": title,
                "body": body
            },
            { 'X-SessionKey': localStorage.getItem("sessionKey") },
            function (data) {
                alert('Successfully posted.');
            },
            function (err) {
                console.log('ERROR');
                console.log(err);
            });
        }

        return {
            login: loginUser,
            register: registerUser,
            logout: logoutUser,
            isUserLogged: isUserLogged,
            allPosts: allPosts,
            sendPost: sendPost
        };
    }());

    return persisters;
});