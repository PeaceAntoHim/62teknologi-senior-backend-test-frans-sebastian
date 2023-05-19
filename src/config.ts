import * as dotenv from "dotenv";
import { ConnectionConfig } from "mysql";

export class Config {
	constructor() {
		dotenv.config();
	}
	public initConfigDb(): ConnectionConfig {
		return {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			port: process.env.DB_PORT as unknown as number,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
		};
	}
}
