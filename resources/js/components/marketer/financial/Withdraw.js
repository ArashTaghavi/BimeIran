import React, { Component } from 'reactn'
import { toast } from 'react-toastify'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class Withdraw extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
            loading: true,
            walletAmount: ''
        }

        this.handleWithdrawRequest = this.handleWithdrawRequest.bind(this)
        this.formatAsMoney = this.formatAsMoney.bind(this)
    }

    componentDidMount()
    {
        ax.get('/api/marketer/statistics', {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            this.setState({
                walletAmount: response.data.wallet_amount,
                loading: false
            })
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    formatAsMoney(e)
    {
        let target = e.target.value
        let num = target.toString().replace(/\$|\,/g, "");
        if (isNaN(num)) num = "0";
        let sign = num == (num = Math.abs(num));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num =
                num.substring(0, num.length - (4 * i + 3)) +
                "," +
                num.substring(num.length - (4 * i + 3));
        e.target.value = num;
    }

    handleWithdrawRequest(e)
    {
        e.preventDefault()

        const humanReadableWithdrawAmount = $('#withdraw_amount').val()

        if (humanReadableWithdrawAmount == '' || humanReadableWithdrawAmount == '0')
        {
            toast.error('مبلغ برداشت وجه نمی تواند خالی باشد.')
            return
        }

        const withdrawAmount = humanReadableWithdrawAmount.split(',').join('')

        if (withdrawAmount < 100000)
        {
            toast.error('مبلغ برداشت وجه نمی تواند کمتر از 10 هزار تومان باشد.')
            return
        }

        const currentWalletAmount = this.state.walletAmount.split(',').join('')

        if (withdrawAmount > currentWalletAmount)
        {
            toast.error('مبلغ درخواستی بالاتر از موجودی کیف پول شما می باشد.')
            return
        }

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append('withdraw_amount', withdrawAmount)

        ax.post('/api/marketer/withdraw-request', formData, {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            toast.success('درخواست برداشت وجه شما با موفقیت ثبت گردید.')
            this.setState({ disableForm: false })
            n.done()
            this.props.history.push('/withdraw-list')
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

            const error = reason.response.data.error

            if (error === "less_equal_zero") {
                toast.error("مبلغ درخواستی نمی تواند کمتر از 10 هزار تومان باشد.");
            }

            if (error === "greater_than_wallet") {
                toast.error("مبلغ درخواستی از موجودی کیف پول شما بالاتر است.");
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
                    <h4 className="mb-4">درخواست برداشت وجه</h4>
                    <form onSubmit={this.handleWithdrawRequest} className="admin-marketer-panel-form">
                        <div className="row align-row">
                            <div className="col-12 mb-3">
                                <label htmlFor="withdraw_amount">مقدار وجه درخواستی:</label>
                                <div className="form-control-with-label w-50">
                                    <input type="text" id="withdraw_amount" className="form-control" onKeyUp={this.formatAsMoney}/>
                                    <span className="form-control-label">ریال</span>
                                </div>
                                {this.state.loading &&
                                    <p className="pt-1 font-size-12 text-gray"><i className="fa fa-spinner fa-spin"></i></p>
                                }
                                {!this.state.loading &&
                                    <p className="pt-1 font-size-12 text-gray">موجودی کیف پول: {this.state.walletAmount} ریال</p>
                                }
                            </div>
                        </div>
                        <div className="text-left text-sm-right">
                            <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-warning disabled-btn' : 'btn btn-warning'}>
                                {this.state.disableForm &&
                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                }
                                <i className="fa fa-send ml-2"></i>
                                ارسال درخواست
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
