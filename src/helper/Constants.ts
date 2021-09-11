import isDev from "./Environment";

const apiUrl: string = isDev()
	? "http://api.local.test"
	: "https://api.andresmarpz.com";
const domain: string = isDev() ? ".local.test" : ".andresmarpz.com";

export { apiUrl, domain };
