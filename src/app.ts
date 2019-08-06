import 'module-alias/register';
import { MONGODB_URI, SESSION_SECRET } from "@app/config/env";
import express from "express";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import session from "express-session";
import bodyParser from "body-parser";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import compression from 'compression';
import lusca from 'lusca';
import routers from '@app/routers';
import hbs from 'hbs';


// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

// Hbs Configuration 
hbs.registerPartials(path.join(__dirname, "../views/partials"));

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.set('view options', { layout: 'layouts/home' });
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    // store: new MongoStore({
    //     url: mongoUrl,
    //     autoReconnect: true
    // })
}));

app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.use('/', routers);
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.log(err.message);
        res.status(500).send('Something broke!')
    }
});

export default app;
