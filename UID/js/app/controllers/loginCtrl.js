angular.module('ninjaApp')
    .controller('loginCtrl', ['$rootScope', '$scope', '$http', '$state', 'auth', 'authToken', 'alert', 'techniqueData', 'userData', function($rootScope, $scope, $http, $state, auth, authToken, alert, techniqueData, userData){

        $scope.login = function(isValid){
            $scope.submitted = true;
            if(isValid) {
                $scope.loginUser.email = $scope.loginUser.email.toLowerCase();

                auth.login($scope.loginUser)
                    .then(
                        function success(res){
                            if(res.data.currentUser){
                                authToken.setToken(res.data.token);
                                auth.currentUser = res.data.currentUser;
                                userData.users = res.data.users;
                                techniqueData.techniques = res.data.techniques;
                                $rootScope.$broadcast('user');
                                alert('success', 'Hey ' + res.data.currentUser.firstName);
                                $state.go('home');
                            }
                            else{
                                alert('danger', res.data);
                            }
                        },
                        function error(res){
                            alert('danger', 'Something went wrong!');
                        }
                    );
            }
        }
}]);
