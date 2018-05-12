import {Button, Form, Input, Layout, Select} from 'antd';
import React from "react";
import ParamTable from "./ParamTable";
import $ from "jquery";

const {Header} = Layout;
const {TextArea} = Input;

const FormItem = Form.Item;
const Option = Select.Option;

const bottomStyle = {
    background: 'rgb(190, 200, 200)',
    padding: '26px 16px 16px',
    textAlign: 'center',
    position: "fixed",
    width: '80%',
    bottom: 0,
    opacity: 0.8,
}

const API = {
    API_FORM_SAVE: "/api/v1/save",
};

class ApiForm extends React.Component {
    handleSubmit = (e, backTable) => {
        e && e.preventDefault();
        this.props.form.setFieldsValue({
            'paramExpl': this.refs['ptable'].getValue(),
            'resultExpl': this.refs['rtable'].getValue(),
        });
        const {validateFieldsAndScroll} = this.props.form;
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            $.ajax({
                url: API.API_FORM_SAVE,
                type: 'post',
                data: JSON.stringify(values),
                contentType: 'application/json',
                success: (res) => {
                    backTable();
                }
            })
        });
    }

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
        const selectBefore = getFieldDecorator('type', {
            initialValue: 'GET',
        })(
            <Select style={{width: 90}}>
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
                <Option value="PUT">PUT</Option>
                <Option value="DELETE">DELETE</Option>
            </Select>
        );
        const data = this.props.data
        return (
            <div>
                <Form onSubmit={e => this.handleSubmit(e, this.props.clickCallback)} style={{textAglin: "center"}} id="apiForm"
                      wrappedComponentRef={(ins) => this.editFormIns = ins}>
                    <FormItem {...formItemLayout} label="接口名称: "> {getFieldDecorator('name', {
                        initialValue:data.name,
                        rules: [{required: true, message: '请输入接口名称!'}],
                    })(<Input/>)}  </FormItem>
                    <FormItem {...formItemLayout} label="URL: "> {getFieldDecorator('url', {
                        rules: [{required: true, message: '请输入接口URL!'}],
                        initialValue:data.url,
                    })(<Input addonBefore={selectBefore}/>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="简要描述: "> {getFieldDecorator('descr',{initialValue:data.descr})(<Input/>)}  </FormItem>
                    <FormItem {...formItemLayout} label="请求参数示例: "> {getFieldDecorator('paramExam',{initialValue:data.paramExam})(<TextArea
                        placeholder="请输入请求参数" autosize={{minRows: 2, maxRows: 20}}/>)}  </FormItem>

                    <ParamTable ref='ptable' data={data.paramExpl}/>
                    <br/>
                    <FormItem {...formItemLayout} label="返回结果示例: "> {getFieldDecorator('resultExam',{initialValue:data.resultExam})(<TextArea
                        placeholder="请输入返回结果" autosize={{minRows: 2, maxRows: 20}}/>)}  </FormItem>

                    <ParamTable ref='rtable' data={data.resultExpl} />
                    <div style={{clear: "both"}}></div>
                    <div style={bottomStyle}>
                        <Button type="primary" ghost style={{marginRight: "20px"}} htmlType="submit">保存</Button>
                        <Button type="danger" ghost style={{marginRight: "20px"}} onClick={this.props.clickCallback}>取消</Button>
                    </div>
                    <FormItem style={{visibility: 'hidden'}}>
                        {getFieldDecorator('paramExpl')(<input/>)}
                    </FormItem>
                    <FormItem style={{visibility: 'hidden'}}>
                        {getFieldDecorator('resultExpl')(<input/>)}
                    </FormItem>
                    <FormItem style={{visibility: 'hidden'}}>
                        {getFieldDecorator('id', {
                            initialValue:data.id
                        })(<input/>)}
                    </FormItem>
                </Form>
            </div>


        )
    }
}


export default Form.create()(ApiForm);