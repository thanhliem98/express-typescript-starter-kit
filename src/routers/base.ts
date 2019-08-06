import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export interface IRequest extends Request {

}

export interface IResponse extends Response {

}

export interface INextFunction extends NextFunction {

}

export interface IErrorRequestHandler extends ErrorRequestHandler {

}

export class BaseRouter {
    router: express.Router
    constructor() {
        this.router = express.Router();
    }

    Router(){

    }

}