angular.module('ninjaApp')
    .controller('addTechniqueCtrl', ['$rootScope', '$scope', '$state', 'alert', 'techniques', 'techniqueData', function($rootScope, $scope, $state, alert, techniques, techniqueData){
        $scope.technique = {};

        $scope.setTechniqueImage = function(input, target){
            techniques.toDataURL(input, target, function(data){
                if(data){
                    $scope.technique.image = data;
                    $scope.$apply();
                }
                else{
                    alert('danger', 'Images cannot be larger that 300kb');
                }
            });
        };

        $scope.addTechnique = function(isValid){
            $scope.submitted = true;
            if(isValid){
                techniques.addTechnique($scope.technique)
                    .then(
                        function success(res){
                            techniqueData.techniques.push(res.data);
                            alert('success', 'A new technique has been added!');
                        },
                        function error(res){
                            alert('danger', 'Could not connect to Ninja Server. Check your internet connection and try again.! (' + res + ')');
                        }
                    )
                    .finally(function(){
                        $state.go("techniquesList", { label: $scope.technique.group });
                    });
            }
        };

        $scope.uploadVideo = function(){
            var video = {
                files: document.getElementById('video').files,
                name: $scope.technique.name || '',
                description: $scope.technique.description || '',
            }
            $scope.uploading = true
            $scope.$apply();

            techniques.uploadVideo(video, function(videoId){
                $scope.uploading = true
                $scope.technique.videoUrl = "https://player.vimeo.com/video/" + videoId;
                $scope.$apply();
            });
        };
}]);
