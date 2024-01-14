import axios from 'axios';

export default async function handler(req: any, res:any) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const response = await axios.put(`api/users/${id}`, req.body);
      const data = response.data;
      res.status(200).json(data);
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const response = await axios.post('api/users', req.body);
      const data = response.data;
      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await axios.delete(`api/users/${id}`);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
