import express, { Request, Response, NextFunction } from 'express';
import v1Routes from './routes/index';
import config from './config';
import LoggerMiddleWare from './middlewares/logger';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerSpec from './docs/swagger';
const app = express();
let PORT = config.port;
app.use(express.json());
app.use(cors());
// openapi docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// logger middleware
app.use(LoggerMiddleWare.loggerMiddleware)
// v1 Routes 
app.use('/api/v1', v1Routes)


// root route 
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Server running successfully' });
})

// global error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
// 404 route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

