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
    }]);
