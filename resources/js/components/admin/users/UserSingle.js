import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class UserSingle extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            humanReadableBirthday: '',
            loading: true,
            user: {},
        }

        this.goBack = this.goBack.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/admin/user/${this.props.match.params.id}`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            let humanReadableBirthday = ''
            if (response.data.user.birthday) {
                let plainBirthday = response.data.user.birthday
                let birthdayArr = plainBirthday.split('-')
                if (birthdayArr[0]) {
                    let iranianMonths = ['','فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
                    humanReadableBirthday = birthdayArr[2] + ' ' + iranianMonths[birthdayArr[1]] + ' ' + birthdayArr[0]
                }
            }
            this.setState({
                humanReadableBirthday: humanReadableBirthday,
                loading: false,
                user: response.data.user
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    goBack()
    {
        this.props.history.goBack()
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">
                        مشاهده ریز مشخصات کاربر:
                        {this.state.loading &&
                            <span className="fa fa-spinner fa-spin mr-2"></span>
                        }
                        {!this.state.loading &&
                            <span className="mr-2">{this.state.user.fname + ' ' + this.state.user.lname}</span>
                        }
                    </h4>
                    <div className="row align-row mb-3">
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>نام</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.user.fname}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>نام خانوادگی</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.user.lname}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>شماره موبایل</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.user.phone}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>تاریخ تولد</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.user.birthday ? this.state.humanReadableBirthday : ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-3 pl-0">
                                    <strong>ایمیل</strong>
                                </div>
                                <div className="col-9 pr-0 text-left">
                                    {this.state.user.email}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>شغل</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.user.job}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>استان</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.user.province ? this.state.user.province.name : ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>شهر</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.user.city ? this.state.user.city.name : ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row align-row no-gutters p-2">
                                <div className="col-12 mb-2">
                                    <strong>آدرس</strong>
                                </div>
                                <div className="col-12">
                                    {this.state.user.address}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-left">
                        <button onClick={this.goBack} className="btn btn-primary">بازگشت</button>
                    </div>
                </div>
            </div>
        )
    }
}
