const development: boolean = process.env.NODE_ENV !== undefined || process.env.NODE_ENV === 'development';

export default function isDev(): boolean{
    return development;
}