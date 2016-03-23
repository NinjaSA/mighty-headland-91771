(function(){

   angular.module('ninjaApp')
        .config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function($urlRouterProvider, $stateProvider, $httpProvider){
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'views/users.html',
                    controller: 'usersCtrl'
                })

                // Account
                .state('login', {
                    url: '/',
                    templateUrl: 'views/account/login.html',
                    controller: 'loginCtrl'
                })
                .state('addUser', {
                    url: '/user/add',
                    templateUrl: 'views/account/add-user.html',
                    controller: 'addUserCtrl'
                })
                .state('editUser', {
                    url: '/user/edit/:userId',
                    templateUrl: 'views/account/update-user.html',
                    controller: 'updateUserCtrl'
                })

                // Techniques
                .state('techniquesList', {
                    url: '/techniques/:label',
                    templateUrl: 'views/techniques/techniques.html',
                    controller: 'techniquesListCtrl'
                })
                .state('addTechnique', {
                    url: '/technique/add',
                    templateUrl: 'views/techniques/add-technique.html',
                    controller: 'addTechniqueCtrl'
                })
                .state('editTechnique', {
                    url: '/technique/edit/:techniqueId',
                    templateUrl: 'views/techniques/update-technique.html',
                    controller: 'updateTechniqueCtrl'
                })
                .state('techniqueDetail', {
                    url: '/technique/:kyu/:techniqueId',
                    templateUrl: 'views/techniques/technique.html',
                    controller: 'techniqueDetailCtrl'
                })

            $urlRouterProvider.otherwise('/');

            $httpProvider.interceptors.push('authInterceptor');
    }])
    .run(['$rootScope', '$state', function($rootScope, $state)  {
        $rootScope.$state = $state;
        $rootScope.isOffline = !navigator.onLine;
    }])
    //.constant('API_URL', 'http://localhost:5555/api')
    .constant('API_URL', 'http://mighty-headland-91771.herokuapp.com/api');

}());
