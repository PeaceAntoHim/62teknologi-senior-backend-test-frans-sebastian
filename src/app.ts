import express from "express";
import router from "./routes";
import { BusinessModel } from "./models/BusinessModel";

class App {
  private _app;

  constructor() {
    this._app = express();
    new BusinessModel().initDatabaseConnection();
  }

  public runApp() {
    this._app.use(express.json());
    this._app.use(router);

    const PORT = process.env.PORT || 3000;

    this._app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

new App().runApp();
