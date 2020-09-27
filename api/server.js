import Cors from 'cors'
import initMiddleware from './init-middleware'
// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

module.exports = async (req, res) => {
  await cors(req, res)
  const {
    query: { ip },
  } = req

const Server = require('@fabricio-191/valve-server-query');
const server = new Server({
    ip: ip,
    port: 27015,
    timeout: 2000
});
let info = await server.getInfo()
let player = await server.getPlayers()


  res.status(200).json(JSON.stringfy(info),JSON.stringfy(player))
}