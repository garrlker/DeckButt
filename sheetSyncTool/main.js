import deepEql from 'deep-eql'
import createDebug from 'debug'
import {
  getOrderTracking,
  updateOrderHistory,
  updateOrderTracking,
} from './file.js'
import updateBranch from './git.js'
import openSpreadsheetAndProcessData from './sheet.js'
import fetchCurrentOrderTracking from './site.js'

const debug = createDebug('synctool:main')
const logError = createDebug('synctool:main:error')

const waitTime = 120000 // 2 minute polling interval

async function main() {
  // Fetch all sources
  const [thisRepoOrders, thisRepoOrdersError] = await handlePromise(getOrderTracking());
  const [spreadsheetOrders, spreadsheetOrdersError] = await handlePromise(openSpreadsheetAndProcessData());
  const [currentSiteOrders, currentSiteOrdersError] = await handlePromise(fetchCurrentOrderTracking());

  /**
   * If we have an error, die and start over
   *    So far an error has only happened because of random internet issues
   *    This should handle 99% of those issues
   */
   
  if(thisRepoOrdersError || spreadsheetOrdersError || currentSiteOrdersError){
    debug("oof, we had an error somewhere. Restarting to try again")
    return;
  }

  // Compare them
  const siteAndSheetEqual = deepEql(spreadsheetOrders, currentSiteOrders)
  const repoAndSheetEqual = deepEql(spreadsheetOrders, thisRepoOrders)
  // const siteAndRepoEqual = deepEql(thisRepoOrders, currentSiteOrders); // Basically useless

  debug('site and sheet are equal ', siteAndSheetEqual)
  debug('repo and sheet are equal ', repoAndSheetEqual)

  // Everything is good, restart
  if (siteAndSheetEqual && repoAndSheetEqual) {
    debug('Site and Repo are up to date, restarting')
    setTimeout(main, waitTime)
    return
  }

  // We've already put in an MR, waiting for merge so restart
  if (!siteAndSheetEqual && repoAndSheetEqual) {
    debug(
      'Repo is up to date, must be waiting on MR approval, restarting',
    )
    setTimeout(main, waitTime)
    return
  }

  // We are out of date, update the repo and site
  if (!siteAndSheetEqual && !repoAndSheetEqual) {
    debug('Site and Repo are out of date, updating')
    await updateOrderTracking(spreadsheetOrders)
    await updateOrderHistory(spreadsheetOrders)
    await updateBranch()
    debug('Done!')
    setTimeout(main, waitTime)
  }

  // Catch-all
  setTimeout(main, waitTime)
}

// Ty Fireship.io!
async function handlePromise(promise){
  try {
    const data = await promise;
    return [data, undefined];
  }catch (error){
    logError(error);
    return [undefined, error];
  }
}

main()
