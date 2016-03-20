angular.module('ninjaApp')
    .controller('addUserCtrl', ['$scope', '$http', '$state', 'alert', 'userData', 'auth', 'API_URL', function($scope, $http, $state, alert, userData, auth, API_URL){
        $scope.addUser = function(){
            //$scope.user._id = new Date().getTime();
            $scope.user.isActive = true;

            auth.addUser($scope.user)
                .success(function(res){
                    userData.users.push($scope.user);
                    alert('success', $scope.user.firstName + ' has been added!');
                    $scope.user = {};
                    $state.go('users');
                })
                .error(function(err){
                    alert('danger', 'Something went wrong!', 5000);
                    $scope.user = {};
                    $state.go('users');
                });
        };
}]);
