import Cors from "cors";
import initMiddleware from "./init-middleware";
const SourceQuery = require("sourcequery");
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);
module.exports = async (req, res) => {
  await cors(req, res);
  const {
    query: { ip, port },
  } = req;
  const query = new SourceQuery(ip, port || 27015, 1000, true);
  var origininfo = await query.getInfo();
  var player = await query.getPlayers();
  var server = {};
  server.name = origininfo.name;
  server.map = origininfo.map;
  server.players = origininfo.players;
  server.maxplayers = origininfo.maxplayers;
  res.status(200).json({ server, player });
};
