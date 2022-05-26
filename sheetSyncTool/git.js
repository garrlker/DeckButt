import simpleGit from 'simple-git';
import dotenv from "dotenv";
dotenv.config();

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
  await git.push('origin', 'task-update-ordertracking');
}

export default updateBranch;
