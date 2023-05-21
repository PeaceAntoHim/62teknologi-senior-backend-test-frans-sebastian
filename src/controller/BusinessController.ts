import { Request, Response } from "express";
import { BusinessModel } from "../models/BusinessModel";
import { Query } from "mysql";

type TBusiness = {
	id?: number;
	name: string;
	location: string;
	latitude: number;
	longitude: number;
	term: string;
	radius: number;
	categories: string[];
	locale: string;
	price: number[];
	open_now: boolean;
	open_at: number;
	attributes: string[];
	sort_by: string[];
};

export class BusinessController {
	private _businessModel: BusinessModel;

	constructor() {
		this._businessModel = new BusinessModel();
	}

	public createBusiness = async (req: Request, res: Response) => {
		try {
			const payload: TBusiness = req.body;

			const query =
				"INSERT INTO businesses (name, location, latitude, longitude, term, radius, categories, locale, price, open_now, open_at, attributes, sort_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

			const values = [
				payload.name,
				payload.location,
				payload.latitude,
				payload.longitude,
				payload.term,
				payload.radius,
				JSON.stringify(payload.categories),
				payload.locale,
				JSON.stringify(payload.price),
				payload.open_now,
				payload.open_at,
				JSON.stringify(payload.attributes),
				payload.sort_by,
			];

			this._businessModel.dbConnection.query(query, values);

			res.status(201).json({ message: "Business created successfully" });
		} catch (error) {
			console.error("Error creating business:", error);
			res.status(500).json({ error: "Failed to create business" });
		}
	};

	public updateBusiness = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const payload: TBusiness = req.body;
			const querySelect = "SELECT * FROM businesses WHERE id = ?";
			// This to query select from database
			this._businessModel.dbConnection.query(
				querySelect,
				[id],
				(err, results) => {
					if (err) {
						console.error("Error searching businesses:", err);
						res.status(500).json({ error: "Failed to search businesses" });
						return;
					}
					if (results.length === 0) {
						res.status(404).json({ error: "Business not found" });
						return;
					}

					const currentData = results[0];
					console.log(results);

					const updatedData: TBusiness = {
						name: payload.name || currentData.name,
						location: payload.location || currentData.location,
						latitude: payload.latitude || currentData.latitude,
						longitude: payload.longitude || currentData.longitude,
						term: payload.term || currentData.term,
						radius: payload.radius || currentData.radius,
						categories:
							JSON.stringify(payload.categories) || currentData.categories,
						locale: payload.locale || currentData.locale,
						price: JSON.stringify(payload.price) || currentData.price,
						open_now: payload.open_now || currentData.open_now,
						open_at: payload.open_at || currentData.open_at,
						attributes:
							JSON.stringify(payload.attributes) || currentData.attributes,
						sort_by: payload.sort_by || currentData.sort_by,
					};

					const queryUpdate = `
					 UPDATE businesses 
					 SET
						name = ?,
						location = ?,
						latitude = ?,
						longitude = ?,
						term = ?,
						radius = ?,
						categories = ?,
						locale = ?,
						price = ?,
						open_now = ?,
						open_at = ?,
						attributes = ?,
						sort_by = ?
					 WHERE id = ?
				  `;

					const values = [
						updatedData.name,
						updatedData.location,
						updatedData.latitude,
						updatedData.longitude,
						updatedData.term,
						updatedData.radius,
						updatedData.categories,
						updatedData.locale,
						updatedData.price,
						updatedData.open_now,
						updatedData.open_at,
						updatedData.attributes,
						updatedData.sort_by,
						id,
					];

					// This to updated data from payload
					this._businessModel.dbConnection.query(queryUpdate, values);

					res.json({ message: "Business updated successfully" });
					return;
				}
			);
		} catch (error) {
			console.error("Error updating business:", error);
			res.status(500).json({ error: "Failed to update business" });
		}
	};

	public deleteBusiness = (req: Request, res: Response) => {
		const { id } = req.params;

		const query = "DELETE FROM businesses WHERE id = ?";
		const values = [id];

		this._businessModel.dbConnection.query(query, values, (err) => {
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
		const values: (string | number)[] = [];

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
		this._businessModel.dbConnection.query(query, values, (err, results) => {
			if (err) {
				console.error("Error searching businesses:", err);
				res.status(500).json({ error: "Failed to search businesses" });
				return;
			}

			res.json({ businesses: results });
		});
	};
}
