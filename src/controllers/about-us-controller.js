const technologyService = require('../services/author-service');


module.exports = {
    register: setupThisController
};


function setupThisController(app) {


    app.get('/about', function(req, res) {

        technologyService.getAllTechnologies(function(allTechnologies) {
            let model = {
                technologies: allTechnologies
            };

            res.render('about', model);
        });

    });


    app.post('/about/add-technology', function(req, res) {

        let technologyName = req.body.name;
        let technologyLogoUrl = req.body.logoUrl;

        technologyService.addTechnology(technologyName, technologyLogoUrl, function() {
            // Redirect the user to the URL: /about
            res.redirect('/about');
        })
       
    });


    app.get('/about/delete-technology', function(req, res) {
        
        let technologyIdToDelete = req.query.technologyId;

        technologyService.deleteTechnology(technologyIdToDelete, function() {
            // Redirect the user to the URL: /about
            res.redirect('/about');
        });

    });


}