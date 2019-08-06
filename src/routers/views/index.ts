import { BaseRouter, IRequest, IResponse } from "@app/routers/base";

export default class IndexRouter extends BaseRouter {
    constructor() {
        super();
        this.Router();
    }

    Router() {
        this.router.get('/', this.index);
    }
    index = async (req: IRequest, res: IResponse) => {
        res.render('pages/index');
    }


}