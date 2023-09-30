// // server/server.js
// const app = require('./app');
// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// server/server.js
const app = require('./app');
const port = process.env.PORT || 5000;
const protectedRoutes = require('./routes/protected');

app.use('/protected', protectedRoutes); // Include protected routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
