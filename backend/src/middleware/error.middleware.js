export default function errorHandler(err, req, res, next) {
  // Log the full error on the server for debugging
  console.error(err);
  // Use the provided status or default to 500 (server error)
  const status = err.status || 500;
  res.status(status).json({
    error: {
      // Send an error message to the client
      message: err.message || 'Internal Server Error',

      // Only show detailed stack traces in development mode.
      // Stack details are hidden for security.
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
}