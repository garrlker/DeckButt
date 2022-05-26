import fs from 'fs-extra';
const pathToOrderTracking = new URL('../public/ordertracking.json', import.meta.url).pathname
const pathToOrderHistory = new URL('../public/orderhistory.json', import.meta.url).pathname

async function getOrderTracking() {
  try {
    return await fs.readJson(pathToOrderTracking);
  } catch (err) {
    console.error(err)
  }
}
async function updateOrderTracking(orderTracking) {
  try {
    console.log("Updating ordertracking.json");
    await fs.writeJson(pathToOrderTracking, orderTracking);
    console.log('Success!')
  } catch (err) {
    console.error(err);
  }
}
async function updateOrderHistory(newOrder) {
  try {
    const orderHistory = await fs.readJson(pathToOrderHistory);
    newOrder.timestamp = Date.now();
    orderHistory.orders.push(newOrder);
    console.log("Updating orderhistory.json");
    await fs.writeJson(pathToOrderHistory, orderHistory);
    console.log('Success!')
  } catch (err) {
    console.error(err);
  }
}

// Testing for dev purposes
// async function testFunctions(){
//   console.log("Start");
//   let currentOrderTracking = await getOrderTracking();
//   console.log(currentOrderTracking);
//   await updateOrderTracking(currentOrderTracking);
//   await updateOrderHistory(currentOrderTracking);
// }

// testFunctions();

export {
  getOrderTracking,
  updateOrderTracking,
  updateOrderHistory
}