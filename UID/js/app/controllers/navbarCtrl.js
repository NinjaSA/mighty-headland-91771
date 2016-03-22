angular.module('ninjaApp')
    .controller('navbarCtrl', ['$scope', '$state', 'auth', 'authToken', function($scope, $state, auth, authToken){
        $scope.isLoggedIn = $state.current.url == '/';
        
        $scope.isAdmin = auth.currentUser.isAdmin;

        $scope.logout = function(){
            console.log(authToken.getToken());
            authToken.removeToken();
            console.log(authToken.getToken());
            $scope.showNav = false;
            $state.go('login');
        };
}]);
