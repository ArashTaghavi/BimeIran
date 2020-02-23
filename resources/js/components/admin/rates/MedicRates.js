import React, { Component, Fragment } from 'reactn'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class MedicRates extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            rates: {
                columns: [
                    {
                        label: 'شناسه',
                        field: 'id',
                        sort: 'asc'
                    },
                    {
                        label: 'عنوان',
                        field: 'name',
                        sort: 'asc'
                    },
                    {
                        label: 'نرخ',
                        field: 'rate',
                        sort: 'asc'
                    },
                    {
                        label: 'نرخ با جراحی پلاستیک',
                        field: 'rate_with_plastic_surgery',
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
                        id: <i className="fa fa-spinner fa-spin"></i>,
                        name: <i className="fa fa-spinner fa-spin"></i>,
                        rate: <i className="fa fa-spinner fa-spin"></i>,
                        rate_with_plastic_surgery: <i className="fa fa-spinner fa-spin"></i>,
                        actions: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }
    }

    componentDidMount()
    {
        ax.get('/api/admin/medic-rates', {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            const rates = response.data.rates

            rates.map(rate => {
                rate.rate_with_plastic_surgery = rate.rate_with_plastic_surgery == '0' ? 'ندارد' : rate.rate_with_plastic_surgery
                rate.actions = <Fragment>
                                 <Link to={`/medic-rates/${rate.id}/edit`} className="btn btn-warning"><FeatherIcon icon="edit"/></Link>
                               </Fragment>
            })

            this.setState({
                ...this.state,
                rates: {
                    ...this.state.rates,
                    rows: rates
                }
            }, () => {
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">لیست نرخ های پایه بیمه پزشکان</h4>
                    <MDBDataTable
                        striped
                        barReverse
                        btn
                        responsive
                        entriesLabel="تعداد نتایج در هر صفحه"
                        info={false}
                        paginationLabel={["قبلی", "بعدی"]}
                        searchLabel="جستجو"
                        className="responsive-table rates-table"
                        data={this.state.rates}
                    />
                </div>
            </div>
        )
    }
}
