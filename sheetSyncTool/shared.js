// Ty Fireship.io!
export async function handlePromise(promise){
  try {
    const data = await promise;
    return [data, undefined];
  }catch (error){
    return [undefined, error];
  }
}