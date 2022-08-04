const logger = require('../services/logger.service.js')

async function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    res.status(401).end('Unauthorized!, Please Login!')
    return
  }
  next()
}

async function requireHost(req, res, next) {
  const user = req.session.user
  if (!user.isHost) {
    logger.warn(user.fullname + ' Attempt to perform host action')
    res.status(403).end('Unauthorized Enough..')
    return
  }
  next()
}


// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin
}
