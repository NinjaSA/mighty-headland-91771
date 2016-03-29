angular.module('ninjaApp')
    .controller('updateUserCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'alert', 'userData', 'auth', function($rootScope, $scope, $stateParams, $state, alert, userData, auth){
        for(usr in userData.users){
            if(userData.users[usr]._id == $stateParams.userId){
                $scope.user = userData.users[usr];
                $scope.viewingUser = userData.users[usr];
            }
        }

        $scope.updateUser = function(){
            $rootScope.loading = true;

            auth.updateUser($scope.user)
                .then(
                    function success(res){
                        alert('success', res.data.firstName + ' has been updated!');
                    },
                    function error(res){
                        alert('danger', 'Something went wrong!', 5000);
                    })
                .finally(function(){
                    $state.go('users');
                    $scope.user = {};
                    $rootScope.loading = false;
                });
        };

        $scope.removeUser = function(){
            $rootScope.loading = true;

            auth.removeUser($scope.user)
                .then(function success(res){
                    alert('success', res.data.firstName + ' has been removed!');
                }, function error(res){
                    alert('danger', 'Something went wrong!', 5000);
                })
                .finally(function(){
                    $state.go('users');
                    $scope.user = {};
                    $rootScope.loading = false;
                });
        }
}]);
