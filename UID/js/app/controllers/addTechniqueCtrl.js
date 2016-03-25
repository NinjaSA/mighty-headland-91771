angular.module('ninjaApp')
    .controller('addTechniqueCtrl', ['$rootScope', '$scope', '$state', 'alert', 'techniques', 'techniqueData', function($rootScope, $scope, $state, alert, techniques, techniqueData){
        $scope.addTechnique = function(){
            $rootScope.loading = true;

            techniques.addTechnique($scope.technique)
                .then(
                    function success(res){
                        techniqueData.techniques.push(res.data);
                        alert('success', 'A new technique has been added!');
                    },
                    function error(res){
                        alert('danger', 'Something went wrong! (' + res + ')');
                    }
                )
                .finally(function(){
                    $state.go("techniquesList", { label: $scope.technique.group });
                    $rootScope.loading = false;
                });
        };
}]);
