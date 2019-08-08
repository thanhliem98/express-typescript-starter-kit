import { BaseRouter, IRequest, IResponse } from "@app/routers/base";
import { Post } from '@app/models';

export default class IndexRouter extends BaseRouter {
    constructor() {
        super();
        this.Router();
    }

    Router() {
        this.router.get('/', this.index);
        this.router.get('/bai-viet/:id', this.getPost);
    }

    index = async (req: IRequest, res: IResponse) => {
        // await Post.create({
        //     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        //     content: 'The goal of this new editor is to make adding rich content to WordPress simple and enjoyable. This whole post is composed of pieces of content—somewhat similar to LEGO bricks—that you can move around and interact with. Move your cursor around and you’ll notice the …',
        //     thumb: 'https://demo.mythemeshop.com/reader/files/2019/06/beverage-bread-cake-1928151-730x375.jpg'
        // });

        res.locals.posts = await Post.find({});
        console.log(res.locals.posts.length);
        res.render('pages/index');
    }

    getPost = async (req: IRequest, res: IResponse) => {
        let post = await Post.findOne({slug: req.params.id});
        console.log(req.params);
        console.log(post);
        res.locals.post = post;
        res.render('pages/detail');
    }


}