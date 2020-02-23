import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import n from '../../../sdk/nprogress'
import { englishNum } from '../../../helper/GeneralHelper'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class MedicRatesEdit extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
            loading: true,
            rate: {}
        }

        this.handleEditRate = this.handleEditRate.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.formatAsMoney = this.formatAsMoney.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/admin/medic-rates/${this.props.match.params.id}`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                rate: response.data.rate,
                loading: false
            })
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    handleInputChange(e)
    {
        const name = e.target.name
        const value = englishNum(e.target.value.split(',').join(''))

        this.setState(prevState => {
            return {
                rate: { ...prevState.rate, [name]: value }
            }
        })
    }

    handleEditRate(e)
    {
        e.preventDefault()

        let rate = this.state.rate.rate
        let rate_with_plastic_surgery = this.state.rate.rate_with_plastic_surgery

        if (rate === '') {
            toast.error('مقدار نرخ نمی تواند خالی باشد.')
            return
        }

        if (this.state.rate.id < 8 && rate_with_plastic_surgery === '') {
            toast.error('مقدار نرخ نمی تواند خالی باشد.')
            return
        }

        this.setState({ disableForm: true })
        n.start()

        ax.put(`/api/admin/medic-rates/${this.state.rate.id}`, {
            rate: rate,
            rate_with_plastic_surgery: rate_with_plastic_surgery
        }, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                disableForm: false,
            })
            toast.success('نرخ با موفقیت ویرایش شد.')
            n.done()
            this.props.history.push('/medic-rates')
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

    formatAsMoney(e)
    {
        if (e.target.value < 1) { return }
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

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">ویرایش نرخ پزشکان</h4>
                    {this.state.loading &&
                        <h1><i className="fa fa-spinner fa-spin"></i></h1>
                    }
                    {!this.state.loading &&
                        <form onSubmit={this.handleEditRate} className="admin-marketer-panel-form">
                            <div className="row align-row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="name">عنوان نرخ:</label>
                                    <input type="text" id="name" className="form-control w-50" defaultValue={this.state.rate.name} disabled="disabled"/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="rate">مقدار نرخ:</label>
                                    <input type="text"
                                           id="rate"
                                           name="rate"
                                           className="form-control w-50"
                                           value={this.state.rate.rate}
                                           onChange={this.handleInputChange}
                                           onKeyUp={this.formatAsMoney}
                                           onFocus={this.formatAsMoney}
                                    />
                                </div>
                                {this.state.rate.id < 8 &&
                                    <div className="col-12 mb-3">
                                        <label htmlFor="rate">مقدار نرخ با پوشش جراحی پلاستیک:</label>
                                        <input type="text"
                                               id="rate_with_plastic_surgery"
                                               name="rate_with_plastic_surgery"
                                               className="form-control w-50"
                                               value={this.state.rate.rate_with_plastic_surgery}
                                               onChange={this.handleInputChange}
                                               onKeyUp={this.formatAsMoney}
                                               onFocus={this.formatAsMoney}
                                        />
                                    </div>
                                }
                            </div>
                            <div className="text-left text-sm-right">
                                <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success ml-2 disabled-btn' : 'btn btn-success ml-2'}>
                                    {this.state.disableForm &&
                                        <i className="fa fa-spinner fa-spin ml-2"></i>
                                    }
                                    ویرایش نرخ
                                </button>
                                <Link to={'/medic-rates'} className="btn btn-danger">انصراف</Link>
                            </div>
                        </form>
                    }
                </div>
            </div>
        )
    }
}
