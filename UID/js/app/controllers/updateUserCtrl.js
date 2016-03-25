angular.module('ninjaApp')
    .controller('updateUserCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'alert', 'userData', 'auth', function($rootScope, $scope, $stateParams, $state, alert, userData, auth){
        for(usr in userData.users){
            if(userData.users[usr]._id == $stateParams.userId){
                $scope.user = userData.users[usr];
                $scope.viewingUser = userData.users[usr];
            }
        }

        $scope.updateUser = function(deactivated){
            if (deactivated) $scope.user.isActive = false;
            var action = deactivated ? 'deactivated' : 'updated';
            $rootScope.loading = true;

            auth.updateUser($scope.user)
                .then(
                    function success(res){
                        alert('success', $scope.user.firstName + ' has been ' + action +'!');
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
}]);
