var mongoose = require('mongoose');
var ctrl = require('../controllers');

module.exports = function(router){
    router.route('/login')
        .post(ctrl.loginUser);

    router.route('/user')
        .post(ctrl.addUser)
        .put(ctrl.updateUser);

    router.route('/technique')
        .post(ctrl.addTechnique)
        .put(ctrl.updateTechnique)
        .delete(ctrl.removeTechnique);

    return router;
}
