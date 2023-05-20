import mysql, { Connection, ConnectionConfig } from "mysql";
import { Config } from "../Config";

export class BusinessModel {
	private _mysql;
	private _connection;
	private _dbConfig: ConnectionConfig;

	constructor() {
		this._mysql = mysql;
		const config = new Config();
		this._dbConfig = config.initConfigDb();
		this._connection = this._mysql.createConnection(this._dbConfig);
	}

	get dbConnection() {
		return this._connection;
	}

	public initDatabaseConnection() {
		this._connection.connect((err) => {
			if (err) {
				console.error("Error connecting to database:", err);
				return;
			}
			console.log("Connected to database");
		});
	}
}
