import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './config/data-source';
import cors from 'cors';
import authRoute  from './routes/auth.route';
import productRoute from './routes/product.route';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';

const app = express();

// cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use(errorHandlerMiddleware);

// inicializacion del servidor y db
const PORT = Number(process.env.PORT);
AppDataSource.initialize()
.then(() => {
  console.log("DataSource initialized successfully");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("Error during DataSource initialization:", err);
});
