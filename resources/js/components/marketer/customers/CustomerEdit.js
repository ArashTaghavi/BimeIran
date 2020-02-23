import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { englishNum } from '../../../helper/GeneralHelper'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class CustomerEdit extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
            loading: true,
            customer: {}
        }

        this.handleEditCustomer = this.handleEditCustomer.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/marketer/customers/${this.props.match.params.id}`, {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            this.setState({
                customer: response.data.customer,
                loading: false
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    handleEditCustomer(e)
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

        ax.put(`/api/marketer/customers/${this.state.customer.id}`, {
            full_name: full_name,
            national_code: national_code,
            phone: phone,
            address: address
        }, {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            this.setState({
                disableForm: false,
            })
            toast.success('مشخصات مشتری با موفقیت ویرایش شد.')
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

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">ویرایش مشخصات مشتری</h4>
                    {this.state.loading &&
                        <h1><i className="fa fa-spinner fa-spin"></i></h1>
                    }
                    {!this.state.loading &&
                        <form onSubmit={this.handleEditCustomer} className="admin-marketer-panel-form">
                            <div className="row align-row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="full_name">نام و نام خانوادگی:</label>
                                    <input type="text" id="full_name" className="form-control w-50" defaultValue={this.state.customer.full_name}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="national_code">کد ملی:</label>
                                    <input type="text" id="national_code" className="form-control w-50" defaultValue={this.state.customer.national_code}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="phone">شماره همراه:</label>
                                    <input type="text" id="phone" className="form-control w-50" defaultValue={this.state.customer.phone}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="address">آدرس:</label>
                                    <textarea id="address" className="form-control" rows="5" defaultValue={this.state.customer.address}></textarea>
                                </div>
                            </div>
                            <div className="text-left text-sm-right">
                                <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success ml-2 disabled-btn' : 'btn btn-success ml-2'}>
                                    {this.state.disableForm &&
                                        <i className="fa fa-spinner fa-spin ml-2"></i>
                                    }
                                    ویرایش مشخصات مشتری
                                </button>
                                <Link to={'/customers'} className="btn btn-danger">انصراف</Link>
                            </div>
                        </form>
                    }
                </div>
            </div>
        )
    }
}
