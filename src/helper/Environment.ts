const development: boolean = process.env.NODE_ENV === 'development';

export default function isDev(): boolean{
    return development;
}