angular.module('ninjaApp')
  .service('alert', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    var alertTimeout;

    return function(type, message, timeout){
        $rootScope.alert = {
            hasBeenShown: true,
            show: true,
            type: type,
            message: message,
        }
        $timeout.cancel(alertTimeout);
        alertTimeout = $timeout(function(){
            $rootScope.alert.show = false;
        }, timeout || 2500);
    }
}]);
