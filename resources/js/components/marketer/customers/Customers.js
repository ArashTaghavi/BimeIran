import React, { Component, Fragment } from 'reactn'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class Customers extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            customers: {
                columns: [
                    {
                        label: 'شناسه',
                        field: 'id',
                        sort: 'asc'
                    },
                    {
                        label: 'نام و نام خانوادگی',
                        field: 'full_name',
                        sort: 'asc'
                    },
                    {
                        label: 'کد ملی',
                        field: 'national_code',
                        sort: 'asc'
                    },
                    {
                        label: 'شماره همراه',
                        field: 'phone',
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
                        full_name: <i className="fa fa-spinner fa-spin"></i>,
                        national_code: <i className="fa fa-spinner fa-spin"></i>,
                        phone: <i className="fa fa-spinner fa-spin"></i>,
                        actions: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }

        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this)
    }

    componentDidMount()
    {
        ax.get('/api/marketer/customers', {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            const customers = response.data.customers

            customers.map(customer => {
                customer.actions = <Fragment>
                                   <Link to={`/customer/${customer.id}`} className="btn btn-info ml-2"><FeatherIcon icon="eye"/></Link>
                                   <Link to={`/customer/${customer.id}/edit`} className="btn btn-warning ml-2"><FeatherIcon icon="edit"/></Link>
                                   <button data-id={customer.id} className="btn btn-danger" onClick={this.handleDeleteCustomer}><FeatherIcon icon="trash-2"/></button>
                                   </Fragment>
                delete customer.marketer_id
            })

            this.setState({
                ...this.state,
                customers: {
                    ...this.state.customers,
                    rows: customers
                }
            }, () => {
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    handleDeleteCustomer(e)
    {
        e.preventDefault()

        let deleteConfirm = confirm("آیا از حذف این مشتری اطمینان دارید؟")

        if (deleteConfirm)
        {
            n.start()

            let id = e.currentTarget.dataset.id

            ax.delete(`/api/marketer/customers/${id}`, {
                headers: {
                    'marketer-token': token(),
                }
            }).then(response => {
                const customers = this.state.customers.rows

                const newData = customers.filter(customer => {
                    return customer.id != id
                })

                this.setState({
                    ...this.state,
                    customers: {
                        ...this.state.customers,
                        rows: newData
                    }
                }, () => {
                })
                toast.success('مشتری مورد نظر با موفقیت حذف گردید.')
                n.done()
            }).catch(reason => {
                // console.log(reason.response)
                // n.done()
            })
        }
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <div className="row align-row mb-4">
                        <div className="col-6 pl-0">
                            <h4 className="mb-0">لیست مشتریان</h4>
                        </div>
                        <div className="col-6 pr-0 text-left">
                            <Link to={'/customer/create'} className="btn btn-primary">
                                <FeatherIcon icon="plus" className="ml-2"/>
                                افزودن مشتری جدید
                            </Link>
                        </div>
                    </div>
                    <MDBDataTable
                        striped
                        barReverse
                        btn
                        responsive
                        entriesLabel="تعداد نتایج در هر صفحه"
                        info={false}
                        paginationLabel={["قبلی", "بعدی"]}
                        searchLabel="جستجو"
                        className="responsive-table customers-table"
                        data={this.state.customers}
                    />
                </div>
            </div>
        )
    }
}
