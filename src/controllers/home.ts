import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export class HomeController {
    constructor() {

    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.query.type === 'error') throw new Error("error");
            res.render('index');
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    };

}

export const homeController = new HomeController();