import { Request, Response } from "express";
import Business from "../model/business";

export class BusinessController {
  public createBusiness = async (req: Request, res: Response) => {
    try {
      const { name, address } = req.body;
      const business = await Business.create({ name, address });

      return res.status(201).json({ business });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public updateBusiness = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, address } = req.body;
      const [updatedRowsCount, updatedRows] = await Business.update(
        { name, address },
        { where: { id }, returning: true }
      );

      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: "Business not found" });
      }

      return res.json({ business: updatedRows[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public deleteBusiness = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedRowsCount = await Business.destroy({ where: { id } });

      if (deletedRowsCount === 0) {
        return res.status(404).json({ message: "Business not found" });
      }

      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public searchBusiness = async (req: Request, res: Response) => {
    try {
      // Dapatkan parameter dari query string
      const {
        term,
        location,
        latitude,
        longitude,
        radius,
        categories,
        locale,
        limit,
        offset,
        sort_by,
        price,
        open_now,
        open_at,
        attributes,
      } = req.query;

      // Lakukan pencarian data sesuai parameter yang diberikan

      // Contoh sederhana: Ambil semua data bisnis
      const businesses = await Business.findAll();

      return res.json({ businesses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
