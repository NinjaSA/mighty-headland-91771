angular.module('ninjaApp')
    .controller('techniquesListCtrl', ['$scope', '$stateParams', 'techniqueData', function($scope, $stateParams, techniqueData){
        $scope.techniques = techniqueData.techniques;
        $scope.label = $stateParams.label;

        setTimeout(function(){
            $scope.listItems = document.querySelectorAll('.list-group-item');
            $scope.$apply();
        }, 500);
}]);
