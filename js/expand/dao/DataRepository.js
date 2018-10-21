import React, {Component} from 'react';
import {
    AsyncStorage,
} from 'react-native';
import GitHubTrending from 'GitHubTrending';

export var FLAG_STORAGE = {
    flag_popular: 'popular',
    flag_trending: 'trending',
    flag_my: 'my'
};
export default class DataRepository {

    constructor(flag) {
        this.flag = flag;
        if (flag === FLAG_STORAGE.flag_trending) {
            this.githubTrend = new GitHubTrending();
        }
    }

    fetchRepository(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalRepository(url)
                .then(result => {
                    if (result) {
                        resolve(result);
                    } else {
                        this.fetchNetRepository(url)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(e => {
                                reject(e)
                            })
                    }
                })
                .catch(e => {
                    this.fetchNetRepository(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(e => {
                            reject(e)
                        })
                })
        });
    }

    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }

    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            if (this.flag === FLAG_STORAGE.flag_trending) {
                this.githubTrend.fetchTrending(url)
                    .then(result => {
                        if (!result) {
                            reject(new Error('response is null'));
                            return;
                        }
                        resolve(result)
                        this.saveRepository(url, result);
                    })
                    .catch(error => {
                        reject(error)
                    })
            } else {
                fetch(url)
                    .then(response => response.json())
                    .then(result => {

                        if (this.flag === FLAG_STORAGE.flag_my && result) {
                            resolve(result)
                            this.saveRepository(url, result);
                        } else if (result && result.items) {
                            resolve(result.items)
                            this.saveRepository(url, result.items);
                        }else{
                            reject(new Error('response is null'));
                        }
                    })
                    .catch(error => {
                        reject(error)
                    });
            }

        })
    }

    saveRepository(url, items, callBack) {
        if (!url || !items) return;
        let data;
        if (this.flag === FLAG_STORAGE.flag_my) {
            data = {
                item: items,
                update_date: new Date().getTime()
            }
        } else {
            data = {
                items: items,
                update_date: new Date().getTime()
            }
        }
        AsyncStorage.setItem(url, JSON.stringify(data), callBack);
    }

}