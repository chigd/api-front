import {Button, Input, Popconfirm, Table} from 'antd';
import React from "react";

// const columns = [{
//     title: '参数名称',
//     dataIndex: 'param_name',
//     render: text => <a href="javascript:;">{text}</a>,
// }, {
//     title: '是否必须',
//     dataIndex: 'param_require',
// }, {
//     title: '类型',
//     dataIndex: 'param_type',
// }, {
//     title: '描述',
//     dataIndex: 'param_desc',
// }];

const data = [{
    param_name: '参数1',
    param_require: 1,
    param_type: 'int',
    param_desc: '描述1',
    key: 1,
}];
//
// for (let i = 0; i < 100; i++) {
//     data.push({
//         key: i.toString(),
//         name: `Edrward ${i}`,
//         age: 32,
//         address: `London Park no. ${i}`,
//     });
// }

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

export default class ParamTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '参数名称',
            dataIndex: 'param_name',
            render: (text, record) => this.renderColumns(text, record, 'param_name'),
        }, {
            title: '是否必须',
            dataIndex: 'param_require',
            render: (text, record) => this.renderColumns(text, record, 'param_require'),
        }, {
            title: '类型',
            dataIndex: 'param_type',
            render: (text, record) => this.renderColumns(text, record, 'param_type'),
        }, {
            title: '描述',
            dataIndex: 'param_desc',
            render: (text, record) => this.renderColumns(text, record, 'param_desc'),
        },, {
            title: <span><span style={{marginRight: 10 }}>操作</span><Button type="primary" icon="plus" onClick={this.add} /></span>,
            dataIndex: 'operation',
            render: (text, record) => {
                const { editable } = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                  <a onClick={() => this.save(record.key)}>Save</a>
                                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                    <a>Cancel</a>
                                  </Popconfirm>
                                </span>:<a onClick={() => this.edit(record.key)}>Edit</a>
                        }
                    </div>
                );
            },
        }];
        this.state = { data };
        this.cacheData = data.map(item => ({ ...item }));
    }
    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }
    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }
    edit(key) {
        const newData = [...this.state.data];
        console.log("key "+ newData[0].key)
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }
    add=()=> {
        const {count, data} = this.state;
        const newData = {
            key: data.length+1,
        };
        this.setState({
            data: [...data, newData],
            count: count + 1,
        });
    }
    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }
    }
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }
    render() {
        return <Table  bordered dataSource={this.state.data} columns={this.columns} title={() => '参数说明'} />;
    }
}


