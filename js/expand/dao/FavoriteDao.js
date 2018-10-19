import React from 'react';
import {
    AsyncStorage
} from 'react-native';

const FLAG_FAVORITE_PREFIX = 'favorite_'
export default class FavoriteDao {

    constructor(flag) {
        this.flag = flag;
        this.favoriteFlag = FLAG_FAVORITE_PREFIX + flag;
    }

    /**
     * 收藏项目
     * @param key
     * @param value
     * @param callback
     */
    saveFavoriteItem(key, value, callback) {
        AsyncStorage.setItem(key, value, (error) => {
            if (!error) {
                this.updateFavoriteKeys(key, true);
            }
        });
    }

    /**
     * 移除收藏
     * @param key
     * @param callback
     */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error) => {
            if (!error) {
                this.updateFavoriteKeys(key, false);
            }
        });
    }

    /**
     * 获取所有的收藏返回一个数组
     */
    getFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteFlag, (error, result) => {
                if (!error) {
                    let favoriteKey = [];
                    if (result) {
                        try {
                            favoriteKey = JSON.parse(result);
                            resolve(favoriteKey);
                        } catch (e) {
                            reject(e);
                        }
                    }else{
                        resolve(favoriteKey);
                    }
                } else {
                    reject(error);
                }




            })
        });


    }

    /**
     * 专门用来取key 不需要取value
     * @param key
     * @param isAdd
     */
    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.favoriteFlag, (error, result) => {
            if (!error) {
                let favoriteKey = [];
                if (result) {
                    favoriteKey = JSON.parse(result);
                }
                let index = favoriteKey.indexOf(key);
                if (isAdd) {
                    if (index === -1) {
                        favoriteKey.push(key);
                    }
                } else {
                    if (index !== -1) { //删除这个key
                        favoriteKey.splice(index, 1);
                    }
                }
                AsyncStorage.setItem(this.favoriteFlag, JSON.stringify(favoriteKey));
            }
        })
    }
}