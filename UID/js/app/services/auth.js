angular.module('ninjaApp')
    .service('auth', ['$http', '$state', 'API_URL', 'authToken', function ($http, $state, API_URL, authToken) {
        function authSuccess(res){
            authToken.setToken(res.token);
        }

        this.currentUser = {};

        this.login = function(loginUser){
            return $http.post(API_URL + '/login', loginUser).success(authSuccess);
        };

        this.addUser = function(newUserObject, success){
            return $http.post(API_URL + '/user', newUserObject).success(authSuccess);
        };

        this.updateUser = function(userObject){
            return $http.put(API_URL + '/user', userObject).success(authSuccess);
        };

        this.removeUser = function(userId){
            return $http.delete(API_URL + '/user/?id=' + userId).success(authSuccess);
        };
    }]);
