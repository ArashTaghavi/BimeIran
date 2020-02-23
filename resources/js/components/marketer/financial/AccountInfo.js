import React, { Component } from 'reactn'
import { toast } from 'react-toastify'
import { englishNum } from '../../../helper/GeneralHelper'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class AccountInfo extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            accountInfo: {},
            disableForm: false,
            loading: true,
        }

        this.handleUpdateAccountInfo = this.handleUpdateAccountInfo.bind(this)
    }

    componentDidMount()
    {
        ax.get('/api/marketer/account-info', {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            this.setState({
                accountInfo: response.data.account_info,
                loading: false
            })
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    handleUpdateAccountInfo(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append('bank_name', $('#bank_name').val())
        formData.append('account_number', englishNum($('#account_number').val()))
        formData.append('sheba_number', englishNum($('#sheba_number').val()))
        formData.append('card_number', englishNum($('#card_number').val()))

        ax.post('/api/marketer/account-info', formData, {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            this.setState({
                disableForm: false,
            })
            toast.success('مشخصات حساب بانکی با موفقیت تغییر یافت.')
            n.done()
        }).catch(reason => {
            // console.log(reason.response)
            this.setState({ disableForm: false })
            n.done()
        })
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">مشخصات حساب بانکی</h4>
                    <form onSubmit={this.handleUpdateAccountInfo} className="admin-marketer-panel-form">
                        {this.state.loading &&
                            <h3><i className="fa fa-spinner fa-spin"></i></h3>
                        }
                        {!this.state.loading &&
                            <div className="row align-row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="bank_name">نام بانک:</label>
                                    <input type="text" id="bank_name" className="form-control w-50" defaultValue={this.state.accountInfo.bank_name}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="account_number">شماره حساب:</label>
                                    <input type="text" id="account_number" className="form-control w-50" defaultValue={this.state.accountInfo.account_number}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="sheba_number">شماره شبا:</label>
                                    <input type="text" id="sheba_number" className="form-control w-50" defaultValue={this.state.accountInfo.shaba_number}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="card_number">شماره کارت:</label>
                                    <input type="text" id="card_number" className="form-control w-50" defaultValue={this.state.accountInfo.card_number}/>
                                </div>
                            </div>
                        }
                        <div className="text-left text-sm-right">
                            <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-primary disabled-btn' : 'btn btn-primary'}>
                                {this.state.disableForm &&
                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                }
                                به روز رسانی
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
