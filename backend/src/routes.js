const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SeachController = require('./controllers/SeachController');

const routes = Router();


// Tipos de parametros:
// Query params: request.query
// Route params: request.params 
// Body: request.body 

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.post("/devs/update", DevController.update);
routes.post("/devs/update", DevController.update);
routes.post("/devs/delete", DevController.delete);

routes.get("/search", SeachController.index);

module.exports = routes;