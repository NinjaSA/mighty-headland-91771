angular.module('ninjaApp')
    .service('auth', ['$http', '$state', 'API_URL', 'authToken', function ($http, $state, API_URL, authToken) {
        this.currentUser = {};

        this.login = function(loginUser){
            return $http.post(API_URL + '/login', loginUser);
        };

        this.addUser = function(newUserObject, success){
            return $http.post(API_URL + '/user', newUserObject);
        };

        this.updateUser = function(userObject){
            return $http.put(API_URL + '/user', userObject);
        };

        this.removeUser = function(userId){
            return $http.delete(API_URL + '/user/?id=' + userId);
        };
    }]);
