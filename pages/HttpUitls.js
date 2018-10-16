/**
 * @author itck_mth
 * @time 2018/10/16 5:28 PM
 * @class describe
 */


export default class HttpUitls {

    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    resolve(JSON.stringify(result));
                })
                .catch(error => {
                    reject(JSON.stringify(error));
                })
        })
    }

    static post(url, param) {
        return new Promise((resolve, reject) => {
            fetch(url,{
                method:'Post',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(param)
            })
                .then(response=>response.json())
                .then(result => {
                    resolve(JSON.stringify(result));
                })
                .catch(error => {
                    reject(JSON.stringify(error));
                })
        })
    }
}