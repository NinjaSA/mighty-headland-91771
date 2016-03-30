angular.module('ninjaApp')
    .controller('updateTechniqueCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'alert', 'techniqueData', 'techniques', 'auth', function($rootScope, $scope, $state, $stateParams, alert, techniqueData, techniques, auth){
        $scope.kyu = $stateParams.kyu;

        $scope.isAdmin = auth.currentUser.isAdmin;

        for(t in techniqueData.techniques){
            if(techniqueData.techniques[t]._id == $stateParams.techniqueId){
                $scope.technique = techniqueData.techniques[t];
                $scope.viewingTechnique = techniqueData.techniques[t];
            }
        }

        $scope.updateTechnique = function(){
            $rootScope.loading = true;
            for(t in techniqueData.techniques){
                if(techniqueData.techniques[t]._id == $stateParams.techniqueId){
                    var index = t;

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
                                kyu: techniqueData.techniques[index].group,
                                techniqueId: techniqueData.techniques[index]._id
                            });
                            $rootScope.loading = false;
                            $scope.technique = {};
                        });
                }
            }
        };

        $scope.uploadVideo = function(){
            var video = {
                files: document.getElementById('video').files,
                name: $scope.technique.name || '',
                description: $scope.technique.description || '',
            }

            $scope.uploading = true;
            $scope.$apply();

            techniques.uploadVideo(video, function(videoId){
                $scope.technique.videoUrl = "https://player.vimeo.com/video/" + videoId;
                $scope.uploading = false;
                $scope.$apply();
            });
        };

        $scope.deleteTechnique = function(){
            for(t in techniqueData.techniques){
                if(techniqueData.techniques[t]._id == $stateParams.techniqueId){
                    var index = t;

                    techniques.removeTechnique(techniqueData.techniques[t])
                        .then(
                            function success(res){
                                alert('success', '"' + techniqueData.techniques[index].name + '" has been deleted!');
                                techniqueData.techniques.splice(index, 1);
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
