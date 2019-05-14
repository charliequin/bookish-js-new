module.exports = {
    register: setupThisController
};


function setupThisController(app) {


    app.get('/', function(req, res) {
        res.render('index');
    });


}