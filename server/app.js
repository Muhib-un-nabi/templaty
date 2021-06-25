const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
// importing Routes
const userRoutes = require('./routes/userRoutes');
const contactSettingRouter = require('./routes/contactSettingRouter');
const contactRouter = require('./routes/contactRouter');
const placeholdersRouter = require('./routes/placeholdersRouter');
const snippetsRouter = require('./routes/snippetsRouter');
const teamRouter = require('./routes/teamRouter');
const templateRouter = require('./routes/templateRouter');
const typesRouter = require('./routes/typesRouter');
// Start express app
const app = express();

app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
app.use(
  cors({
    'Access-Control-Allow-Origin': '*'
    // origin: 'http://localhost:3001'
  })
);

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
// app.post(
//   '/webhook-checkout',
//   bodyParser.raw({ type: 'application/json' }),
//   bookingController.webhookCheckout
// );
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price'
//     ]
//   })
// );

app.use(compression());
// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});
//  Snippets Routes
app.use('/api/snippets', snippetsRouter);
// // Data sanitization against XSS
app.use(xss());
// 3) ROUTES
app.use('/api/team', teamRouter);
app.use('/api/users', userRoutes);
//  Contact Routes
app.use('/api/contacts/setting', contactSettingRouter);
app.use('/api/contacts/', contactRouter);
//  Placeholders Routes
app.use('/api/placeholders', placeholdersRouter);
//  Template Routes
app.use('/api/templates', templateRouter);
app.use('/api/types', typesRouter);

app.all('/api', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
