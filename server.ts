import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

interface Business {
  id: number;
  name: string;
  location: string;
  category: string;
}

// Konfigurasi koneksi database
const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

const app = express();
app.use(bodyParser.json());

// Endpoint untuk menambahkan data ke database
app.post('/business', (req: Request, res: Response) => {
  const { name, location, category } = req.body;

  const query = 'INSERT INTO businesses (name, location, category) VALUES (?, ?, ?)';
  connection.query(query, [name, location, category], (error) => {
    if (error) {
      console.error('Error adding data:', error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.status(201).json({ message: 'Data added successfully' });
    }
  });
});

// Endpoint untuk mengedit data di database
app.put('/business/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, location, category } = req.body;

  const query = 'UPDATE businesses SET name = ?, location = ?, category = ? WHERE id = ?';
  connection.query(query, [name, location, category, id], (error) => {
    if (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json({ message: 'Data updated successfully' });
    }
  });
});

// Endpoint untuk menghapus data dari database
app.delete('/business/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const query = 'DELETE FROM businesses WHERE id = ?';
  connection.query(query, [id], (error) => {
    if (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json({ message: 'Data deleted successfully' });
    }
  });
});

// Endpoint untuk mengambil data dari database
app.get('/business/search', (req: Request, res: Response) => {
  const { term, location, latitude, longitude, radius, categories, locale, limit, offset, sort_by, price, open_now, open_at, attributes } = req.query;

  const query = 'SELECT * FROM businesses WHERE name LIKE ? AND location LIKE ? AND category LIKE ?';
  const values = [term ? `%${term}%` : '%', location ? `%${location}%` : '%', categories ? `%${categories}%` : '%'];
  connection.query(query, values, (error, results: Business[]) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json({ businesses: results });
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});