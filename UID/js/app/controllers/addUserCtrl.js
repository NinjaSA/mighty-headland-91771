angular.module('ninjaApp')
    .controller('addUserCtrl', ['$rootScope', '$scope', '$http', '$state', 'alert', 'userData', 'auth', 'API_URL', function($rootScope, $scope, $http, $state, alert, userData, auth, API_URL, coursesData){
        $scope.isAdmin = auth.currentUser.isAdmin;

        $scope.enabled = true;

        //$scope.courses = ["Sai", "Kurki", "Archery", "Grappling" ];

        $scope.addUser = function(isValid){
            $scope.submitted = true;

            if(isValid){
                $scope.user.email = $scope.user.email.toLowerCase();

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
                    });
            }
        };
}]);
