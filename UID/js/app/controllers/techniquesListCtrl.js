angular.module('ninjaApp')
    .controller('techniquesListCtrl', ['$scope', '$stateParams', '$timeout', 'techniqueData', function($scope, $stateParams, $timeout, techniqueData){
        $scope.techniques = techniqueData.techniques;
        $scope.label = $stateParams.label;

        $timeout(function(){
            $scope.listItems = document.querySelectorAll('.list-group-item');
            //$scope.$apply();
        }, 0);
}])
