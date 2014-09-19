/// <reference path="libs/jquery-2.0.2.js" />
/// <reference path="http-requester.js" />
define(['jquery', 'persister'], function ($, persisters) {
    var ui = (function () {
        function showHome() {
            $.ajax({
                url: 'partials/home.html',
                success: function (homeHTML) {
                    if (persisters.isUserLogged()) {
                        window.location = '#/app/';
                    }
                    else {
                        $('#container-user-info').html(homeHTML);
                    }
                },
                error: function () {
                    alert('Cannot load home!');
                }
            });
        };

        function showLogin() {
            $.ajax({
                url: 'partials/login.html',
                success: function (logInHTML) {
                    var $container = $('#content').html(logInHTML);
                    $container.find('#btn-login')
                        .on('click', function () {
                            var username = $container.find('#tb-login-username').val();
                            var password = $container.find('#tb-login-password').val();
                            persisters.login(username, password);
                        });
                },
                error: function () {
                    alert('Cannot load log-in!');
                }
            });
        }

        function showRegister() {
            $.ajax({
                url: 'partials/register.html',
                success: function (registerHTML) {
                    var $container = $('#content').html(registerHTML);
                    $container.find('#btn-register')
                        .on('click', function () {
                            var username = $container.find('#tb-register-username').val();
                            var email = $container.find('#tb-register-email').val();
                            var password = $container.find('#tb-register-password').val();
                            var confirmedPassword = $container.find('#tb-register-confirm-password').val();

                            // TODO: Validation here
                            // TODO: email validation
                            if (password != confirmedPassword) {
                                alert("Passwords do not match!");
                                return;
                            }

                            persisters.register(username, email, password, confirmedPassword);
                        });
                },
                error: function () {
                    alert('Cannot load register!');
                }
            });
        }

        function showApp() {
            $.ajax({
                url: 'partials/app.html',
                success: function (appHTML) {
                    var $container = $('#content').html(appHTML);
                    var $button = $('#container-user-info').find('#btn-logout');
                    $button.on('click', function () {
                            persisters.logout();
                        });
                    $container.find('#btn-get-posts')
                        .on('click', function () {
                            persisters.allPosts();
                        });
                    $container.find('#btn-post')
                        .on('click', function () {
                            var title = $container.find('#post-title').val();
                            var body = $container.find('#post-body').val();
                            persisters.sendPost(title, body);
                        });
                },
                error: function () {
                    alert('Cannot load application!');
                }
            });
        }

        function showUserInfo() {
            $.ajax({
                url: 'partials/userInfo.html',
                success: function (userInfoHtml) {
                    $('#container-user-info').html(userInfoHtml);
                    var user = localStorage.getItem('user');

                    $('#user').html(user);
                },
                error: function () {
                    alert('Cannot load user-info!');
                }
            });
        }

        function clearContent() {
            $('#content').empty();
        }

        return {
            showHome: showHome,
            showLogin: showLogin,
            showRegister: showRegister,
            showApp: showApp,
            showUserInfo: showUserInfo,
            clearContent: clearContent
        };
    }());

    return ui;
});