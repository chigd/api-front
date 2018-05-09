/**
 * Created by hao.cheng on 2017/5/8.
 */
import React from 'react';
import {Row, Col, Card, Button} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import ApiTable from "./ApiTable";
import ApiForm from "./ApiForm";


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'list'
        };
    }

    onDelete = (record, index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({deleteIndex: record.key});
        setTimeout(() => {
            this.setState({dataSource})
        }, 500);
    };
    handleAdd = () => {
        this.setState({
            content: 'add'
        })

    };
    handleList=()=>{
        this.setState({
            content: 'list'
        })
    }

    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="API管理" second="接口详细定义" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                {(() => {
                                        switch (this.state.content) {
                                            case "list":
                                                return <ApiTable  clickCallback={this.handleAdd} />;
                                                break;
                                            case "add":
                                                return <ApiForm clickCallback={this.handleList} />;
                                                break;
                                            default:
                                                return null;
                                        }
                                    }
                                )()}

                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    }
}

export default Index;