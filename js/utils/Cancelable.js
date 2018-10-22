/**
 * @author itck_mth
 * @time 2018/10/22 3:22 PM
 * @class describe
 */

export default function makeCancelable(promise) {
    let hasCanceled = false;

    const wrapperPromise = new Promise((resolve, reject) => {
        promise.then(val => {
            hasCanceled ? reject({isCanceled: true}) : resolve(val);
        })

        promise.catch(error => {
            hasCanceled ? reject({isCanceled: true}) : resolve(error);
        })
    })

    return {
        promise: wrapperPromise,
        cancel() {
            hasCanceled = true;
        }
    }

}