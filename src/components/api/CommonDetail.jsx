
import React from 'react';
import {Input} from 'antd';
import ParamTable from "./ParamTable";
import BreadcrumbCustom from "../BreadcrumbCustom";

const Search = Input.Search;



export default class CommonDetail extends React.Component {

    render() {

        return (
            <div>
                <BreadcrumbCustom first="API管理" second="公共参数说明" />
               <ParamTable/>
            </div>
        )
    }
};
