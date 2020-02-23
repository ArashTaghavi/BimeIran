import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import { token } from './helpers/AuthHelper'

export default class Homepage extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            customersQty: '',
            loading: true,
            news: '',
            walletAmount: ''
        }
    }

    componentDidMount()
    {
        let marquee = $('div.marquee')
    	marquee.each(function() {
    		let mar = $(this), indent = mar.width()
    		mar.marquee = function() {
    			indent--
    			mar.css('text-indent',indent)
    			if (indent < -1 * mar.children('div.marquee-text').width()) {
    				indent = mar.width()
    			}
    		}
    		mar.data('interval',setInterval(mar.marquee,1000/60))
    	})

        ax.get('/api/marketer/statistics', {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            const myData = response.data.news
            const news = []
            myData.map(khabar => {
                news.push(khabar.text)
            })
            this.setState({
                customersQty: response.data.customers_qty,
                news: news.join('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|||\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'),
                walletAmount: response.data.wallet_amount,
                loading: false
            })
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="latest-news">
                            <strong>آخرین اخبار</strong>
                            <div className="marquee">
                                <div className="marquee-text">
                                    {this.state.news}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mb-4">
                        <div className="card card-scale shadow-sm p-3 p-md-4">
                            <h4>موجودی کیف پول</h4>
                            {this.state.loading &&
                                <span className="d-block text-left stat-number"><i className="fa fa-spinner fa-spin"></i></span>
                            }
                            {!this.state.loading &&
                                <span className="d-block text-left stat-number">{this.state.walletAmount}</span>
                            }
                            <p className="text-left mb-0">ریال</p>
                            <Link to={'/withdraw'} className="btn btn-primary">درخواست برداشت وجه</Link>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mb-4">
                        <div className="card card-scale shadow-sm p-3 p-md-4">
                            <h4>تعداد مشتریان</h4>
                            {this.state.loading &&
                                <span className="d-block text-left stat-number"><i className="fa fa-spinner fa-spin"></i></span>
                            }
                            {!this.state.loading &&
                                <span className="d-block text-left stat-number">{this.state.customersQty}</span>
                            }
                            <p className="text-left mb-0">مشتری ثبت شده است.</p>
                            <Link to={'/customers'} className="btn btn-primary">لیست مشتریان</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
