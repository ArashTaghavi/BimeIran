import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { MDBDataTable } from 'mdbreact'
import ax from 'axios'
import { toast } from 'react-toastify'
import { englishNum } from '../../helper/GeneralHelper'
import $ from 'jquery'
import n from '../../sdk/nprogress'
import logo from '../../../images/logo.png'

const months = [
    { label: 'فروردین', value: 1 },
    { label: 'اردیبهشت', value: 2 },
    { label: 'خرداد', value: 3 },
    { label: 'تیر', value: 4 },
    { label: 'مرداد', value: 5 },
    { label: 'شهریور', value: 6 },
    { label: 'مهر', value: 7 },
    { label: 'آبان', value: 8 },
    { label: 'آذر', value: 9 },
    { label: 'دی', value: 10 },
    { label: 'بهمن', value: 11 },
    { label: 'اسفند', value: 12 },
]

const days = []

for (let i = 1; i <= 31; i++) {
    days.push({ label: i, value: i })
}

const years = []

for (let j = 1398; j >= 1300; j--) {
    years.push({ label: j, value: j })
}

export default class Dashboard extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            cities: [],
            disableForm: false,
            humanReadableBirthday: '',
            insurances: {
                columns: [
                    {
                        label: 'نوع بیمه',
                        field: 'insurance_name',
                        sort: 'asc'
                    },
                    {
                        label: 'تاریخ ثبت سفارش',
                        field: 'order_date',
                        sort: 'asc'
                    },
                    {
                        label: 'قیمت تمام شده',
                        field: 'final_price',
                        sort: 'asc'
                    },
                    {
                        label: 'وضعیت پرداخت',
                        field: 'payment_status',
                        sort: 'asc'
                    },
                ],
                rows: [
                    {
                        insurance_name: 'آتش سوزی',
                        order_date: '2019-08-01',
                        final_price: '20,000 تومان',
                        payment_status: <span className="btn btn-success">پرداخت شده</span>,
                    },
                    {
                        insurance_name: 'عمر',
                        order_date: '2019-08-01',
                        final_price: '20,000 تومان',
                        payment_status: <span className="btn btn-success">پرداخت شده</span>,
                    },
                    {
                        insurance_name: 'شخص ثالث',
                        order_date: '2019-08-01',
                        final_price: '20,000 تومان',
                        payment_status: <span className="btn btn-danger">پرداخت نشده</span>,
                    },
                    {
                        insurance_name: 'مسئولیت پزشکی',
                        order_date: '2019-08-01',
                        final_price: '20,000 تومان',
                        payment_status: <span className="btn btn-success">پرداخت شده</span>,
                    }
                ]
            },
            loading: true,
            nationalCardPreview: null,
            provinces: [],
            showUpdateForm: false,
            transactions: {
                columns: [
                    {
                        label: 'تاریخ انجام تراکنش',
                        field: 'transaction_date',
                        sort: 'asc'
                    },
                    {
                        label: 'شماره سفارش',
                        field: 'order_number',
                        sort: 'asc'
                    },
                    {
                        label: 'مبلغ',
                        field: 'price',
                        sort: 'asc'
                    },
                    {
                        label: 'شماره پیگیری',
                        field: 'tracking_number',
                        sort: 'asc'
                    },
                ],
                rows: [
                    {
                        transaction_date: '2019-08-01',
                        order_number: '10002368',
                        price: '20,000 تومان',
                        tracking_number: 1548963257,
                    },
                    {
                        transaction_date: '2019-08-04',
                        order_number: '10005694',
                        price: '35,000 تومان',
                        tracking_number: 5624869571,
                    },
                ]
            },
            user: {},
        }

        this.handleDashboardTabs = this.handleDashboardTabs.bind(this)
        this.handlePersonalInfoUpdate = this.handlePersonalInfoUpdate.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.openUpdateForm = this.openUpdateForm.bind(this)
        this.closeUpdateForm = this.closeUpdateForm.bind(this)
        this.handleProvinceChange = this.handleProvinceChange.bind(this)
        this.handleToMarketerReq = this.handleToMarketerReq.bind(this)
        this.changeNationalCardPreview = this.changeNationalCardPreview.bind(this)
        this.handleResetCredentials = this.handleResetCredentials.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/user`)
        .then(response => {
            let humanReadableBirthday = ''
            if (response.data.user.birthday) {
                let plainBirthday = response.data.user.birthday
                let birthdayArr = plainBirthday.split('-')
                if (birthdayArr[0]) {
                    let iranianMonths = ['','فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
                    humanReadableBirthday = birthdayArr[2] + ' ' + iranianMonths[birthdayArr[1]] + ' ' + birthdayArr[0]
                }
            }
            this.setState({
                user: response.data.user,
                humanReadableBirthday: humanReadableBirthday,
                loading: false
            })
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    handleDashboardTabs(e)
    {
        $('.dashboard-tab').removeClass('active')
        $('.dashboard-tab-content').removeClass('active')
        e.currentTarget.classList.add('active')
        $('#' + e.currentTarget.dataset.target).addClass('active')
        this.setState({ showUpdateForm: false })
    }

    openUpdateForm()
    {
        n.start()
        ax.get('/api/provinces')
        .then(response => {
            const provinces = response.data.provinces
            provinces.map(province => {
                province.value = province.id
                delete province.id
                province.label = province.name
                delete province.name
            })
            this.setState({ provinces: provinces, showUpdateForm: true })
            n.done()
        }).catch(reason => {
            // console.log(reason.response.data)
            n.done()
        })
    }

    closeUpdateForm(e)
    {
        e.preventDefault()
        this.setState({ showUpdateForm: false })
    }

    handleProvinceChange(optionSelected)
    {
        const province_id = optionSelected.value

        ax.get(`/api/cities/${province_id}`)
        .then(response => {
            const cities = response.data.cities
            cities.map(city => {
                city.value = city.id
                delete city.id
                city.label = city.name
                delete city.name
                delete city.province_id
            })
            this.setState({ cities: cities })
        }).catch(reason => {
            // console.log(reason.response.data)
        })
    }

    handlePersonalInfoUpdate(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append('fname', $('#fname').val())
        formData.append('lname', $('#lname').val())
        formData.append('national_code', englishNum($('#user_national_code').val()))
        formData.append('birthday_day', $('input[name="birthday-day"]').val())
        formData.append('birthday_month', $('input[name="birthday-month"]').val())
        formData.append('birthday_year', $('input[name="birthday-year"]').val())
        formData.append('email', englishNum($('#email').val()))
        formData.append('job', $('#job').val())
        formData.append('province_id', $('input[name="province"]').val())
        formData.append('city_id', $('input[name="city"]').val())
        formData.append('address', englishNum($('#address').val()))

        ax.post(`/api/user/${this.state.user.id}`, formData)
        .then(response => {
            let humanReadableBirthday = ''
            if (response.data.user.birthday) {
                let plainBirthday = response.data.user.birthday
                let birthdayArr = plainBirthday.split('-')
                if (birthdayArr[0]) {
                    let iranianMonths = ['','فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
                    humanReadableBirthday = birthdayArr[2] + ' ' + iranianMonths[birthdayArr[1]] + ' ' + birthdayArr[0]
                }
            }
            this.setState({
                user: response.data.user,
                humanReadableBirthday: humanReadableBirthday,
                disableForm: false,
                showUpdateForm: false
            })
            toast.success('مشخصات پروفایل با موفقیت به روز رسانی شد.')
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
            this.setState({ disableForm: false })
            n.done()
        })
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

        ax.post('/api/change-password', formData)
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

    changeNationalCardPreview(e)
    {
        this.setState({
            nationalCardPreview: URL.createObjectURL(e.target.files[0])
        })
    }

    handleToMarketerReq(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append('national_code', englishNum($('#national_code').val()))
        formData.append('tel', englishNum($('#marketer_phone').val()))
        formData.append('address', englishNum($('#marketer_address').val()))
        formData.append("national_cart", document.querySelector("#national_code_img").files[0])

        ax.post('/api/marketer-req', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded) / progressEvent.total)
                n.set(percentCompleted);
            }
        }).then(response => {
            this.setState({
                user: response.data.user,
                disableForm: false,
            })
            toast.success('درخواست شما با موفقیت ثبت گردید.')
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

            if (error === "large_image") {
                toast.error("اندازه تصویر حداکثر می تواند 1 مگابایت باشد.");
            }

            if (error === "no_image") {
                toast.error("آپلود کردن تصویر کارت ملی الزامی است.");
            }

            if (error === "wrong_extension") {
                toast.error("فقط پسوند های jpg، png و jpeg مورد قبول است.");
            }

            this.setState({ disableForm: false })
            n.done()
        })
    }

    handleResetCredentials(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        const phone = this.state.user.to_marketer[this.state.user.to_marketer.length - 1].tel
        const password = this.state.user.to_marketer[this.state.user.to_marketer.length - 1].national_code

        formData.append('phone', phone)
        formData.append('password', password)

        ax.post('/api/reset-marketer-password', formData)
        .then(response => {
            this.setState({
                disableForm: false,
            })
            toast.success('گذر واژه پنل بازاریاب به حالت پیش فرض بازگشت.')
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
            <div className="container pt-90 mb-3">
                {this.state.loading &&
                    <div className="sooroosh-overlay">
                        <img src={logo} alt="Logo"/>
                    </div>
                }
                <div className="card shadow border-0 mb-3">
                    <div className="card-body p-3">
                        <div className="row align-row dashboard-tabs text-center">
                            <div className="col-3">
                                <button className="dashboard-tab active" data-target="personal-info" onClick={this.handleDashboardTabs}>
                                    <i className="fa fa-user d-block"></i>
                                    اطلاعات شخصی
                                </button>
                            </div>
                            <div className="col-3">
                                <button className="dashboard-tab" data-target="my-insurances" onClick={this.handleDashboardTabs}>
                                    <i className="fa fa-medkit d-block"></i>
                                    بیمه های من
                                </button>
                            </div>
                            <div className="col-3">
                                <button className="dashboard-tab" data-target="to-marketer" onClick={this.handleDashboardTabs}>
                                    <i className="fa fa-refresh d-block"></i>
                                    درخواست تبدیل به بازاریاب
                                </button>
                            </div>
                            <div className="col-3">
                                <button className="dashboard-tab" data-target="transactions" onClick={this.handleDashboardTabs}>
                                    <i className="fa fa-credit-card d-block"></i>
                                    تراکنش ها
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow border-0">
                    <div className="card-body p-3 p-md-4">
                        <div className="dashboard-tab-content active" id="personal-info">
                            <h4 className="mb-4">
                                اطلاعات شخصی
                                <span className="user-wallet mr-2">(کیف پول: {this.state.user.wallet ? this.state.user.wallet.amount : ''} تومان)</span>
                            </h4>
                            {!this.state.showUpdateForm &&
                                <div className="dashboard-info-box personal-info-box mj-rightslide">
                                    <div className="row align-row mb-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row border-bottom no-gutters p-2">
                                                <div className="col-6">
                                                    <strong>نام</strong>
                                                </div>
                                                <div className="col-6 text-left">
                                                    {this.state.user.fname}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row border-bottom no-gutters p-2">
                                                <div className="col-6">
                                                    <strong>نام خانوادگی</strong>
                                                </div>
                                                <div className="col-6 text-left">
                                                    {this.state.user.lname}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row border-bottom no-gutters p-2">
                                                <div className="col-6">
                                                    <strong>شماره موبایل</strong>
                                                </div>
                                                <div className="col-6 text-left">
                                                    {this.state.user.phone}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row border-bottom no-gutters p-2">
                                                <div className="col-6">
                                                    <strong>تاریخ تولد</strong>
                                                </div>
                                                <div className="col-6 text-left">
                                                    {this.state.user.birthday ? this.state.humanReadableBirthday : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row border-bottom no-gutters p-2">
                                                <div className="col-3 pl-0">
                                                    <strong>کد ملی</strong>
                                                </div>
                                                <div className="col-9 pr-0 text-left">
                                                    {this.state.user.national_code}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row border-bottom no-gutters p-2">
                                                <div className="col-6">
                                                    <strong>شغل</strong>
                                                </div>
                                                <div className="col-6 text-left">
                                                    {this.state.user.job}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row border-bottom no-gutters p-2">
                                                <div className="col-6">
                                                    <strong>استان</strong>
                                                </div>
                                                <div className="col-6 text-left">
                                                    {this.state.user.province ? this.state.user.province.name : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row border-bottom no-gutters p-2">
                                                <div className="col-6">
                                                    <strong>شهر</strong>
                                                </div>
                                                <div className="col-6 text-left">
                                                    {this.state.user.city ? this.state.user.city.name : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row no-gutters p-2 border-bottom">
                                                <div className="col-12 mb-2">
                                                    <strong>ایمیل</strong>
                                                </div>
                                                <div className="col-12">
                                                    {this.state.user.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="row align-row no-gutters p-2 border-bottom">
                                                <div className="col-12 mb-2">
                                                    <strong>آدرس</strong>
                                                </div>
                                                <div className="col-12">
                                                    {this.state.user.address}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <button className="btn btn-info" onClick={this.openUpdateForm}>
                                            <i className="fa fa-edit ml-2"></i>
                                            ویرایش اطلاعات
                                        </button>
                                    </div>
                                    <hr/>
                                    <h5 className="mb-4">تغییر گذر واژه</h5>
                                    <form onSubmit={this.handleChangePassword} className="dashboard-info-box change-password-form">
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
                            }
                            {this.state.showUpdateForm &&
                                <form onSubmit={this.handlePersonalInfoUpdate} className="dashboard-info-box personal-info-form mj-leftslide">
                                    <div className="row align-row mb-3">
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="fname">نام</label>
                                            <input type="text" id="fname" className="form-control" defaultValue={this.state.user.fname}/>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="lname">نام خانوادگی</label>
                                            <input type="text" id="lname" className="form-control" defaultValue={this.state.user.lname}/>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="user_national_code">کد ملی</label>
                                            <input type="text" id="user_national_code" className="form-control" defaultValue={this.state.user.national_code}/>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="birthday">تاریخ تولد</label>
                                            <div className="row align-row no-gutters">
                                                <div className="col-4 pr-1 pl-1">
                                                    <Select options={ days }
                                                            placeholder={"روز"}
                                                            name="birthday-day"
                                                            defaultValue={this.state.user.birthday ? { label: this.state.user.birthday.split('-')[2], value: this.state.user.birthday.split('-')[2] } : ''}
                                                    />
                                                </div>
                                                <div className="col-4 pr-1 pl-1">
                                                    <Select options={ months }
                                                            placeholder={"ماه"}
                                                            name="birthday-month"
                                                            defaultValue={this.state.user.birthday ? { label: this.state.humanReadableBirthday.split(' ')[1], value: this.state.user.birthday.split('-')[1] } : ''}
                                                    />
                                                </div>
                                                <div className="col-4 pr-1 pl-1">
                                                    <Select options={ years }
                                                            placeholder={"سال"}
                                                            name="birthday-year"
                                                            defaultValue={this.state.user.birthday ? { label: this.state.user.birthday.split('-')[0], value: this.state.user.birthday.split('-')[0] } : ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="email">ایمیل</label>
                                            <input type="text" id="email" className="form-control" defaultValue={this.state.user.email}/>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="job">شغل</label>
                                            <input type="text" id="job" className="form-control" defaultValue={this.state.user.job}/>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="province">استان</label>
                                            <Select options={ this.state.provinces }
                                                    placeholder={"انتخاب استان"}
                                                    name="province"
                                                    defaultValue={this.state.user.province ? { label: this.state.user.province.name, value: this.state.user.province.id } : ''}
                                                    onChange={this.handleProvinceChange}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="city">شهر</label>
                                            <Select options={ this.state.cities }
                                                    placeholder={"انتخاب شهر"}
                                                    name="city"
                                                    defaultValue={this.state.user.city ? { label: this.state.user.city.name, value: this.state.user.city.id } : ''}
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="address">آدرس</label>
                                            <textarea id="address" className="form-control" rows="5" defaultValue={this.state.user.address ? this.state.user.address : ''}></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success ml-2 disabled-btn' : 'btn btn-success ml-2'}>
                                            {this.state.disableForm &&
                                                <i className="fa fa-spinner fa-spin ml-2"></i>
                                            }
                                            <i className="fa fa-edit ml-2"></i>
                                            ویرایش اطلاعات
                                        </button>
                                        <button className="btn btn-danger" onClick={this.closeUpdateForm}>
                                            <i className="fa fa-close ml-2"></i>
                                            انصراف
                                        </button>
                                    </div>
                                </form>
                            }
                        </div>
                        <div className="dashboard-tab-content" id="my-insurances">
                            <h4 className="mb-4">بیمه های من</h4>
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
                                data={this.state.insurances}
                            />
                        </div>
                        <div className="dashboard-tab-content" id="to-marketer">
                            <h4 className="mb-4">درخواست تبدیل به بازاریاب</h4>
                            {this.state.user.to_marketer && this.state.user.to_marketer.length === 0 &&
                                <form onSubmit={this.handleToMarketerReq} className="dashboard-info-box to-marketer-form">
                                    <div className="row align-row mb-3">
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="national_code">کد ملی:</label>
                                            <input type="text" id="national_code" className="form-control" defaultValue={this.state.user.national_code}/>
                                        </div>
                                        <div className="col-12 col-sm-6 mb-3">
                                            <label htmlFor="marketer_phone">شماره تماس:</label>
                                            <input type="text" id="marketer_phone" className="form-control" defaultValue={this.state.user.phone}/>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="marketer_address">آدرس:</label>
                                            <textarea id="marketer_address" className="form-control" rows="5" defaultValue={this.state.user.address ? this.state.user.address : ''}></textarea>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="national_code_img">
                                                <span className="btn btn-warning">
                                                    <i className="fa fa-paperclip ml-2"></i>آپلود تصویر کارت ملی
                                                </span>
                                            </label>
                                            <input type="file" id="national_code_img" className="d-none" onChange={this.changeNationalCardPreview}/>
                                        </div>
                                        {this.state.nationalCardPreview &&
                                            <div className="col-12 mb-3">
                                                <img src={this.state.nationalCardPreview} alt="national-card" className="rounded" style={{width: '200px'}}/>
                                            </div>
                                        }
                                    </div>
                                    <div className="text-left">
                                        <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success disabled-btn' : 'btn btn-success'}>
                                            {this.state.disableForm &&
                                                <i className="fa fa-spinner fa-spin ml-2"></i>
                                            }
                                            <i className="fa fa-send ml-2"></i>
                                            ارسال درخواست
                                        </button>
                                    </div>
                                </form>
                            }
                            {this.state.user.to_marketer && this.state.user.to_marketer.length > 0 && this.state.user.to_marketer[this.state.user.to_marketer.length - 1].status === 0 &&
                                <div className="alert alert-info">
                                    درخواست شما برای تبدیل شدن به بازاریاب در حال بررسی می باشد. پس از بررسی های لازم، نتیجه در همین بخش به شما اعلام خواهد شد.
                                </div>
                            }
                            {this.state.user.to_marketer && this.state.user.to_marketer.length > 0 && this.state.user.to_marketer[this.state.user.to_marketer.length - 1].status === 1 &&
                                <div className="alert alert-success">
                                    درخواست شما برای تبدیل شدن به بازاریاب توسط مدیر پذیرفته شد. حالا می توانید با استفاده از اطلاعات زیر وارد پنل بازاریاب شوید. لطفا پس از اولین ورود گذر واژه خود را تغییر دهید.
                                    <p className="mb-1 mt-3"><strong>مشخصات پیش فرض برای ورود:</strong></p>
                                    <p className="mb-1">نام کاربری: {this.state.user.to_marketer[this.state.user.to_marketer.length - 1].tel}</p>
                                    <p className="mb-3">گذر واژه: {this.state.user.to_marketer[this.state.user.to_marketer.length - 1].national_code}</p>
                                    <a href="/marketer" target="_blank" className="btn btn-info ml-2 mb-2">
                                        <i className="fa fa-sign-in ml-2"></i>
                                        ورود به پنل بازاریاب
                                    </a>
                                    <a href="#" onClick={this.handleResetCredentials} disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-warning mb-2 disabled-btn' : 'btn btn-warning mb-2'}>
                                        {this.state.disableForm &&
                                            <i className="fa fa-spinner fa-spin ml-2"></i>
                                        }
                                        <i className="fa fa-refresh ml-2"></i>
                                        بازگشت به مشخصات پیش فرض
                                    </a>
                                </div>
                            }
                            {this.state.user.to_marketer && this.state.user.to_marketer.length > 0 && this.state.user.to_marketer[this.state.user.to_marketer.length - 1].status === 2 &&
                                <div className="alert alert-danger">
                                    درخواست شما برای تبدیل شدن به بازاریاب توسط مدیر رد شد.
                                    <p className="mb-1 mt-3"><strong>پیام مدیر:</strong></p>
                                    <p className="mb-0">{this.state.user.to_marketer[this.state.user.to_marketer.length - 1].admin_message}</p>
                                </div>
                            }
                        </div>
                        <div className="dashboard-tab-content" id="transactions">
                            <h4 className="mb-4">تراکنش ها</h4>
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
                                data={this.state.transactions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
