import isDev from "./Environment";

const apiUrl: String = isDev() ? 'http://api.local.test' : 'https://api.andres.run'

export default apiUrl;