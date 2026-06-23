export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const symbols = [
      "BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","XRPUSDT",
      "ADAUSDT","AVAXUSDT","LINKUSDT","DOTUSDT","UNIUSDT",
      "NEARUSDT","LTCUSDT","APTUSDT","ARBUSDT","OPUSDT",
      "RENDERUSDT","INJUSDT","SUIUSDT","ICPUSDT","FETUSDT",
      "PEPEUSDT","DOGEUSDT","SHIBUSDT"
    ];
    const url = "https://api.binance.com/api/v3/ticker/price?symbols=["
      + symbols.map(s=>`"${s}"`).join(",") + "]";
    const r = await fetch(url);
    const data = await r.json();
    const prices = {};
    data.forEach(d => {
      prices[d.symbol.replace("USDT","")] = parseFloat(d.price);
    });
    res.json({ ok: true, prices });
  } catch(e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
