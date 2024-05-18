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
      console.log("Hello from router.post", req.body)
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('UPDATE todos SET completed = TRUE WHERE id = $1 RETURNING *', [id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.delete('/id', (req, res)=>{
  const {id} = req.params;
  pool.query('DELETE FROM todos WHERE id =$1', [id])
  .then(()=> {
    res.sendStatus(204);
  })
  .catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  });
})





module.exports = router;
