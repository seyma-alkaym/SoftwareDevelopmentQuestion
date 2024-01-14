import axios from "axios";

export default async function handler(req : any, res : any) {
    try {
      const response = await axios.get('api/users');
      const data = response.data;
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }