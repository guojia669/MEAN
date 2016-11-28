var app = angular.module('flapperNews', ['ui.router']);

app.controller('MainCtrl', ['$scope', 'posts', function ($scope, posts) {
    var self = $scope;
    self.posts = posts.posts;

    self.addPost = function () {
        if (!self.title || self.title === '') {
            alert("Please enter a valid title.");
            return;
        }
        self.posts.push({
            title: self.title,
            link: self.link,
            upvotes: 0,
            comments: [
                {
                    author: 'Joe',
                    body: 'Cool post',
                    upvotes: 0
                },
                {
                    author: 'Bob',
                    body: 'Great idea but everything is wrong!',
                    upvotes: 0
                }
            ]
        });
        resetForm();
    }

    function resetForm() {
        self.title = '';
        self.link = '';
    }

    self.upvote = function (post) {
        post.upvotes++;
    }

}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
    var self = $scope;
    self.post = posts.posts[$stateParams.id];

    self.upvote = function(comment) {
        comment.upvotes++;
    }

    self.addComment = function() {
        if (!self.body || self.body === '') {
            return;
        }
        self.post.comments.push({
            body: self.body,
            author: 'user',
            upvotes: 0
        });
        resetForm();
    }

    function resetForm() {
        self.body = '';
    }
}]);

app.factory('posts', [function(){
    var o = {
        posts: []
    };

    function init() {
        for (var i = 1; i <= 5; i++) {
            var post = {
                title: 'post ' + i,
                upvotes: i * 10
            };
            o.posts.push(post);
        }
    }

    init();

    return o;
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        })
        .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        });

    $urlRouterProvider.otherwise('home');
}]);