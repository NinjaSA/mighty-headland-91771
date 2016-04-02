angular.module('ninjaApp')
    .controller('techniqueDetailCtrl', ['$scope',  '$state', '$stateParams', '$sce', 'techniqueData', 'auth', function($scope, $state, $stateParams, $sce, techniqueData, auth){
        $scope.kyu = $stateParams.kyu;
        $scope.isInstructor = auth.currentUser.isInstructor;
        $scope.isAdmin = auth.currentUser.isAdmin;

        for(t in techniqueData.techniques){
            if(techniqueData.techniques[t]._id == $stateParams.techniqueId){
                $scope.technique = techniqueData.techniques[t];
            }
        }

}])
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val + '?title=0&byline=0');
    };
}]);
