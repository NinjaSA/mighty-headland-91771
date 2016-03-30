angular.module('ninjaApp')
    .controller('updateUserCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'alert', 'userData', 'auth', function($rootScope, $scope, $stateParams, $state, alert, userData, auth){
        var usrIndex;

        $scope.isAdmin = auth.currentUser.isAdmin;
        
        for(usr in userData.users){
            if(userData.users[usr]._id == $stateParams.userId){
                usrIndex = usr;
                $scope.user = userData.users[usr];
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
            $scope.user.isActive = false;

            auth.removeUser($scope.user._id)
                .then(function success(res){
                    var name = res.data.firstName || 'Ninja';

                    alert('success', name + ' has been removed!');
                    userData.users.splice(usrIndex, 1);
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
