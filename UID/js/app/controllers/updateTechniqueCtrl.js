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

        $scope.setTechniqueImage = function(input, target){
            techniques.toDataURL(input, target, function(data){
                if(data){
                    $scope.technique.image = data;
                    $scope.$apply();
                }
                else{
                    alert('danger', 'Images cannot be larger that 200kb');
                }
            });
        };

        $scope.updateTechnique = function(isValid){
            $scope.submitted = true;
            if(isValid){
                for(t in techniqueData.techniques){
                    if(techniqueData.techniques[t]._id == $stateParams.techniqueId){
                        var index = t;
                        techniqueData.techniques[t].image = $scope.technique.image;
                        console.log(techniqueData.techniques[t].image)
                        techniques.updateTechnique(techniqueData.techniques[t])
                            .then(
                                function success(res){
                                    alert('success', 'The technique has been updated!');
                                },
                                function error(err){
                                    alert('danger', 'Could not connect to Ninja Server. Check your internet connection and try again.!');
                                })
                            .finally(function(){
                                $state.go('techniqueDetail', {
                                    kyu: techniqueData.techniques[index].group,
                                    techniqueId: techniqueData.techniques[index]._id
                                });
                                $scope.technique = {};
                            });
                    }
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
                                alert('danger', 'Could not connect to Ninja Server. Check your internet connection and try again.!');
                            })
                        .finally(function(){
                            $scope.technique = {};
                        });
                }
            }
        };
}]);
