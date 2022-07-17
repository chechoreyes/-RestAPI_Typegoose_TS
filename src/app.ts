import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import info from './info.json';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import xXssProtection from 'x-xss-protection';

//Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(xXssProtection());
app.use(helmet());

app.use((req, res, next) => {
    // Dominio que tengan acceso (ej. 'http://example.com')
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Métodos de solicitud que deseas permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Headers permitidos (ej. 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
});

// Initial Setup

// Info Origin
app.get('/', (req, res) => {
    res.json({
        name: app.get('info').name,
        author: app.get('info').author,
        description: app.get('info').description,
        version: app.get('info').version,
    });
});

// Use Routes

export default app;
