import { lstatSync, readdirSync, read } from 'fs';
import { join, dirname } from 'path';
import express from 'express';

// const isDirectory = (source: string) => lstatSync(source).isDirectory()
// const getDirectories = (source: string) =>
//     readdirSync(source).map(name => join(source, name)).filter(isDirectory)

// let directories = getDirectories(join(__dirname, 'views'));

// if (directories.length > 0) {

// }

let routers = express.Router();
let fileViews = readdirSync(join(__dirname, 'views'));

fileViews = fileViews.filter(f => {
    return f.replace('.js.map', '') === f;
});

fileViews.forEach(f => {
    f = f.replace('.js', '');
    let r = require(join(__dirname, 'views', f));
    let route = new r.default();

    if (f === 'index') {
        routers.use(`/`, route.router);
    }
    routers.use(`/${f}`, route.router);
})

export default routers;