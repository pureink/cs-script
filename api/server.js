import Cors from 'cors'
import initMiddleware from './init-middleware'
const Server = require('@fabricio-191/valve-server-query');
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
const server = new Server({
    ip: ip,
    port: 27015,
    timeout: 2000
});
let info=await server.getInfo()
.then(info=> console.log(info))
.catch(console.error)
 
let player=await server.getPlayers()
.then(players => {
  console.log(players)
})
.catch(console.error)
  res.status(200).json({info,player})
}