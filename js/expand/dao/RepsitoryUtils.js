import {
    AsyncStorage,
} from 'react-native'

import DataRepository, {FLAG_STORAGE} from './DataRepository';
import Utils from '../../../js/utils/Utils';

var itemMap = new Map();
export default class RepositoryUtils {

    constructor(aboutCommon) {
        this.aboutCommon = aboutCommon;
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_my);
    }

    /**
     * 更新数据
     * @param k
     * @param v
     */
    update(k, v) {
        itemMap.set(k, v);
        var arr = [];
        for (let item of itemMap.values()) {
            arr.push(item);
        }
        this.aboutCommon.onNotifyDataChanged(arr);
    }

    /**
     * 获取指定url下的数据
     * @param url
     */
    fetchRepository(url) {
        this.dataRepository.fetchRepository(url)
            .then(result => {
                if (result) {
                    this.update(url, result);
                    if (!Utils.checkDate(result.update_date)) {
                        return this.dataRepository.fetchNetRepository(url);
                    }
                }
            })
            .then((item) => {
                if (item) {
                    this.update(url, item);
                }
            })
            .catch(e => {
                console.log('error baby');
            })
    }

    /**
     * 批量获取url对应的数据
     * @param url
     */
    fetchRepositories(urls) {
        if (urls) {
            for (let i = 0; i < urls.length; i++) {
                this.fetchRepository(urls[i]);
            }
        }
    }
}