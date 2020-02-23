import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import { englishNum } from '../../../helper/GeneralHelper'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class CustomerCreate extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false
        }

        this.handleCreateCustomer = this.handleCreateCustomer.bind(this)
        this.handleUploadCustomers = this.handleUploadCustomers.bind(this)
    }

    handleCreateCustomer(e)
    {
        e.preventDefault()

        let full_name = $('#full_name').val()
        let national_code = englishNum($('#national_code').val())
        let phone = englishNum($('#phone').val())
        let address = englishNum($('#address').val())

        if (full_name === '') {
            toast.error('نام و نام خانوادگی نمی تواند خالی باشد.')
            return
        }

        if (national_code === '') {
            toast.error('کد ملی نمی تواند خالی باشد.')
            return
        }

        if (phone === '') {
            toast.error('شماره همراه نمی تواند خالی باشد.')
            return
        }

        if (address === '') {
            toast.error('آدرس نمی تواند خالی باشد.')
            return
        }

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append('full_name', full_name)
        formData.append('national_code', national_code)
        formData.append('phone', phone)
        formData.append('address', address)

        ax.post('/api/marketer/customers', formData, {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            this.setState({
                disableForm: false,
            })
            toast.success('مشتری با موفقیت ایجاد شد.')
            n.done()
            this.props.history.push('/customers')
        }).catch(reason => {
            if (reason.response.status === 405) {
                let errors = reason.response.data
                let i
                for (let key in errors) {
                    for (i = 0; i < errors[key].length; i++) {
                        toast.error(errors[key][i])
                    }
                }
            }

            this.setState({ disableForm: false })
            n.done()
        })
    }

    handleUploadCustomers(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append("customers_excel_file", document.querySelector("#customers_excel_file").files[0])

        ax.post('/api/marketer/upload-customers', formData, {
            headers: {
                'marketer-token': token(),
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded) / progressEvent.total)
                n.set(percentCompleted);
            }
        }).then(response => {
            toast.success('لیست کاربران با موفقیت ثبت گردید.')
            this.setState({ disableForm: false })
            n.done()
            this.props.history.push('/customers')
        }).catch(reason => {
            const error = reason.response.data.error

            if (error === "wrong_extension") {
                toast.error("فقط پسوند xlsx یا csv مورد قبول است.");
            }

            this.setState({ disableForm: false })
            n.done()
        })
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <div className="row align-row mb-4">
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                            <h4 className="mb-0">افزودن مشتری جدید</h4>
                        </div>
                        <div className="col-12 col-sm-6 text-left">
                            <label htmlFor="customers_excel_file">
                                {!this.state.disableForm &&
                                    <span className="btn btn-warning">
                                        <i className="fa fa-paperclip ml-2"></i>آپلود فایل اکسل
                                    </span>
                                }
                                {this.state.disableForm &&
                                    <span className="btn btn-warning">
                                        <i className="fa fa-spinner fa-spin ml-2"></i>در حال بارگزاری ...
                                        <br/>
                                        لطفا شکیبا باشید
                                    </span>
                                }
                            </label>
                            <input type="file" id="customers_excel_file" className="d-none" onChange={this.handleUploadCustomers}/>
                        </div>
                    </div>
                    <form onSubmit={this.handleCreateCustomer} className="admin-marketer-panel-form">
                        <div className="row align-row">
                            <div className="col-12 mb-3">
                                <label htmlFor="full_name">نام و نام خانوادگی:</label>
                                <input type="text" id="full_name" className="form-control w-50"/>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="national_code">کد ملی:</label>
                                <input type="text" id="national_code" className="form-control w-50"/>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="phone">شماره همراه:</label>
                                <input type="text" id="phone" className="form-control w-50"/>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="address">آدرس:</label>
                                <textarea id="address" className="form-control" rows="5"></textarea>
                            </div>
                        </div>
                        <div className="text-left text-sm-right">
                            <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success ml-2 disabled-btn' : 'btn btn-success ml-2'}>
                                {this.state.disableForm &&
                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                }
                                ثبت مشتری
                            </button>
                            <Link to={'/customers'} className="btn btn-danger">انصراف</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
