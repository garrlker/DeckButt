import fs from 'fs-extra'
import createDebug from 'debug'
const pathToOrderTracking = new URL(
  '../public/ordertracking.json',
  import.meta.url,
).pathname
const pathToOrderHistory = new URL(
  '../public/orderhistory.json',
  import.meta.url,
).pathname

const debug = createDebug('synctool:file')
const logError = createDebug('synctool:file:error')

async function getOrderTracking() {
  try {
    return await fs.readJson(pathToOrderTracking)
  }
  catch (err) {
    logError(err)
  }
}
async function updateOrderTracking(orderTracking) {
  try {
    debug('Updating ordertracking.json')
    await fs.writeJson(pathToOrderTracking, orderTracking)
    debug('Success!')
  }
  catch (err) {
    logError(err)
  }
}
async function updateOrderHistory(newOrder) {
  try {
    const orderHistory = await fs.readJson(pathToOrderHistory)
    newOrder.timestamp = Date.now()
    orderHistory.orders.push(newOrder)
    debug('Updating orderhistory.json')
    await fs.writeJson(pathToOrderHistory, orderHistory)
    debug('Success!')
  }
  catch (err) {
    logError(err)
  }
}

export { getOrderTracking, updateOrderTracking, updateOrderHistory }
