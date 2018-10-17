/**
 * @author itck_mth
 * @time 2018/10/17 11:11 AM
 * @class describe
 */


export default class ArrayUtils {

    static updateArray(array, item) {
        for (let i = 0; i < array.length; i++) {
            let temp = array[i];
            if (temp === item) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    static clone(from) {
        if (!from) {
            return [];
        }
        let newArray = [];
        for (let i = 0; i < from.length; i++) {
            // newArray.push(from[i])
            newArray[i] = from[i];
        }
        return newArray;
    }

    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2)) {
            return false;
        }
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if(arr1[i]!==arr2[i]){
                return false;
            }
        }
        return true;
    }
}