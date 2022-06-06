// Ty Fireship.io!
export async function handlePromise(promise){
  try {
    const data = await promise;
    return [data, undefined];
  }catch (error){
    logError(error);
    return [undefined, error];
  }
}