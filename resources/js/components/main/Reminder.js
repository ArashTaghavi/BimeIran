import React, {Component} from 'react'
import Select from 'react-select'
import ax from 'axios'
import {toast} from 'react-toastify'
import {englishNum} from '../../helper/GeneralHelper'

export default class Reminder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabledBtn: false,
            code: '',
            formInputs: {
                fullname: '',
                insurance_company: '',
                insurance_number: '',
                phone: '',
                description:''
            },
            insuranceType: [
                {label: 'شخص ثالث', value: 'thirdparty'},
                {label: 'بدنه', value: 'body'},
                {label: 'آتش سوزی', value: 'fire'},
                {label: 'مسئولیت پزشکان', value: 'medic'},
                {label: 'عمر', value: 'life'},
                {label: 'درمان تکمیلی', value: 'treatment'},
                {label: 'مسافرتی', value: 'travel'},
            ],
        }

        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleRadioButton = this.handleRadioButton.bind(this)
        this.openCalendar = this.openCalendar.bind(this)
        this.handleSubmitReminder = this.handleSubmitReminder.bind(this)
    }

    handleSelectChange(name, optionSelected) {
        this.setState(prevState => {
            return {formInputs: {...prevState.formInputs, [name]: optionSelected}}
        })
    }

    handleInputChange(e) {
        const name = e.target.name
        const value = englishNum(e.target.value.split(',').join(''))

        if (name === 'prev_ins_finish_date') return

        this.setState(prevState => {
            return {
                formInputs: {...prevState.formInputs, [name]: value},
            }
        })
    }

    handleRadioButton(e) {
        const name = e.currentTarget.dataset.name
        const value = e.currentTarget.dataset.value
        const target = e.currentTarget

        this.setState(prevState => {
            return {formInputs: {...prevState.formInputs, [name]: value}}
        })

        const hasInsuranceBtns = document.querySelectorAll('.btn-ins-option')
        for (let hasInsuranceBtn of hasInsuranceBtns) {
            hasInsuranceBtn.classList.remove('active')
        }
        target.classList.add('active')

        if (value == '1') {
            target.parentElement.parentElement.nextElementSibling.classList.add('active')
        } else {
            target.parentElement.parentElement.nextElementSibling.classList.remove('active')
        }
    }

    openCalendar(e) {
        const calendar = e.target.nextElementSibling

        ax.post('/api/persian-calendar', {
            month: 0,
            year: 0
        }).then(response => {
            calendar.classList.add('active')
            calendar.innerHTML = response.data
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    handleSubmitReminder() {
        if (this.state.formInputs.fullname === '' || this.state.formInputs.phone === '' ||
            !this.state.formInputs.insurance_type) {
            toast.error('پر کردن تمامی موارد ستاره دار الزامی است.')
            return
        }

        if (this.state.formInputs.phone.length !== 11) {
            toast.error('لطفا شماره همراه خود را در 11 رقم و به درستی وارد کنید.')
            return
        }

        if (!this.state.formInputs.hasInsurance) {
            toast.error('لطفا مشخص کنید که آیا در حال حاضر بیمه هستید؟')
            return
        }

        let finish_date = document.getElementById('prev_ins_finish_date')
        if (this.state.formInputs.hasInsurance == '1' && finish_date.value === '') {
            toast.error('پر کردن تمامی موارد ستاره دار الزامی است.')
            return
        }

        const userData = this.state.formInputs;
        if (this.state.formInputs.hasInsurance == '1') {
            userData.deadline = finish_date.value
        }
        userData.insurance_name = this.state.formInputs.insurance_type ? this.state.formInputs.insurance_type.label : ''

        this.setState({disabledBtn: true})

        ax.post('/api/reminders', userData)
            .then(response => {
                toast.success('یادآور شما با موفقیت ثبت گردید.');
                this.setState({code: response.data.message.code})
                //   this.props.history.push('/')
            }).catch(reason => {
            // console.log(reason.response)
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

            if (error === "no_ins_check") {
                toast.error("لطفا مشخص کنید که آیا در حال حاضر بیمه هستید؟");
            }

            this.setState({disabledBtn: false})
        })
    }

    render() {
        const {disabledBtn, formInputs, insuranceType, code} = this.state;

        return (
            <div className="container reminder-container">
                <div className="reminder-form pt-2">
                    <div className="reminder-form-header p-2">
                        <h4 className="mb-0 text-center font-weight-normal">تنظیم یادآور اقساط یا خرید بیمه</h4>
                    </div>
                    <div className="reminder-form-body p-3 p-md-4">
                        <div className="row">
                            <div className="col-sm-12 col-12 mb-3 mt-2 mt-sm-0 pl-3 pl-sm-2">
                                <div className="insurance-selection-select-with-label">
                                    <Select options={insuranceType}
                                            placeholder={" "}
                                            className="mj-select-menu font-size-14"
                                            name="insurance_type"
                                            onChange={this.handleSelectChange.bind(this, 'insurance_type')}
                                    />
                                    <span className="insurance-selection-select-label">رشته بیمه<span
                                        className="text-danger">*</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-12 mb-3 pl-3 pl-sm-2">
                                <div className="insurance-selection-input-with-label">
                                    <input type="text"
                                           name="fullname"
                                           className="form-control font-size-14"
                                           value={formInputs.fullname}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="insurance-selection-select-label">نام و نام خانوادگی<span
                                        className="text-danger">*</span></span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12 mb-3 pr-3 pr-sm-2">
                                <div className="insurance-selection-input-with-label">
                                    <input type="text"
                                           name="phone"
                                           className="form-control font-size-14"
                                           value={formInputs.phone}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="insurance-selection-select-label">شماره همراه<span
                                        className="text-danger">*</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center text-sm-right">
                            <div className="col-12">
                                <button onClick={this.handleRadioButton}
                                        className="btn-ins-option font-size-11 ml-2"
                                        data-name="hasInsurance"
                                        data-value="1">
                                    بیمه دارم
                                </button>
                                <button onClick={this.handleRadioButton}
                                        className="btn-ins-option font-size-11 ml-2"
                                        data-name="hasInsurance"
                                        data-value="0">
                                    بیمه ندارم
                                </button>
                            </div>
                        </div>
                        <div className="mj-opac reminder-detail-box mt-4">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="insurance-selection-input-with-label mj-date">
                                        <input type="text"
                                               name="prev_ins_finish_date"
                                               id="prev_ins_finish_date"
                                               className="form-control font-size-14 text-center"
                                               onFocus={this.openCalendar}
                                        />
                                        <div className="mj-calendar"></div>
                                        <span className="insurance-selection-select-label">تاریخ پایان بیمه نامه<span
                                            className="text-danger">*</span></span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-12 mb-3 pl-3 pl-sm-2">
                                    <div className="insurance-selection-input-with-label">
                                        <input type="text"
                                               name="insurance_company"
                                               className="form-control font-size-14"
                                               value={formInputs.insurance_company}
                                               onChange={this.handleInputChange}
                                        />
                                        <span className="insurance-selection-select-label">شرکت بیمه</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-12 mb-0 pr-3 pr-sm-2">
                                    <div className="insurance-selection-input-with-label">
                                        <input type="text"
                                               name="insurance_number"
                                               className="form-control font-size-14"
                                               value={formInputs.insurance_number}
                                               onChange={this.handleInputChange}
                                        />
                                        <span className="insurance-selection-select-label">شماره بیمه نامه</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="reminder-form-footer pb-3 text-center">

                        <div className="col-sm-6 col-12 mb-3 pl-3 pl-sm-2">
                            <div className="insurance-selection-input-with-label">
<textarea name="description" id=""
          cols="30"
          rows="10"
          className="form-control font-size-14"
          value={this.state.formInputs.description}
          onChange={this.handleInputChange}
          placeholder="توضیحات"></textarea>
                                <span className="insurance-selection-select-label">توضیحات</span>
                            </div>
                        </div>
                        <button onClick={this.handleSubmitReminder} disabled={disabledBtn ? 'disabled' : ''}
                                className={disabledBtn ? 'btn btn-primary disabled-btn' : 'btn btn-primary'}>
                            {disabledBtn &&
                            <i className="fa fa-spinner fa-spin ml-2"></i>
                            }
                            ثبت یادآور
                        </button>
                        {
                            this.state.code !== '' &&

                            <div className="col-md-12 text-center alert alert-success mt-1">
                                کد رهگیری : {code}
                            </div>
                        }
                    </div>
                </div>
                {/*<div className="card shadow border-0 mb-4">
                    <div className="card-header p-2 bg-primary">
                        <h4 className="mb-0 text-center text-white font-weight-normal">تنظیم یادآور اقساط یا خرید بیمه</h4>
                    </div>
                    <div className="card-body p-3 p-md-4">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 mt-2 mt-sm-0">
                                <div className="insurance-selection-select-with-label">
                                    <Select options={ insuranceType }
                                            placeholder={" "}
                                            className="mj-select-menu font-size-14"
                                            name="insurance_type"
                                            onChange={this.handleSelectChange.bind(this, 'insurance_type')}
                                    />
                                    <span className="insurance-selection-select-label">رشته بیمه<span className="text-danger">*</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                                <div className="insurance-selection-input-with-label">
                                    <input type="text"
                                           name="fullname"
                                           className="form-control font-size-14"
                                           value={formInputs.fullname}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="insurance-selection-select-label">نام و نام خانوادگی<span className="text-danger">*</span></span>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                                <div className="insurance-selection-input-with-label">
                                    <input type="text"
                                           name="phone"
                                           className="form-control font-size-14"
                                           value={formInputs.phone}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="insurance-selection-select-label">شماره همراه<span className="text-danger">*</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center text-sm-right">
                            <div className="col-12">
                                <button onClick={this.handleRadioButton}
                                        className="btn-ins-option font-size-11 ml-2"
                                        data-name="hasInsurance"
                                        data-value="1">
                                        بیمه دارم
                                </button>
                                <button onClick={this.handleRadioButton}
                                        className="btn-ins-option font-size-11 ml-2"
                                        data-name="hasInsurance"
                                        data-value="0">
                                        بیمه ندارم
                                </button>
                            </div>
                        </div>
                        <div className="mj-opac reminder-detail-box mt-4">
                            <div className="row">
                                <div className="col-md-4 col-sm-6 col-12 mb-md-0 mb-3">
                                    <div className="insurance-selection-input-with-label mj-date">
                                        <input type="text"
                                               name="prev_ins_finish_date"
                                               id="prev_ins_finish_date"
                                               className="form-control font-size-14 text-center"
                                               onFocus={this.openCalendar}
                                        />
                                        <div className="mj-calendar"></div>
                                        <span className="insurance-selection-select-label">تاریخ پایان بیمه نامه<span className="text-danger">*</span></span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-md-0 mb-3">
                                    <div className="insurance-selection-input-with-label">
                                        <input type="text"
                                               name="insurance_company"
                                               className="form-control font-size-14"
                                               value={formInputs.insurance_company}
                                               onChange={this.handleInputChange}
                                        />
                                        <span className="insurance-selection-select-label">شرکت بیمه</span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-0">
                                    <div className="insurance-selection-input-with-label">
                                        <input type="text"
                                               name="insurance_number"
                                               className="form-control font-size-14"
                                               value={formInputs.insurance_number}
                                               onChange={this.handleInputChange}
                                        />
                                        <span className="insurance-selection-select-label">شماره بیمه نامه</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer p-2 p-md-3 text-center">
                        <button onClick={this.handleSubmitReminder} disabled={disabledBtn ? 'disabled' : ''} className={disabledBtn ? 'btn btn-success disabled-btn' : 'btn btn-success'}>
                            {disabledBtn &&
                                <i className="fa fa-spinner fa-spin ml-2"></i>
                            }
                            ثبت یادآور
                        </button>
                    </div>
                </div>*/}
            </div>
        )
    }
}
