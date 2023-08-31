import express from 'express';
import ApiRoutes from './routes/api.routes'
import IndexRoutes from './routes/index.routes'
import cors from 'cors';
class Server {

  constructor(port) {
    this.app = express();
    this.port = port;
    this.enbleCors();
  }
  init() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }));
    new ApiRoutes(this.app);
    new IndexRoutes(this.app);

  }
  enbleCors() {
    this.app.use(cors());
  }
  start() {
    this.init();
    this.app.listen(this.port, () => {
      console.log('Chạy thành công http://localhost:' + this.port);
    });
  }
}

const server = new Server(3000);
server.start();