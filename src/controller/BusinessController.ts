import { Request, Response } from "express";
import { BusinessModel } from "../models/BusinessModel";

interface Business {
  id: number;
  name: string;
  address: string;
  category: string;
  rating: number;
}

const businessModel = new BusinessModel();

export class BusinessController {
  public createBusiness = (req: Request, res: Response) => {
    const { name, address, category, rating }: Business = req.body;

    const query =
      "INSERT INTO businesses (name, address, category, rating) VALUES (?, ?, ?, ?)";
    const values = [name, address, category, rating];

    businessModel.dbConnection.query(query, values, (err) => {
      if (err) {
        console.error("Error creating business:", err);
        res.status(500).json({ error: "Failed to create business" });
        return;
      }
      res.status(201).json({ message: "Business created successfully" });
    });
  };

  public updateBusiness = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, address, category, rating }: Business = req.body;

    const query =
      "UPDATE businesses SET name = ?, address = ?, category = ?, rating = ? WHERE id = ?";
    const values = [name, address, category, rating, id];

    businessModel.dbConnection.query(query, values, (err) => {
      if (err) {
        console.error("Error updating business:", err);
        res.status(500).json({ error: "Failed to update business" });
        return;
      }
      res.json({ message: "Business updated successfully" });
    });
  };

  public deleteBusiness = (req: Request, res: Response) => {
    const { id } = req.params;

    const query = "DELETE FROM businesses WHERE id = ?";
    const values = [id];

    businessModel.dbConnection.query(query, values, (err) => {
      if (err) {
        console.error("Error deleting business:", err);
        res.status(500).json({ error: "Failed to delete business" });
        return;
      }
      res.json({ message: "Business deleted successfully" });
    });
  };

  public searchBusiness = (req: Request, res: Response) => {
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

    // Membangun query untuk pencarian bisnis
    let query = "SELECT * FROM businesses WHERE 1 = 1";
    let values: (string | number)[] = [];

    const params = {
      term: { condition: "term = ?", getValue: (value: string) => value },
      location: {
        condition: "location = ?",
        getValue: (value: string) => value,
      },
      latitude: {
        condition: "latitude = ?",
        getValue: (value: string) => parseFloat(value),
      },
      longitude: {
        condition: "longitude = ?",
        getValue: (value: string) => parseFloat(value),
      },
      radius: {
        condition: "radius = ?",
        getValue: (value: string) => parseInt(value),
      },
      categories: {
        condition: "",
        getValue: (value: string) => value.split(","),
      },
      locale: { condition: "locale = ?", getValue: (value: string) => value },
      limit: {
        condition: "LIMIT ?",
        getValue: (value: string) => parseInt(value),
      },
      offset: {
        condition: "OFFSET ?",
        getValue: (value: string) => parseInt(value),
      },
      sort_by: { condition: "", getValue: (value: string) => value },
      price: {
        condition: "",
        getValue: (value: string) =>
          value.split(",").map((p: string) => parseInt(p)),
      },
      open_now: {
        condition: "open_now = true",
        getValue: (value: string) => null,
      },
      open_at: {
        condition: "open_at = ?",
        getValue: (value: string) => parseInt(value),
      },
      attributes: {
        condition: "",
        getValue: (value: string) => value.split(","),
      },
    };

    // Membangun kondisi query berdasarkan parameter yang diberikan
    Object.entries(params).forEach(([param, { condition, getValue }]) => {
      const paramValue = req.query[param];
      if (paramValue) {
        if (condition) {
          query += ` AND ${condition}`;
        }
        const value = getValue(paramValue as string);
        if (value) {
          if (Array.isArray(value)) {
            query += ` (${value.map(() => "?").join(", ")})`;
            values.push(...value);
          } else {
            query += " ?";
            values.push(value);
          }
        }
      }
    });

    // Eksekusi query
    businessModel.dbConnection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error searching businesses:", err);
        res.status(500).json({ error: "Failed to search businesses" });
        return;
      }

      res.json({ businesses: results });
    });
  };
}
