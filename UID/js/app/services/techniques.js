angular.module('ninjaApp')
    .service('techniques', ['$http', '$state', 'API_URL', function ($http, $state, API_URL) {
        this.addTechnique = function(newTechniqueObject){
            return $http.post(API_URL + '/technique', newTechniqueObject);
        };
        this.updateTechnique = function(techniqueObject){
            return $http.put(API_URL + '/technique', techniqueObject);
        };
        this.removeTechnique = function(techniqueObject){
            return $http.delete(API_URL + '/technique?id=' + techniqueObject._id);
        };
        this.uploadVideo = function(video, callback){
             updateProgress(0);

             var uploader = new MediaUploader({
                 file: video.files[0],
                 token: '09c88211df6bc5b18277d567f47c8f15',
                 upgrade_to_1080: false,
                 videoData: {
                    name: video.name,
                    description: video.description
                 },
                 onError: function(data) {
                    var errorResponse = JSON.parse(data);
                    message = errorResponse.error;
                 },
                 onProgress: function(data) {
                    updateProgress(data.loaded / data.total);
                 },
                 onComplete: function(videoId) {
                     callback(videoId);
                 }
             });
             uploader.upload();
           }

           // Update progress bar.
           function updateProgress(progress) {
              progress = Math.floor(progress * 100);
              var element = document.getElementById('progress');
              element.setAttribute('style', 'width:'+progress+'%');
              element.innerHTML = progress+'%';
           }

    }]);
