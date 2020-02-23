import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class ReminderSingle extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
            loading: true,
            reminder: {},
        }

        this.goBack = this.goBack.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUpdateReminder = this.handleUpdateReminder.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/admin/reminder/${this.props.match.params.id}`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                loading: false,
                reminder: response.data.reminder
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    handleInputChange(e)
    {
        const name = e.target.name
        const value = e.target.value

        this.setState(prevState => {
            return {
                reminder: { ...prevState.reminder, [name]: value }
            }
        })
    }

    handleUpdateReminder()
    {
        this.setState({ disableForm: true })

        ax.post(`/api/admin/reminder/${this.state.reminder.id}`, {
            status: this.state.reminder.status,
            description: this.state.reminder.description
        }, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            toast.success('یادآور با موفقیت به روز رسانی شد.')
            this.setState({
                disableForm: false,
                reminder: response.data.reminder
            })
        }).catch(reason => {
            // console.log(reason.response)
            this.setState({ disableForm: false })
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
                        مشاهده ریز مشخصات یادآور برای:
                        {this.state.loading &&
                            <span className="fa fa-spinner fa-spin mr-2"></span>
                        }
                        {!this.state.loading &&
                            <span className="mr-2">{this.state.reminder.fullname}</span>
                        }
                    </h4>
                    <div className="row align-row mb-5">
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>نام و نام خانوادگی</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.reminder.fullname}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>شماره همراه</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.reminder.phone}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>نوع بیمه</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.reminder.insurance}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>وضعیت بیمه نامه</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.reminder.has_insurance ? 'دارد' : 'ندارد'}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6 pl-0">
                                    <strong>تاریخ سررسید</strong>
                                </div>
                                <div className="col-6 pr-0 text-left">
                                    {this.state.reminder.deadline ? this.state.reminder.deadline : 'در اسرع وقت'}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>شرکت بیمه</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.reminder.insurance_company ? this.state.reminder.insurance_company : 'نامشخص'}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>شماره بیمه نامه</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.reminder.insurance_number ? this.state.reminder.insurance_number : 'نامشخص'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-row mb-2">
                        <div className="col-12 col-sm-6 mb-3">
                            <label htmlFor="status">وضعیت</label>
                            <select id="status" name="status" className="form-control font-size-14" value={this.state.reminder.status} onChange={this.handleInputChange}>
                                <option value="0">عدم تماس</option>
                                <option value="1">یکبار تماس</option>
                                <option value="2">دو بار تماس</option>
                                <option value="3">سه بار تماس</option>
                                <option value="4">اتمام</option>
                            </select>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="description">شرح</label>
                            <textarea name="description" id="description" className="form-control font-size-14" rows="5" value={this.state.reminder.description ? this.state.reminder.description : ''} onChange={this.handleInputChange}></textarea>
                        </div>
                    </div>
                    <div className="text-left">
                        <button onClick={this.handleUpdateReminder} disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success disabled-btn' : 'btn btn-success'}>
                            {this.state.disableForm &&
                                <i className="fa fa-spinner fa-spin ml-2"></i>
                            }
                            به روز رسانی
                        </button>
                        <button onClick={this.goBack} className="btn btn-primary mr-2">بازگشت</button>
                    </div>
                </div>
            </div>
        )
    }
}
