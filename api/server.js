import Cors from 'cors'
import initMiddleware from './init-middleware'
const SourceQuery = require('sourcequery');
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
		const query=new SourceQuery(ip,27015,1000,true)
		query.getInfo().then(info =>data.push(info))
    query.getPlayers().then(players => data.push(players))
    query.close()
  res.status(200).json(data)
}