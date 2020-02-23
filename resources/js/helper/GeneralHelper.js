import React, {Component} from 'reactn';
import {List} from "react-content-loader";

export function englishNum(input) {
    if (!input) input = "";
    let persians = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    for (var i = 0; i < 10; i++) {
        input = input.toString().replaceAll(persians[i], i.toString());
    }
    return input;
}


export function farsiNum(input) {
    if (!input) input = "";
    let persians = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    for (var i = 0; i < 10; i++) {
        input = input.toString().replaceAll(i.toString(), persians[i]);
    }
    return input;
}

export const FarsiNumber = props => <span style={{direction: "ltr", display: "inline-block"}}>
    {" " + farsiNum(props.children) + " "}
</span>;

export const PanelLoading = () => <List rtl={true} height={"80"} ariaLabel={"در حال بارگزاری..."}/>;
