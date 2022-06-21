import simpleGit from 'simple-git'
import dotenv from 'dotenv'
import createDebug from 'debug'
import { handlePromise } from './shared.js'

dotenv.config()

const debug = createDebug('synctool:git')
const logError = createDebug('synctool:git:error')

const GIT_ENABLED = process.env.ENABLE_GIT === 'true'


async function updateBranch() {
  if (!GIT_ENABLED) {
    debug('GIT DISABLED')
    return
  }

  let git = simpleGit()

  const status = await git.status()
  if (status.current !== 'task-update-ordertracking') {
    logError('Wrong Branch!')
    return
  }
  await git.pull()
  const [_, gitPullError] = await handlePromise(git.pull());

  if(gitPullError){
    logError(gitPullError)
    logError("Retrying git push")
    setTimeout(update, 1000) // Try again in 1 second
    return;
  }

  await git.add('./*')
  await git.commit(
    `Sync up ordertracking file with google sheets on ${Date.now()}`,
  )
  await git.push('origin', 'task-update-ordertracking')
}

export default updateBranch
