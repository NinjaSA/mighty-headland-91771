angular.module('ninjaApp')
    .controller('addUserCtrl', ['$rootScope', '$scope', '$http', '$state', 'alert', 'userData', 'auth', 'API_URL', function($rootScope, $scope, $http, $state, alert, userData, auth, API_URL){
        $scope.isAdmin = auth.currentUser.isAdmin;
        
        $scope.addUser = function(){
            $rootScope.loading = true;
            $scope.user.isActive = true;

            auth.addUser($scope.user)
                .success(function(res){
                    if(!res.hasUser){
                        userData.users.push(res.user);
                        alert('success', $scope.user.firstName + ' has been added!');
                        $scope.user = {};
                        $state.go('users');
                    }
                    else{
                        alert('danger', res.message);
                    }
                })
                .error(function(err){
                    alert('danger', 'Something went wrong!', 5000);
                    $scope.user = {};
                    $state.go('users');
                })
                .finally(function(){
                    $rootScope.loading = false;
                });
        };
}]);
