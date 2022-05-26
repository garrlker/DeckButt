// var shell = require('shelljs');
import simpleGit from 'simple-git';

// if (!shell.which('git')) {
//   shell.echo('Sorry, this script requires git');
//   shell.exit(1);
// }

const GIT_ENABLED = process.env.ENABLE_GIT === "true";

const git = simpleGit();

async function updateBranch() {
  if (!GIT_ENABLED) {
    console.log("GIT DISABLED");
    return;
  }

  const status = await git.status();
  if(status.current !== "task-update-ordertracking"){
    console.error("Wrong Branch!");
    return;
  }
  await git.pull();
  await git.add('./*');
  await git.commit(`Sync up ordertracking file with google sheets on ${Date.now()}`);
  await git.push('origin', 'taskUpdateOrders');
}

export default updateBranch;
