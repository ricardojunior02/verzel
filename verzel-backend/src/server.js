import 'dotenv/config';
import './database';
import express from 'express';
import cors from 'cors';
import routes from './routes';
const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(process.env.NODE_PORT, () => console.log('Server running'))