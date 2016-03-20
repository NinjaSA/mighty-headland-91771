angular.module('ninjaApp')
    .controller('usersCtrl', ['$scope', '$http', 'userData', function($scope, $http, userData){
        $scope.users = userData.users;
}]);
