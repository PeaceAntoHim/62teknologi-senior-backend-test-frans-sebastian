import * as dotenv from "dotenv";
import { ConnectionConfig } from "mysql";

export class Config {
	constructor() {
		dotenv.config();
	}

	public initConfigDb(): ConnectionConfig {
		return {
			host: process.env.DB_HOST, // eslint-disable-line
			user: process.env.DB_USER, // eslint-disable-line
			port: process.env.DB_PORT as unknown as number, // eslint-disable-line
			password: process.env.DB_PASSWORD, // eslint-disable-line
			database: process.env.DB_DATABASE, // eslint-disable-line
		};
	}
}
