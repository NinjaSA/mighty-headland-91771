angular.module('ninjaApp').factory('authInterceptor', ['authToken', function(authToken){
    return{
        request: function(config){
            var token = authToken.getToken();

            if(token)
                config.headers.Authorization = token;

            return config;
        },
        response: function(res){
            return res;
        }
    };
}]);
