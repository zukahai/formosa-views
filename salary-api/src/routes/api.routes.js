import express from 'express';
import ApiController from '../controllers/api.controller';
class ApiRoutes {
    constructor(app) {
        this.app = app;
        this.router = express.Router();
       
        this.init();
    }
    init() {
        new ApiController(this.router);
        this.app.use('/api', this.router);
    }
}
export default ApiRoutes