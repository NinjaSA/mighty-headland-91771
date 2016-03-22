angular.module('ninjaApp')
    .controller('addTechniqueCtrl', ['$scope', '$state', 'alert', 'techniques', 'techniqueData', function($scope, $state, alert, techniques, techniqueData){
        $scope.addTechnique = function(){
            //$scope.technique._id = new Date().getTime();

            techniques.addTechnique($scope.technique)
                .then(
                    function success(res){
                        console.log('TECHNIQUE ADDED', res)
                        techniqueData.techniques.push(res.technique);
                        alert('success', 'A new technique has been added!');
                    },
                    function error(res){
                        alert('danger', 'Something went wrong! (' + res + ')');
                    }
                )
                .finally(function(){
                    $state.go("techniquesList", { label: $scope.technique.group });
                });
        };
}]);
