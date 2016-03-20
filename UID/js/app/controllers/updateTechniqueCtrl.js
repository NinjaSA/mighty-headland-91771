angular.module('ninjaApp')
    .controller('updateTechniqueCtrl', ['$scope', '$state', '$stateParams', 'alert', 'techniqueData', 'techniques', function($scope, $state, $stateParams, alert, techniqueData, techniques){
        $scope.kyu = $stateParams.kyu;

        for(t in techniqueData.techniques){
            if(techniqueData.techniques[t]._id == $stateParams.techniqueId){
                $scope.technique = techniqueData.techniques[t];
                $scope.viewingTechnique = techniqueData.techniques[t];
            }
        }

        $scope.updateTechnique = function(){
            for(t in techniqueData.techniques){
                if(techniqueData.techniques[t]._id == $stateParams.techniqueId){

                    techniques.updateTechnique(techniqueData.techniques[t])
                        .then(
                            function success(res){
                                alert('success', 'The technique has been updated!');
                            },
                            function error(err){
                                alert('danger', 'Something went wrong!');
                            })
                        .finally(function(){
                            $state.go('techniqueDetail', {
                                kyu: techniqueData.techniques[t].group,
                                techniqueId: techniqueData.techniques[t]._id
                            });
                            $scope.technique = {};
                        });
                }
            }
        };

        $scope.deleteTechnique = function(){
            for(t in techniqueData.techniques){
                if(techniqueData.techniques[t]._id == $stateParams.techniqueId){

                    techniques.removeTechnique(techniqueData.techniques[t])
                        .then(
                            function success(res){
                                alert('success', '"' + techniqueData.techniques[t].name + '" has been deleted!');
                                techniqueData.techniques.splice(t, 1);
                            },
                            function error(err){
                                alert('danger', 'Something went wrong!');
                            })
                        .finally(function(){
                            $scope.technique = {};
                        });
                }
            }
        };
}]);
