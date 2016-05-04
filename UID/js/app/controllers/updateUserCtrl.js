angular.module('ninjaApp')
    .controller('updateUserCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'alert', 'userData', 'auth', function($rootScope, $scope, $stateParams, $state, alert, userData, auth){
        var usrIndex;

        $scope.isEditingUser = true;
        $scope.isAdmin = auth.currentUser.isAdmin;
        $scope.isInstructor = auth.currentUser.isInstructor;

        for(usr in userData.users){
            if(userData.users[usr]._id == $stateParams.userId){
                usrIndex = usr;
                $scope.user = userData.users[usr];
            }
        }

        $scope.enabled = $scope.isAdmin
                         || (auth.currentUser._id === $stateParams.userId)
                         || ($scope.isInstructor && !$scope.user.isInstructor)

        $scope.isStudent = !$scope.isInstructor && !$scope.isAdmin;

        $scope.updateUser = function(isValid){
            $scope.submitted = true;

            if(isValid){
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
                    });
            }
        };

        $scope.removeUser = function(){
            var firstName = $scope.user.firstName;

            auth.removeUser($scope.user._id)
                .then(function success(res){
                    var name = firstName || 'Ninja';

                    alert('success', name + ' has been removed!');
                    userData.users.splice(usrIndex, 1);
                }, function error(res){
                    alert('danger', 'Something went wrong!', 5000);
                })
                .finally(function(){
                    $state.go('users');
                    $scope.user = {};
                });
        }
}]);
