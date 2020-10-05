import Cors from 'cors'
import initMiddleware from './init-middleware'
const SourceQuery = require('sourcequery');
function utfconvert(string){
  var buf = Buffer.from(string,'latin1');
  return buf.toString('utf8')
}
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
    const query=new SourceQuery(ip,27015,1000,true)
    var queryinfo = await query.getInfo();
    var player =await query.getPlayers()
    for(let i=0;i<player.length;i++){
    	player[i].name=utfconvert(player[i].name)
    }
  res.status(200).json({queryinfo,player})
}