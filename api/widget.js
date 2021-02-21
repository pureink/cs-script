import Cors from "cors";
const fetch = require("node-fetch");
import initMiddleware from "./init-middleware";
var steam = require("steamidconvert")();
const SteamAPI = require('steamapi');
const steamwrap = new SteamAPI(process.env.steamapi);
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);
module.exports = async (req, res) => {
  await cors(req, res);
  const {
    query: {steamid,id5e},
  } = req;
  const newsteamid = steam
    .convertToNewFormat(steam.convertToText(steamid))
    .substring(5, 14);
  const urlsof = `https://sofbg.vercel.app/api/player/${
    "STEAM_1" + steam.convertToText(steamid).substring(7)
  }`;
  const url5e = `https://client.5ewin.com/api/data/player_detail/${id5e}`;
  const urlb5 = `https://api.xiaoheihe.cn/game/csgo/b5/get_player_overview/?account_id=${newsteamid}`;
  const datawm = await fetch(
    "https://api.wmpvp.com/api/v2/csgo/pvpDetailStats",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: '{"steamId64":"76561198863365348","csgoSeasonId":"s3"}',
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);
  const data5e = await fetch(url5e)
    .then((res) => res.json())
    .then((res) => res.data.detail.data);
  const datab5 = await fetch(urlb5)
    .then((res) => res.json())
    .then((res) => res.result.career);
    const datasof = await fetch(urlsof)
    .then((res) => res.json())
    .then((res) => res.playerinfo);
    const datasteam=await steamwrap.getUserSummary(steamid)
  res.status(200).json({ datasteam,data5e, datab5, datawm ,datasof});
};
