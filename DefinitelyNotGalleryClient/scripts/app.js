/// <reference path="libs/require.js" />
(function () {
    require.config({
        paths: {
            jquery: 'libs/jquery-2.0.2',
            mustache: 'libs/mustache',
            sammy: 'libs/sammy',
            request: 'http-requester',
            persister: 'persister',
            page: 'user-interface'
        }
    });

    require(['sammy', 'page'], function (sammy, page) {
        var app = sammy('#content', function () {
            this.get('#/home', function () {
                page.clearContent();
                page.showHome();
            });

            this.get('#/register/', function () {
                page.showRegister();
            });

            this.get('#/login/', function () {
                page.showLogin();
            });

            this.get('#/app/', function () {
                page.showUserInfo();
                page.showApp();
            });
        });

        app.run('#/home');
    });
}());