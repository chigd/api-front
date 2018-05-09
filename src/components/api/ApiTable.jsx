/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Input, Table} from 'antd';
import Button from "antd/es/button/button";
import $ from "jquery";

const Search = Input.Search;

const data = [
    {
        key: 1,
        name: '接口示例1',
        url: 'api/camera/list',
        type: 'GET',
        user: 'user1',
        updatetime: '2018-05-01 13:23:33',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
        key: 2,
        name: '接口示例2',
        url: 'api/camera/list',
        type: 'POST',
        user: 'user2',
        updatetime: '2018-05-01 13:23:33',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    },
    {
        key: 3,
        name: '接口示例13',
        url: 'api/camera/list',
        type: 'GET',
        user: 'user3',
        updatetime: '2018-05-01 13:23:33',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
    },
];

const API = {
    REPORT_EDIT_ENTER: "api/v1/list"
};

export default class ApiTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: '接口名称', dataIndex: 'name', key: 'name'},
                {title: '接口URI', dataIndex: 'url', key: 'url', render: text => <a onClick={this.props.clickCallback}>{text}</a>},
                {title: '请求方式', dataIndex: 'type', key: 'type'},
                {title: '创建者', dataIndex: 'user', key: 'user'},
                {title: '更新时间', dataIndex: 'updatetime', key: 'updatetime'},
                {title: '操作', dataIndex: '', key: 'x', render: () => <Button type="primary" onClick={this.props.clickCallback}>修改</Button>},
            ]
        }
        this.getApiList();
    }

    getApiList = (keyword)=> {
        $.ajax({
            url: API.REPORT_EDIT_ENTER,
            type: 'get',
            data : keyword,
            contentType: 'application/json',
            success: (res) => {
                this.setState({
                    data: res.data
                });
            }
        })
    }

    search = () => {

    }

    render() {
        return (
            <div>
                <Search
                    placeholder="名称/URL"
                    onSearch={value => this.getApiList("keyword="+value)}
                    style={{width: 200, marginRight: '20px'}}
                    enterButton
                />
                <Button className="editable-add-btn mb-s"
                        onClick={this.props.clickCallback}>新增接口</Button>
                <Table
                    columns={this.state.columns}
                    expandedRowRender={record => <p>{record.descr}</p>}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
};
