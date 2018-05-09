import {Button, Form, Input, Layout, Select} from 'antd';
import React from "react";
import ParamTable from "./ParamTable";

const {Header} = Layout;
const {TextArea} = Input;

const FormItem = Form.Item;
const Option = Select.Option;
const selectBefore = (
    <Select defaultValue="Http://" style={{width: 90}}>
        <Option value="Http://">Http</Option>
        <Option value="Https://">Https</Option>
    </Select>
);
const bottomStyle = {
    background: 'rgb(190, 200, 200)',
    padding: '26px 16px 16px',
    textAlign: 'center',
    position: "fixed",
    width:'80%',
    bottom: 0,
    opacity:0.8,
}
const selectTypeBefore = (
    <Select defaultValue="GET" style={{width: 90}}>
        <Option value="GET">GET/</Option>
        <Option value="POST">POST</Option>
        <Option value="PUT">PUT</Option>
        <Option value="DELETE">DELETE</Option>
    </Select>
);

class ApiForm extends React.Component {

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 2},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        return (
            <div>
                <Form onSubmit={this.handleSubmit} style={{textAglin: "center"}} id = "apiForm"
                      wrappedComponentRef={(ins) => this.editFormIns = ins}>
                    <FormItem {...formItemLayout} label="接口名称: "> {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入接口名称!'}],
                    })(<Input/>)}  </FormItem>
                    <FormItem {...formItemLayout} label="URL: "> {getFieldDecorator('url', {
                        rules: [{required: true, message: '请输入接口URL!'}],
                    })(<Input addonBefore={[selectBefore, selectTypeBefore]}/>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="简要描述: "> {getFieldDecorator('desc')(<Input/>)}  </FormItem>
                    <FormItem {...formItemLayout} label="请求参数示例: "> {getFieldDecorator('param')(<TextArea
                        placeholder="请输入请求参数" autosize={{minRows: 2, maxRows: 20}}/>)}  </FormItem>
                    <ParamTable/>
                    <FormItem {...formItemLayout} label="返回结果示例: "> {getFieldDecorator('result')(<TextArea
                        placeholder="请输入返回结果" autosize={{minRows: 2, maxRows: 20}}/>)}  </FormItem>
                    <ParamTable/>
                    <div style={{clear: "both"}}></div>

                <div style={bottomStyle}>
                    <Button type="primary" ghost style={{marginRight:"20px"}} >保存</Button>
                    <Button type="danger" ghost style={{marginRight:"20px"}}  onClick={this.props.clickCallback}>取消</Button>
                </div>
                </Form>
            </div>


        )
    }
}


export default Form.create()(ApiForm);