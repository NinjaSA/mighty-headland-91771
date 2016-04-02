angular.module('ninjaApp')
    .controller('homeCtrl', ['$scope', '$http', 'API_URL', 'auth', 'levelsData', 'techniqueData', function($scope, $http, API_URL, auth, levelsData, techniqueData){
        $scope.levels = levelsData.levels;

        $scope.checkLevel = function(level){
            if (auth.currentUser.level && auth.currentUser.level.indexOf('kyu') != -1){
                var currentLevel = parseInt(level),
                    userLevel = parseInt(auth.currentUser.level);
                    
                return (userLevel - 1) <= currentLevel;
            }

            return true;
        }

        $scope.countTechniques = function(level){
            var count = 0;

            for(t in techniqueData.techniques){
                if(level == techniqueData.techniques[t].group){
                    count += 1;
                }
            }
            return count;
        }
}]);
