angular.module('ninjaApp')
    .controller('loginCtrl', ['$scope', '$http', '$state', 'auth', 'alert', 'techniqueData', 'userData', function($scope, $http, $state, auth, alert, techniqueData, userData){
        $scope.login = function(){
            auth.login($scope.loginUser)
                .then(
                    function success(res){
                        if(res.data){
                            userData.users = res.data.users;
                            techniqueData.techniques = res.data.techniques;
                            alert('success', 'Welcome ' + res.data.currentUser.firstName);
                            $state.go('home');
                        }
                        else{
                            alert('danger', 'User not found!');
                        }
                    },
                    function error(res){
                        alert('danger', err);
                    }
                );
        }
}]);
