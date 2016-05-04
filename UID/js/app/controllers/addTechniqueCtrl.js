angular.module('ninjaApp')
    .controller('addTechniqueCtrl', ['$rootScope', '$scope', '$state', 'alert', 'techniques', 'techniqueData', function($rootScope, $scope, $state, alert, techniques, techniqueData){
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
                            alert('danger', 'Something went wrong! (' + res + ')');
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

            $scope.$apply();

            techniques.uploadVideo(video, function(videoId){
                $scope.technique.videoUrl = "https://player.vimeo.com/video/" + videoId;
                $scope.$apply();
            });
        };
}]);
