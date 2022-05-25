const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

// Async function to wrap all the async google sheet calls
async function readInfo() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_API_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  });
  await doc.loadInfo(); // loads document properties and worksheets

  if (doc.title !== "Fammy's Steam Deck order tracking") {
    console.error(`Somethings changed: ${doc.title}`);
    return;
  }

  const deckbotSheet = doc.sheetsByTitle['deckbot'];
  const rows = await deckbotSheet.getRows();
  console.table(processRows(rows));
}

// Reduces the rows into a json object the deckbutt site expects
function processRows(rows) {
  // First, fail if the header has changed
  if (rows[0]._sheet.headerValues.length !== 3) {
    console.error(`Somethings fucked`);
    return;
  }

  // First row of data is counted as a header, Manually add it into the array here
  rows.unshift({ _rawData: rows[0]._sheet.headerValues });

  // Convert from array of GoogleSheet object to 3-indice array or [{model}, {region}, {latestReserveTime}]
  const arrOfRows = rows.map(row => {
    return row._rawData;
  });

  // Reduce array into an object mapping {Regions + Model} to the full row
  return arrOfRows.reduce((outputJson, row) => {
    outputJson[row[1] + row[0] + 'GB'] = {
      model: row[0],
      region: row[1],
      reserveTime: row[2]
    }
    return outputJson;
  }, {})
}

const doc = new GoogleSpreadsheet('1ZaKncig9fce7K0sr1f-E2_sgLH1HuKQ-q3k7clPMOCs');
readInfo();