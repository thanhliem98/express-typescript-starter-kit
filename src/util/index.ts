import slug from 'slug';

export function Slug(title: string){
    return slug(title, {
        lower: true,
        replacement: '-',
        symbols: false
    });
}