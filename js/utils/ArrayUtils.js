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
}