import React, { Component } from 'reactn'
import { toast } from 'react-toastify'
import { englishNum } from '../../helper/GeneralHelper'
import n from '../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './helpers/AuthHelper'

export default class Password extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
        }

        this.handleChangePassword = this.handleChangePassword.bind(this)
    }

    handleChangePassword(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append('current_password', englishNum($('#current_password').val()))
        formData.append('new_password', englishNum($('#new_password').val()))
        formData.append('new_password_confirmation', englishNum($('#new_password_confirmation').val()))

        ax.post('/api/admin/change-password', formData, {
            headers: {
                'admin-token': token(),
            }
        })
        .then(response => {
            this.setState({
                disableForm: false,
            })
            toast.success('گذر واژه با موفقیت تغییر یافت.')
            n.done()
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

            if (error === "wrong_password") {
                toast.error("رمز فعلی وارد شده اشتباه است.");
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
                    <h4 className="mb-4">تغییر گذر واژه</h4>
                    <form onSubmit={this.handleChangePassword}>
                        <div className="row align-row">
                            <div className="col-12 mb-3">
                                <label htmlFor="current_password">گذر واژه فعلی:</label>
                                <input type="password" id="current_password" className="form-control w-50"/>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="new_password">گذر واژه جدید:</label>
                                <input type="password" id="new_password" className="form-control w-50"/>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="new_password_confirmation">تکرار گذر واژه جدید:</label>
                                <input type="password" id="new_password_confirmation" className="form-control w-50"/>
                            </div>
                        </div>
                        <div className="text-left text-sm-right">
                            <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success disabled-btn' : 'btn btn-success'}>
                                {this.state.disableForm &&
                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                }
                                تغییر گذر واژه
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
