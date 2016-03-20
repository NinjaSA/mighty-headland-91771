angular.module('ninjaApp')
    .controller('homeCtrl', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL){
        $scope.levels = levels;

        $http({
            method: 'GET',
            url: API_URL + '/'
        });
}]);
