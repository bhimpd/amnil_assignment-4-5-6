
const pool = require('../../postgresdb');

exports.addUsers = async (req, res) => {
    const { name, email } = req.body;
    try {
      const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
      res.status(201).json({ message: "User created successfully", user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

exports.getAllUsers = async(req,res) =>{
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.getSingleUser = async (req,res) =>{
    const { id } = req.params;
    try {
      const query = "SELECT * FROM users WHERE id = $1"; 
      const { rows } = await pool.query(query, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
}

exports.editUser = async(req,res) =>{
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', user: result.rows[0] });
    } catch (error) {
      console.error('Error updating user', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteUser = async (req,res) =>{
    const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error deleting user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}