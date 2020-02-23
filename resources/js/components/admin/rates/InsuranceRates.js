import React, { Component, Fragment } from 'reactn'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class InsuranceRates extends Component
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
                        label: 'بیمه مرتبط',
                        field: 'insurance',
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
                        insurance: <i className="fa fa-spinner fa-spin"></i>,
                        rate: <i className="fa fa-spinner fa-spin"></i>,
                        actions: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }
    }

    componentDidMount()
    {
        ax.get('/api/admin/insurance-rates', {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            const rates = response.data.rates

            rates.map(rate => {
                rate.insurance_name = rate.insurance.name
                rate.actions = <Fragment>
                                 <Link to={`/insurance-rates/${rate.id}/edit`} className="btn btn-warning"><FeatherIcon icon="edit"/></Link>
                               </Fragment>
                delete rate.insurance_id
                delete rate.insurance
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
                    <h4 className="mb-4">لیست سایر نرخ های بیمه</h4>
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
