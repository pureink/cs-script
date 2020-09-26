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
  let data=[]
  const server = new Server({
    ip: ip,
    port: 27015,
    timeout: 2000
});
 
server.on('ready', () => {
    //emitted when the server is ready, and you can start doing queries 
    console.log('I am ready!')
})
 
//if you do a query before the server is ready, it will be delayed until it is ready
//the maximum time for the server to be ready is the "timeout" you set, multiplied by 1.333 (a 33% more)
 
server.getInfo()
.then(info => {
    data.push(info)

})
.catch(console.error)
 
server.getPlayers()
.then(players => {
    data.push(players)
})
.catch(console.error)
 

  res.status(200).json(data)
}