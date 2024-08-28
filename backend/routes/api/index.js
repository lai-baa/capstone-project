// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const notebooksRouter = require('./notebooks.js');
const notesRouter = require('./notes.js')
const tasksRouter = require("./tasks.js")

const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'khj1107'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// // GET /api/restore-user
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/notebooks', notebooksRouter);
router.use('/notes', notesRouter);
router.use("/tasks", tasksRouter);

module.exports = router;