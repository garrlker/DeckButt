import {
  getOrderTracking,
  updateOrderTracking,
  updateOrderHistory,
} from "./file.js";
import updateBranch from "./git.js";
import openSpreadsheetAndProcessData from "./sheet.js";
import fetchCurrentOrderTracking from "./site.js";
import dotenv from "dotenv";
import deepEql from "deep-eql";

dotenv.config();

const waitTime = 120000; // 2 Minutes

async function main() {
  // Fetch all sources
  let thisRepoOrders = await getOrderTracking();
  let spreadsheetOrders = await openSpreadsheetAndProcessData();
  let currentSiteOrders = await fetchCurrentOrderTracking();

  // Compare them
  const siteAndSheetEqual = deepEql(spreadsheetOrders, currentSiteOrders);
  const repoAndSheetEqual = deepEql(spreadsheetOrders, thisRepoOrders);
  // const siteAndRepoEqual = deepEql(thisRepoOrders, currentSiteOrders); // Basically useless

  console.log("site and sheet are equal ", siteAndSheetEqual);
  console.log("repo and sheet are equal ", repoAndSheetEqual);

  // Everything is good, restart
  if (siteAndSheetEqual && repoAndSheetEqual) {
    console.log("Site and Repo are up to date, restarting");
    setTimeout(main, waitTime);
    return;
  }

  // We've already put in an MR, waiting for merge so restart
  if (!siteAndSheetEqual && repoAndSheetEqual){
    console.log("Repo is up to date, must be waiting on MR approval, restarting");
    setTimeout(main, waitTime);
    return;
  }

  // We are out of date, update the repo and site
  if (!siteAndSheetEqual && !repoAndSheetEqual) {
    console.log("Site and Repo are out of date, updating")
    await updateOrderTracking(spreadsheetOrders);
    await updateOrderHistory(spreadsheetOrders);
    await updateBranch();
    console.log("Done!");
    setTimeout(main, waitTime);
  }
}
main();
