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

        this.toDataURL = function(input, target, callback) {
            var dataURL;
            var file = input.files[0];
            var reader = new FileReader();

            if(file.size > 300000) {
                callback(false);
                return false;
            }

            reader.onload = function(e) {
                dataURL = e.target.result;

                var img = new Image();

                img.onload = function(){
                    var canvas = document.createElement("canvas");
                    canvas.width = this.width;
                    canvas.height = this.height;

                    canvas
                        .getContext("2d")
                        .drawImage(this, 0, 0, this.width, this.height);

                    if(callback) callback(canvas.toDataURL());
                    document.querySelector(target).src = canvas.toDataURL();
                };
                img.src = dataURL;
            };
            reader.readAsDataURL(file);
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
