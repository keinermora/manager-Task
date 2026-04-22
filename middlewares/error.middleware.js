const erroresMiddleware = (err, req, res, next) => {
  res.status(500).json({ error: "Error del servidor" });
}

module.exports = erroresMiddleware;