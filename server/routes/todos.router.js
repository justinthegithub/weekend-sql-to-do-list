const router = require('express').Router();
const pool = require('../modules/pool');
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM todos');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  router.post('/', async (req, res) => {
    const { text } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO todos (text) VALUES ($1) RETURNING *',
        [text]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });




  
module.exports = router;
