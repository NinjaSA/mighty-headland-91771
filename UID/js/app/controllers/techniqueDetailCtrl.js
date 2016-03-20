angular.module('ninjaApp')
    .controller('techniqueDetailCtrl', ['$scope',  '$state', '$stateParams', '$sce', 'techniqueData', function($scope, $state, $stateParams, $sce, techniqueData){
        $scope.kyu = $stateParams.kyu;

        for(t in techniqueData.techniques){
            if(techniqueData.techniques[t]._id == $stateParams.techniqueId){
                $scope.technique = techniqueData.techniques[t];
                $scope.videoUrl = $sce.trustAsResourceUrl($scope.technique.videoUrl);
            }
        }
}]);
