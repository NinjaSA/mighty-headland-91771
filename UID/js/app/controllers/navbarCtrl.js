angular.module('ninjaApp')
    .controller('navbarCtrl', ['$rootScope', '$scope', '$state', '$document', 'auth', 'authToken', function($rootScope, $scope, $state, $document, auth, authToken){
        $scope.isAuthenticated = authToken.isAuthenticated;

        $rootScope.$on('user', function(){
            $scope.isInstructor = auth.currentUser.isInstructor || auth.currentUser.isAdmin;
            $scope.currentUser = auth.currentUser;
        });

        $document.on('click', function(e){
            $scope.showNav = angular.element(e.target).hasClass('navbar-toggle')
            $scope.$apply();
        });

        $scope.logout = function(){
            authToken.removeToken();
            $scope.showNav = false;
            $state.go('login');
        };

}]);
