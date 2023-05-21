import { Request, Response } from "express";
import { BusinessModel } from "../models/BusinessModel";

type TBusiness = {
	id?: number;
	name: string;
	location: string;
	latitude: number;
	longitude: number;
	term: string;
	radius: number;
	categories: string;
	locale: string;
	price: number;
	open_now: boolean;
	open_at: number;
	attributes: string;
	sort_by: string;
};

// eslint-disable-next-line no-unused-vars
enum STATUS {
	// eslint-disable-next-line no-unused-vars
	OK = "OK",
	// eslint-disable-next-line no-unused-vars
	NOT_OK = "NOT_OK",
	// eslint-disable-next-line no-unused-vars
	NOT_FOUND = "NOT_FOUND",
}

export class BusinessController {
	private _businessModel: BusinessModel;

	constructor() {
		this._businessModel = new BusinessModel();
	}

	public createBusiness = async (req: Request, res: Response) => {
		try {
			const payload: TBusiness = req.body;

			const query = `INSERT INTO businesses 
			(name, location, latitude, longitude, term, radius, categories, locale, price, open_now, open_at, 
				attributes, sort_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

			const values = [
				payload.name,
				payload.location,
				payload.latitude,
				payload.longitude,
				payload.term,
				payload.radius,
				payload.categories,
				payload.locale,
				payload.price,
				payload.open_now,
				payload.open_at,
				payload.attributes,
				payload.sort_by,
			];

			this._businessModel.dbConnection.query(query, values);

			res.status(201).json({
				status: STATUS.OK,
				message: "Business created successfully",
			});
			return;
		} catch (error) {
			console.error("Error creating business:", error);
			res
				.status(500)
				.json({ status: STATUS.NOT_OK, error: "Failed to create business" });
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
						res.status(500).json({
							status: STATUS.NOT_OK,
							error: "Failed to search businesses",
						});
						return;
					} else if (results.length === 0) {
						res
							.status(404)
							.json({ status: STATUS.NOT_FOUND, error: "Business not found" });
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
						categories: payload.categories || currentData.categories,
						locale: payload.locale || currentData.locale,
						price: payload.price || currentData.price,
						open_now: payload.open_now || currentData.open_now,
						open_at: payload.open_at || currentData.open_at,
						attributes: payload.attributes || currentData.attributes,
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

					res.status(200).json({
						status: STATUS.OK,
						message: "Business updated successfully",
					});
				}
			);
		} catch (error) {
			console.error("Error updating business:", error);
			res.status(500).json({ error: "Failed to update business" });
		}
	};

	public deleteBusiness = (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const query = "DELETE FROM businesses WHERE id = ?";
			const values = [id];

			this._businessModel.dbConnection.query(query, values, (err, results) => {
				if (err) {
					console.error("Error deleting business:", err);
					res.status(500).json({ error: "Failed to delete business" });
					return;
				} else if (results.affectedRows === 0) {
					res
						.status(404)
						.json({ status: STATUS.NOT_FOUND, message: "Business not found" });
					return;
				}
				res.status(200).json({
					status: STATUS.OK,
					message: "Business deleted successfully",
				});
			});
		} catch (error) {
			console.error("Error delete business:", error);
			res
				.status(500)
				.json({ status: STATUS.NOT_OK, error: "Failed to delete business" });
		}
	};

	public searchBusiness = (req: Request, res: Response) => {
		try {
			//Build query to search business
			let query = "SELECT * FROM businesses WHERE 1 = 1";
			const values: (string | number)[] = [];

			const params = {
				term: { condition: "term = ", getValue: (value: string) => value },
				location: {
					condition: "location = ",
					getValue: (value: string) => value,
				},
				latitude: {
					condition: "latitude = ",
					getValue: (value: string) => value,
				},
				longitude: {
					condition: "longitude = ",
					getValue: (value: string) => value,
				},
				radius: {
					condition: "radius = ",
					getValue: (value: string) => parseInt(value),
				},
				categories: {
					condition: "categories = ",
					getValue: (value: string) => value,
				},
				locale: { condition: "locale = ", getValue: (value: string) => value },
				sort_by: {
					condition: "sort_by = ",
					getValue: (value: string) => value,
				},
				price: {
					condition: "price = ",
					getValue: (value: string) => value,
				},
				open_now: {
					condition: "open_now = ",
					getValue: (value: string) => value,
				},
				open_at: {
					condition: "open_at = ",
					getValue: (value: string) => parseInt(value),
				},
				attributes: {
					condition: "attributes = ",
					getValue: (value: string) => value.split(","),
				},
			};

			// Create condation query with parameter will get from params api get
			Object.entries(params).forEach(([param, { condition, getValue }]) => {
				const paramValue = req.query[param];
				if (paramValue !== undefined && paramValue !== null) {
					if (condition) {
						query += ` AND ${condition}`;
					}
					const value = getValue(paramValue.toString());
					if (value !== undefined && value !== null) {
						query += ` ?`;
						values.push(value as string);
					}
				}
			});

			// Execute query
			this._businessModel.dbConnection.query(query, values, (err, results) => {
				if (err) {
					console.error("Error searching businesses:", err);
					res.status(500).json({ error: "Failed to search businesses" });
					return;
				}

				res.json({ businesses: results });
			});
		} catch (error) {
			console.error("Error get business:", error);
			res.status(500).json({ error: "Failed to get business" });
		}
	};
}
