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
                page.showHome();
            });

            this.get('#/register/', function () {
                page.showRegister();
            });

            this.get('#/login/', function () {
                page.showLogin();
            });

            this.get('#/app/', function () {
                page.showApp();
            });
        });

        app.run('#/home');
            //function refreshMessages() {
            //    request.Get("api/students")
            //        .then(function (data) {
            //            if (data.length > 30) {
            //                data = data.slice(data.length - 30)
            //            }

            //            var messagesList = $("<ul />").addClass("chat-container");
            //            var templateString = $("#chat-message-template").html();
            //            var template = mustache.compile(templateString);
            //            for (var i = data.length; i >= 0; i -= 1) {
            //                var message = data[i];
            //                var templatedMessage = template(message);
            //                var messageItem = $("<li />").addClass("student-item")
            //                            .html(templatedMessage);
            //                messagesList.append(messageItem);
            //            }

            //            $("#main-content").html(messagesList);
            //        });
            //}

    });
}());