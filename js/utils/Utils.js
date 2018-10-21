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
            if (item.toString() === key) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检查项目更新时间
     * @param longTime
     * @returns {boolean} true 不需要更新
     */
    static checkDate(longTime) {
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDay() !== tDate.getDay()) return false;
        if (cDate.getHours() - tDate.getHours() > 4) return false;
        return true;
    }
}