import mysql, { Connection, ConnectionConfig } from "mysql";

export class BusinessModel {
  private _mysql;
  private _connection;
  private _dbConfig: ConnectionConfig = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "@Password123",
    database: "mydb",
  };

  constructor() {
    this._mysql = mysql;
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
