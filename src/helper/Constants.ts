import isDev from "./Environment";

const apiUrl: string = isDev() ? 'http://api.local.test' : 'https://api.andres.run'
const domain: string = isDev() ? '.local.test' : '.andres.run';

export {apiUrl, domain};