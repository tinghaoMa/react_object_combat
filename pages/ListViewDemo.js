/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'

var data = {
    "result": [
        {
            "email": "f.twws@wbpmsup.bd",
            "fullName": "John"
        },
        {
            "email": "k.pferjl@nve.bs",
            "fullName": "Richard"
        },
        {
            "email": "w.nxwuq@brkolfp.mt",
            "fullName": "Karen"
        },
        {
            "email": "l.grzyoxc@wffxhuvlf.eh",
            "fullName": "George"
        },
        {
            "email": "k.fjdqqcqw@seludn.cl",
            "fullName": "Michael"
        },
        {
            "email": "f.xqdeo@uonaiow.net",
            "fullName": "Deborah"
        },
        {
            "email": "y.ujcrlx@xzicuc.cu",
            "fullName": "Anthony"
        },
        {
            "email": "u.lywbsb@qji.dm",
            "fullName": "Jose"
        },
        {
            "email": "d.lyveoqjdm@yxit.cr",
            "fullName": "David"
        },
        {
            "email": "b.ileyyw@uvon.jo",
            "fullName": "Patricia"
        },
        {
            "email": "g.pmkli@cdu.ug",
            "fullName": "Patricia"
        },
        {
            "email": "s.juunb@luttmny.gov",
            "fullName": "Helen"
        },
        {
            "email": "r.kwvppux@utnzqdorlx.vg",
            "fullName": "John"
        },
        {
            "email": "v.wotnnux@pqho.pt",
            "fullName": "Susan"
        },
        {
            "email": "c.jbylgbnej@errhlr.do",
            "fullName": "Susan"
        }
    ],
    "statusCode": 0
};

export default class ListViewDemo extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(
                data.result
            ),
            isLoading: true,
        };
        this._onRefresh();
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this._renderRow(rowData)}

                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
                        this._renderSeparator(sectionID, rowID, adjacentRowHighlighted)}

                    renderFooter={() => this._renderFooter()}

                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this._onRefresh();
                            }}
                        />
                    }
                />
                <Toast ref={toast => {
                    this.toast = toast
                }}></Toast>
            </View>
        );
    }

    _onRefresh() {
        setTimeout(() => {
            this.setState({
                isLoading:false,
            });
        }, 2000)
    }

    _renderRow(rowData) {
        return <TouchableOpacity
            onPress={() => {
                this.toast.show(`你单击了${rowData.fullName}`, DURATION.LENGTH_SHORT)
            }}
        >

            <View style={styles.row}>
                <Text
                    style={styles.text}>
                    {rowData.email + '----' + rowData.fullName}
                </Text>
            </View>
        </TouchableOpacity>
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}>
        </View>
    }

    /**
     * 网络图片必须指定宽和高才能显示图片 本地图片不需要指定
     * @returns {*}
     * @private
     */
    _renderFooter() {
        return <Image
            style={{width: 400, height: 200}}
            source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
        ></Image>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    row: {
        backgroundColor: 'red',
        height: 50,

    },
    line: {
        height: 1,
        backgroundColor: 'blue'
    }
});
