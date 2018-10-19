/**
 * @author itck_mth
 * @time 2018/10/17 11:11 AM
 * @class describe
 */


export default class Utils {
    /**
     * 检查是否收藏
     * @param item
     * @param items
     * @returns {boolean}
     */
    static checkFavorite(item, items) {
        for (let i = 0; i < items.length; i++) {
            let key = items[i]
            if (item.id.toString() === key) {
                return true;
            }
        }
        return false;
    }
}