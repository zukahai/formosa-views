import express from 'express';
class IndexRoutes {
    constructor(app) {
        this.app = app;
        this.router = express.Router();
       
        this.init();
    }
    init() {
        this.router.get('/', (req, res) => {
            res.send('Hello World!');
        })
        this.app.use('/', this.router);
    }
}
export default IndexRoutes