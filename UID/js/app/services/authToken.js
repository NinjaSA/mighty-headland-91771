angular.module('ninjaApp').factory('authToken', ['$window', function($window){
    var cachedToken;
    var storage = $window.sessionStorage;
    var userToken = 'NinjaSA_Token';

    var authToken = {
        getToken: function(){
            if(!cachedToken)
                cachedToken = storage.getItem(userToken);

            return cachedToken;
        },
        setToken: function(token){
            cachedToken = token;
            storage.setItem(userToken, token);
        },
        removeToken: function(){
            cachedToken = null;
            storage.removeItem(userToken);
        },
        isAuthenticated: function(){
            return !!authToken.getToken();
        }
    };

    return authToken;
}]);
