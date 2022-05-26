/* eslint-disable no-undef */
import { GoogleSpreadsheet } from 'google-spreadsheet'

const prodSheet = '1ZaKncig9fce7K0sr1f-E2_sgLH1HuKQ-q3k7clPMOCs'
// const devSheet = '1BPnjdhNXmHY1591IwtghncuSRdVmzbc3vBV3DGs7fc4'

export default async function openSpreadsheetAndProcessData() {
  // Authenticate and load google sheet
  const doc = new GoogleSpreadsheet(prodSheet)
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_API_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  })
  await doc.loadInfo()

  // Open the correct sheet, get it's rows, process the data
  const deckbotSheet = doc.sheetsByTitle.deckbot
  const rows = await deckbotSheet.getRows()

  return processRows(rows)
}

// Reduces the rows into a json object the deckbutt site expects
function processRows(rows) {
  // First row of data is counted as a header, Manually add it into the array here
  rows.unshift({ _rawData: rows[0]._sheet.headerValues })

  // Convert from array of GoogleSheet object to 3-indice array or [{model}, {region}, {latestReserveTime}]
  const arrOfRows = rows.map((row) => {
    return row._rawData
  })

  // Reduce array into an object mapping {Regions + Model} to the full row
  return arrOfRows.reduce((outputJson, row) => {
    outputJson[`${row[1] + row[0]}GB`] = {
      model: row[0],
      region: row[1],
      reserveTime: row[2],
    }
    return outputJson
  }, {})
}
