(function(){

   angular.module('ninjaApp')
        .config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function($urlRouterProvider, $stateProvider, $httpProvider){
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl',
                    authenticate: true
                })

                // Users
                .state('login', {
                    url: '/',
                    templateUrl: 'views/users/login.html',
                    controller: 'loginCtrl'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'views/users/users.html',
                    controller: 'usersCtrl',
                    authenticate: true
                })
                .state('addUser', {
                    url: '/user/add',
                    templateUrl: 'views/users/add-user.html',
                    controller: 'addUserCtrl',
                    authenticate: true
                })
                .state('editUser', {
                    url: '/user/edit/:userId',
                    templateUrl: 'views/users/update-user.html',
                    controller: 'updateUserCtrl',
                    authenticate: true
                })

                // Techniques
                .state('techniquesList', {
                    url: '/techniques/:label',
                    templateUrl: 'views/techniques/techniques.html',
                    controller: 'techniquesListCtrl',
                    authenticate: true
                })
                .state('addTechnique', {
                    url: '/technique/add',
                    templateUrl: 'views/techniques/add-technique.html',
                    controller: 'addTechniqueCtrl',
                    authenticate: true
                })
                .state('editTechnique', {
                    url: '/technique/edit/:techniqueId',
                    templateUrl: 'views/techniques/update-technique.html',
                    controller: 'updateTechniqueCtrl',
                    authenticate: true
                })
                .state('techniqueDetail', {
                    url: '/technique/:kyu/:techniqueId',
                    templateUrl: 'views/techniques/technique.html',
                    controller: 'techniqueDetailCtrl',
                    authenticate: true
                })

            $urlRouterProvider.otherwise('/');

            $httpProvider.interceptors.push('authInterceptor');
    }])
    .run(['$rootScope', '$state', 'authToken', function($rootScope, $state, authToken)  {
        authToken.removeToken();

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            if (toState.authenticate && !authToken.isAuthenticated()){
                $state.go("login");
                event.preventDefault();
            }
            if (toState.resolve) {
                $rootScope.loading = true;
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState.resolve) {
                $rootScope.loading = false;
            }
        });

        $rootScope.isOffline = !navigator.onLine;
    }])
    //.constant('API_URL', 'http://localhost:5555/api')
    .constant('API_URL', 'http://mighty-headland-91771.herokuapp.com/api');

}());
