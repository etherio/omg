const router = require('express').Router();
const { database } = require('firebase-admin');

router.get('/', (req, res) =>
  database().ref('v0/maintenance').get().then((snapshot) => {
    const { mode, from, to, after } = snapshot.val()  ||{};
    const maintainance = {
      mode: Boolean(mode),
      from,
      to,
      after,
    };
    if (after) {
      maintainance.to = parseInt(from) + parseInt(after); 
    }
    res.json(maintainance);
  })
);

router.post('/', (req, res) => {
  let { mode, from, to, after } = req.body;
  mode = Boolean(mode);
  if (mode === 'off') {
    database().ref('v0/maintainace')
      .set({
        mode: false,
      })
      .then(() => res.status(201).json({
        mode: false
      }))
    return
  } 
  from = from || Date.now();
  to = to || after ? (from + after) : null;
  database().ref('v0/maintenance')
    .set({
      mode,
      from,
      to,
    })
    .then(() => res.status(201).json({
      mode,
      until: from ? Date.parse(to) : undefined,
    }))
});


module.exports = router;
