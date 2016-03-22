angular.module('ninjaApp')
    .controller('homeCtrl', ['$scope', '$http', 'API_URL', 'auth', function($scope, $http, API_URL, auth){
        $scope.levels = levels;

        $scope.checkLevel = function(level){
            if (auth.currentUser.level && auth.currentUser.level.indexOf('kyu') != -1){
                var currentLevel = parseInt(level),
                    userLevel = parseInt(auth.currentUser.level);

                return userLevel <= currentLevel;
            }

            return true;
        }
}]);
