import { atom } from 'nanostores';

export let isSSG = atom(false);
export let isISR = atom(false);

export const runSSG = () =>{
  isSSG.set(true)
  revalidation()
    .finally(() => {
      isSSG.set(false)
    })
}

export const runISR = () =>{
  isISR.set(true)
  revalidation()
    .finally(() => {
      isISR.set(false)
    })
}

export const revalidation = () => {
  console.log("revalidation", new Date())
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 10000)
  })
}
