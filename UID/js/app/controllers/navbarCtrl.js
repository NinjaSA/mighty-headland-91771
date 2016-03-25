angular.module('ninjaApp')
    .controller('navbarCtrl', ['$rootScope', '$scope', '$state', '$document', 'auth', 'authToken', function($rootScope, $scope, $state, $document, auth, authToken){
        $scope.isAuthenticated = authToken.isAuthenticated;

        $rootScope.$on('user', function(){
            $scope.isAdmin = auth.currentUser.isAdmin;
        });

        $scope.logout = function(){
            authToken.removeToken();
            $scope.showNav = false;
            $state.go('login');
        };

}]);
