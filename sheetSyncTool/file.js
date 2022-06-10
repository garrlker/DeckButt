import fs from 'fs-extra'
import createDebug from 'debug'
import { handlePromise } from './shared.js'


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
  const [orderTrackingJson, err] = await handlePromise(fs.readJson(pathToOrderTracking));

  if(err)
    throw err;

  return orderTrackingJson;
}

async function updateOrderTracking(orderTracking) {
  debug('Updating ordertracking.json')
  const [_, err] = await handlePromise(fs.writeJson(pathToOrderTracking, orderTracking));

  if(err)
    throw err;

  debug('Success!')
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
