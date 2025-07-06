const express=require('express');
const userRoutes = require('./user.routes')
const captainRoutes = require('./captain.routes')  

const app = express();

app.use('users/',userRoutes)
app.use('captains/',captainRoutes)

export default app;