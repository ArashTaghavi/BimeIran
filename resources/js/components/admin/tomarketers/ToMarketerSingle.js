import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import Magnifier from 'react-magnifier'
import { toast } from 'react-toastify'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class ToMarketerSingle extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
            loading: true,
            showAdminMessageForm: false,
            toMarketer: {},
        }

        this.openAdminMessageForm = this.openAdminMessageForm.bind(this)
        this.closeAdminMessageForm = this.closeAdminMessageForm.bind(this)
        this.handleAcceptRequest = this.handleAcceptRequest.bind(this)
        this.handleRejectRequest = this.handleRejectRequest.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/admin/to-marketer/${this.props.match.params.id}`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            if (response.data.to_marketer.status != 0) {
                this.props.history.goBack()
            } else {
                this.setState({
                    loading: false,
                    toMarketer: response.data.to_marketer
                })
            }
        }).catch(reason => {
            // console.log(reason)
        })
    }

    openAdminMessageForm()
    {
        this.setState({ showAdminMessageForm: true })
    }

    closeAdminMessageForm(e)
    {
        e.preventDefault()

        this.setState({ showAdminMessageForm: false })
    }

    handleAcceptRequest()
    {
        this.setState({ disableForm: true })
        n.start()

        ax.post('/api/admin/to-marketer/accept', {
            id: this.state.toMarketer.id,
            national_code: this.state.toMarketer.national_code
        }, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                disableForm: false,
            })
            toast.success('کاربر با موفقیت به بازاریاب تبدیل شد.')
            n.done()
            this.props.history.push('/to-marketer-requests')
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    handleRejectRequest(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append('id', this.state.toMarketer.id)
        formData.append('admin_message', $('#admin_message').val())

        ax.post('/api/admin/to-marketer/reject', formData, {
            headers: {
                'admin-token': token(),
            }
        })
        .then(response => {
            this.setState({
                disableForm: false,
            })
            toast.success('درخواست کاربر با موفقیت رد شد.')
            n.done()
            this.props.history.push('/to-marketer-requests')
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

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">
                        درخواست تبدیل به بازاریاب توسط:
                        {this.state.loading &&
                            <span className="fa fa-spinner fa-spin mr-2"></span>
                        }
                        {!this.state.loading &&
                            <span className="mr-2">{this.state.toMarketer.user.fname + ' ' + this.state.toMarketer.user.lname}</span>
                        }
                    </h4>
                    <div className="row align-row mb-3">
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>کد ملی</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.toMarketer.national_code}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4">
                            <div className="row align-row border-bottom no-gutters p-2">
                                <div className="col-6">
                                    <strong>شماره موبایل</strong>
                                </div>
                                <div className="col-6 text-left">
                                    {this.state.toMarketer.tel}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row align-row no-gutters p-2">
                                <div className="col-12 mb-2">
                                    <strong>آدرس</strong>
                                </div>
                                <div className="col-12">
                                    {this.state.toMarketer.address}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row align-row no-gutters p-2">
                                <div className="col-12 mb-3">
                                    <strong>تصویر کارت ملی:</strong>
                                </div>
                                <div className="col-12 text-center text-sm-right">
                                    {this.state.loading &&
                                        <h4 className="fa fa-spinner fa-spin mr-2"></h4>
                                    }
                                    {!this.state.loading &&
                                        <Magnifier src={'/images/national-carts/' + this.state.toMarketer.national_cart} width={260} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-4">
                            برای مشاهده ریز مشخصات کاربر
                            <Link to={'/user/' + this.state.toMarketer.user_id} className='pr-1 pl-1'>کلیک</Link>
                            کنید.
                        </div>
                        {!this.state.showAdminMessageForm &&
                            <div className="col-12 text-left mj-leftslide">
                                <button onClick={this.handleAcceptRequest} disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success ml-2 disabled-btn' : 'btn btn-success ml-2'}>
                                    {this.state.disableForm &&
                                        <i className="fa fa-spinner fa-spin ml-2"></i>
                                    }
                                    پذیرش درخواست
                                </button>
                                <button onClick={this.openAdminMessageForm} className="btn btn-danger">
                                    رد درخواست
                                </button>
                            </div>
                        }
                        {this.state.showAdminMessageForm &&
                            <div className="col-12 mj-rightslide">
                                <p className="mb-2">در صورت صلاحدید، دلیل رد درخواست این کاربر را شرح دهید:</p>
                                <form onSubmit={this.handleRejectRequest} className="admin-marketer-panel-form">
                                    <div className="mb-2">
                                        <textarea id="admin_message" className="form-control" rows="5" placeholder="دلیل رد درخواست..."></textarea>
                                    </div>
                                    <div className="text-left text-sm-right">
                                        <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-primary ml-2 disabled-btn' : 'btn btn-primary ml-2'}>
                                            {this.state.disableForm &&
                                                <i className="fa fa-spinner fa-spin ml-2"></i>
                                            }
                                            رد درخواست کاربر
                                        </button>
                                        <button onClick={this.closeAdminMessageForm} className="btn btn-danger">
                                            انصراف
                                        </button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
