import React, {Component} from 'reactn'
import {Link} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import {toast} from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import {token} from './../helpers/AuthHelper'

export default class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: {
                columns: [
                    {
                        label: 'نام',
                        field: 'fname',
                        sort: 'asc'
                    },
                    {
                        label: 'نام خانوادگی',
                        field: 'lname',
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
                        fname: <i className="fa fa-spinner fa-spin"></i>,
                        lname: <i className="fa fa-spinner fa-spin"></i>,
                        phone: <i className="fa fa-spinner fa-spin"></i>,
                        actions: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }
    }

    componentDidMount() {
        ax.get('/api/admin/users', {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            const users = response.data.users

            users.map(user => {
                user.actions = <Link to={`/user/${user.id}`} className="btn btn-info"><FeatherIcon icon="eye"/></Link>
                delete user.id
            })

            this.setState({
                ...this.state,
                users: {
                    ...this.state.users,
                    rows: users
                }
            }, () => {
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    render() {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">لیست کاربران</h4>
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
                        data={this.state.users}
                    />
                </div>
            </div>
        )
    }
}
