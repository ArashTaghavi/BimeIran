import React, {Component} from 'reactn'
import {Link} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import ax from 'axios'
import {token} from './../helpers/AuthHelper'

export default class Marketers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            marketers: {
                columns: [
                    {
                        label: 'نام و نام خانوادگی',
                        field: 'full_name',
                        sort: 'asc'
                    },
                    {
                        label: 'شماره همراه',
                        field: 'phone',
                        sort: 'asc'
                    },
                    {
                        label: 'موجودی کیف پول',
                        field: 'wallet',
                        sort: 'asc'
                    },
                    {
                        label: 'عملیات',
                        field: 'actions',
                        sort: 'asc'
                    },
                ],
                rows: [
                    {
                        full_name: <i className="fa fa-spinner fa-spin"></i>,
                        phone: <i className="fa fa-spinner fa-spin"></i>,
                        wallet: <i className="fa fa-spinner fa-spin"></i>,
                        actions: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }
    }

    componentDidMount() {
        ax.get('/api/admin/marketers', {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            const marketers = response.data.marketers;

            marketers.map(marketer => {
                marketer.wallet_amount = marketer.marketer_wallet.amount + ' ریال'
                marketer.actions =
                    <Link to={`/marketer/${marketer.id}`} className="btn btn-info"><FeatherIcon icon="eye"/></Link>
                marketer.id = marketer.fname + ' ' + marketer.lname;

                delete marketer.fname;
                delete marketer.lname;
                delete marketer.marketer_wallet;
            });

            this.setState({
                ...this.state,
                marketers: {
                    ...this.state.marketers,
                    rows: marketers
                }
            }, () => {
            })
        }).catch(reason => {
             console.log(reason)
        })
    }

    render() {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">لیست بازاریاب ها</h4>
                    <MDBDataTable
                        striped
                        barReverse
                        btn
                        responsive
                        entriesLabel="تعداد نتایج در هر صفحه"
                        info={false}
                        paginationLabel={["قبلی", "بعدی"]}
                        searchLabel="جستجو"
                        className="responsive-table"
                        data={this.state.marketers}
                    />
                </div>
            </div>
        )
    }
}
