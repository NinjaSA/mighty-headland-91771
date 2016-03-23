angular.module('ninjaApp')
    .controller('loginCtrl', ['$scope', '$http', '$state', 'auth', 'authToken', 'alert', 'techniqueData', 'userData', function($scope, $http, $state, auth, authToken, alert, techniqueData, userData){
        $scope.login = function(){
            auth.login($scope.loginUser)
                .then(
                    function success(res){
                        if(res.data.currentUser){
                            auth.currentUser = res.data.currentUser;
                            userData.users = res.data.users;
                            techniqueData.techniques = res.data.techniques;

                            alert('success', 'Welcome ' + res.data.currentUser.firstName);
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
}]);
