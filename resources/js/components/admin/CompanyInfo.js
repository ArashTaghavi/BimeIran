import React, { Component } from 'reactn'
import { toast } from 'react-toastify'
import { englishNum } from '../../helper/GeneralHelper'
import n from '../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './helpers/AuthHelper'

export default class CompanyInfo extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            companyInfo: {},
            disableForm: false,
            loading: true
        }

        this.handleChangeCompanyInfo = this.handleChangeCompanyInfo.bind(this)
    }

    componentDidMount()
    {
        ax.get('/api/company-info')
        .then(response => {
            this.setState({
                companyInfo: response.data.company_info,
                loading: false
            })
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    handleChangeCompanyInfo(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append('phone', englishNum($('#phone').val()))
        formData.append('address', englishNum($('#address').val()))
        if ($('#telegram').val() != '') {
            formData.append('telegram', englishNum($('#telegram').val()))
        }
        if ($('#instagram').val() != '') {
            formData.append('instagram', englishNum($('#instagram').val()))
        }
        if ($('#whatsapp').val() != '') {
            formData.append('whatsapp', englishNum($('#whatsapp').val()))
        }

        ax.post('/api/admin/company-info', formData, {
            headers: {
                'admin-token': token(),
            }
        })
        .then(response => {
            this.setState({
                companyInfo: response.data.company_info,
                disableForm: false,
            })
            toast.success('اطلاعات با موفقیت به روز رسانی شد.')
            n.done()
        }).catch(reason => {
            console.log(reason.response)
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
                    <h4 className="mb-4">فرم اطلاعات شرکت</h4>
                    {this.state.loading &&
                        <h4 className="mb-3"><i className="fa fa-spinner fa-spin"></i></h4>
                    }
                    {!this.state.loading &&
                        <form onSubmit={this.handleChangeCompanyInfo} className="admin-marketer-panel-form">
                            <div className="row align-row">
                                <div className="col-12 col-sm-6 mb-3">
                                    <label htmlFor="phone">شماره تماس</label>
                                    <input type="text" id="phone" className="form-control ltr" defaultValue={this.state.companyInfo.phone}/>
                                </div>
                                <div className="col-12 col-sm-6 mb-3">
                                    <label htmlFor="telegram">آدرس تلگرام</label>
                                    <input type="text" id="telegram" className="form-control ltr" defaultValue={this.state.companyInfo.telegram}/>
                                </div>
                                <div className="col-12 col-sm-6 mb-3">
                                    <label htmlFor="instagram">آدرس اینستاگرام</label>
                                    <input type="text" id="instagram" className="form-control ltr" defaultValue={this.state.companyInfo.instagram}/>
                                </div>
                                <div className="col-12 col-sm-6 mb-3">
                                    <label htmlFor="whatsapp">آدرس واتساپ</label>
                                    <input type="text" id="whatsapp" className="form-control ltr" defaultValue={this.state.companyInfo.whatsapp}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="address">آدرس دفتر</label>
                                    <textarea id="address" className="form-control" rows="5" defaultValue={this.state.companyInfo.address}></textarea>
                                </div>
                            </div>
                            <div className="text-left text-sm-right">
                                <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success disabled-btn' : 'btn btn-success'}>
                                    {this.state.disableForm &&
                                        <i className="fa fa-spinner fa-spin ml-2"></i>
                                    }
                                    <i className="fa fa-refresh ml-2"></i>
                                    به روز رسانی اطلاعات
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        )
    }
}
