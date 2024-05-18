const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  pool.query('SELECT * FROM todos')
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const { text } = req.body;
  pool.query('INSERT INTO todos (text) VALUES ($1) RETURNING *', [text])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  console.log(`PUT request received for todo ID: ${id} with body:`, req.body);
  pool.query('UPDATE todos SET "isComplete" = TRUE WHERE id = $1 RETURNING *', [id])
    .then((result) => {
      if (result.rows.length === 0) {
        console.log(`Todo ID ${id} not found.`);
        res.status(404).send('Todo not found');
      } else {
        console.log(`Todo ID ${id} marked as complete.`);
        res.send(result.rows[0]);
      }
    })
    .catch((err) => {
      console.log('PUT /todos/:id error:', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM todos WHERE id = $1', [id])
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
