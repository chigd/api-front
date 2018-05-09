import React from 'react';
import { Row, Col, Card, Table, Popconfirm, Button } from 'antd';
import BreadcrumbCustom from "../BreadcrumbCustom";

class UrlRule extends React.Component{
    render() {
        return(
            <div>
                <BreadcrumbCustom first="API管理" second="URL格式定义" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box" style={{}}>
                            <Card bordered={false}>
                                <h1>请求URL说明：</h1>
                                <p>http://[域名]/owl/api/v1/[module_name]/[api_name]</p>
                                <br/>
                                <h2>域名和IP的说明：</h2>
                                <p>正式环境下使用域名：owl.uyun.cn。测试环境下使用IP：*.*.*.*</p>
                                <br/>
                                <h2>module_name的说明：</h2>
                                <p>[module_name]：功能模块名称，见API列表中的接口。例如接口名称为：	api/v1/app/vqdGroups，module_name为app。</p>
                                <br/>
                                <h2>api_name的说明：</h2>
                                <p>[api_name]：见API列表中的接口。例如接口名称为：api/v1/app/vqdGroups。</p>
                                <p>api_name为vqdGroups。</p>
                                <br></br>
                                <h2>请求URL的示例：</h2>
                                <p>1. 正式环境下访问：</p>
                                <p>http:// hornet.uyun.cn/owl/api/v1/app/vqdGroups</p>
                                <p>2. 测试环境下访问：</p>
                                <p>http://10.1.1.243:8080/owl/api/v1/app/vqdGroups</p>
                            </Card>
                        </div>
                    </Col>
                </Row>


            </div>
        )
    }
}
export default UrlRule;