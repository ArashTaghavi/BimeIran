import React, { Component, Fragment } from 'reactn'
import Slider from 'rc-slider/lib/Slider'
import ax from 'axios'
import { toast } from 'react-toastify'
import { englishNum } from '../../helper/GeneralHelper'
import $ from 'jquery'
import InsurancePurchaseStepLabel from './partials/InsurancePurchaseStepLabel'
import InsurancePurchaseTable from './partials/InsurancePurchaseTable'
import DiscountBox from './partials/DiscountBox'
import UserDetailForm from './partials/UserDetailForm'
import BuildingDetailForm from './partials/BuildingDetailForm'
import ReceiverDetailForm from './partials/ReceiverDetailForm'
import PaymentBill from './partials/PaymentBill'
import FireInsuranceOptions from './insurance-options/FireInsuranceOptions'
import EarthquakeInsuranceOptions from './insurance-options/EarthquakeInsuranceOptions'
import ThirdpartyInsuranceOptions from './insurance-options/ThirdpartyInsuranceOptions'
import BodyInsuranceOptions from './insurance-options/BodyInsuranceOptions'
import TravelInsuranceOptions from './insurance-options/TravelInsuranceOptions'
import MedicInsuranceOptions from './insurance-options/MedicInsuranceOptions'
import logo from '../../../images/logo.png'

export default class BuyInsurance extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            additionalOptionsPersian: [],
            buildingCostPerMeterLabels: {
                0: <p className="rtl mb-0 font-size-12 most-bottom-label">فقط لوازم خانه</p>,
                500000: <p className="rtl mb-0 font-size-12">0.5<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                1000000: <p className="rtl mb-0 font-size-12">1<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                1500000: <p className="rtl mb-0 font-size-12">1.5<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                2000000: <p className="rtl mb-0 font-size-12">2<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                2500000: <p className="rtl mb-0 font-size-12">2.5<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                3000000: <p className="rtl mb-0 font-size-12">3<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                3500000: <p className="rtl mb-0 font-size-12">3.5<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                4000000: <p className="rtl mb-0 font-size-12">4<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                4500000: <p className="rtl mb-0 font-size-12">4.5<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                5000000: <p className="rtl mb-0 font-size-12">5<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
            },
            financialCommitmentLevelLabels: {
                9000000: <p className="rtl mb-0 font-size-12">9<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                18000000: <p className="rtl mb-0 font-size-12">18<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                28000000: <p className="rtl mb-0 font-size-12">28<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                45000000: <p className="rtl mb-0 font-size-12">45<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                80000000: <p className="rtl mb-0 font-size-12">80<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                110000000: <p className="rtl mb-0 font-size-12">110<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
                180000000: <p className="rtl mb-0 font-size-12">180<span className="d-none d-md-inline-block mr-1">میلیون تومان</span></p>,
            },
            buildingCities: [],
            calculationLoading: true,
            cities: [],
            disabledFinalPaymentButton: true,
            disabledOrderBtn: true,
            finalPrice: '',
            humanReadableBirthday: '',
            loading: true,
            insurancePersian: '',
            medicOrParamedic: [
                { label: 'پزشک', value: '1' },
                { label: 'پیراپزشک', value: '2' },
            ],
            orderId: '',
            provinces: [],
            receiverCities: [],
            receiverInfo: {
                fullname: '',
                phone: '',
                section: '',
                landline_phone: '',
                postal_code: '',
                address: '',
            },
            residencyStatus: [
                { label: 'رزیدنت هستم', value: '1' },
                { label: 'رزیدنت نیستم', value: '0' },
            ],
            studentStatus: [
                { label: 'دانشجو هستم', value: '1' },
                { label: 'دانشجو نیستم', value: '0' },
            ],
            user: {},
        }

        this.handleUpdateUserInfo = this.handleUpdateUserInfo.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.handleCountChange = this.handleCountChange.bind(this)
        this.handleOptionButton = this.handleOptionButton.bind(this)
        this.handleSliderChange = this.handleSliderChange.bind(this)
        this.applyInputChange = this.applyInputChange.bind(this)
        this.handleProvinceChange = this.handleProvinceChange.bind(this)
        this.handleUserInputChange = this.handleUserInputChange.bind(this)
        this.handleReceiverInputChange = this.handleReceiverInputChange.bind(this)
        this.handlePrevInsDateChange = this.handlePrevInsDateChange.bind(this)
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this)
        this.handleSubmitPayment = this.handleSubmitPayment.bind(this)
        this.calculateInsurance = this.calculateInsurance.bind(this)
        this.incrementStep = this.incrementStep.bind(this)
        this.openCalendar = this.openCalendar.bind(this)
        this.formatAsMoney = this.formatAsMoney.bind(this)
        this.formatAsMoneyAfterUpdate = this.formatAsMoneyAfterUpdate.bind(this)
        this.formatAsMoneyJustValue = this.formatAsMoneyJustValue.bind(this)
        this.getInsurancePersianName = this.getInsurancePersianName.bind(this)
        this.toggleAdditionalOptions = this.toggleAdditionalOptions.bind(this)
        this.toggleThirdpartyAdditionalOptions = this.toggleThirdpartyAdditionalOptions.bind(this)
    }

    componentDidMount()
    {
        if (!this.props.location.state)
        {
            toast.error('404: صفحه مورد نظر یافت نشد.')
            this.props.history.push('/')
            return null
        }

        window.scrollTo(0, 0)

        const persianName = this.getInsurancePersianName(this.props.match.params.insurance_name)

        if (this.global.loggedIn)
        {
            ax.all([
                ax.get(`/api/user`),
                ax.get('/api/provinces')
            ]).then(responseArr => {
                let humanReadableBirthday = ''
                if (responseArr[0].data.user.birthday) {
                    let plainBirthday = responseArr[0].data.user.birthday
                    let birthdayArr = plainBirthday.split('-')
                    if (birthdayArr[0]) {
                        let iranianMonths = ['','فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
                        humanReadableBirthday = birthdayArr[2] + ' ' + iranianMonths[birthdayArr[1]] + ' ' + birthdayArr[0]
                    }
                }
                const provinces = responseArr[1].data.provinces
                provinces.map(province => {
                    province.value = province.id
                    delete province.id
                    province.label = province.name
                    delete province.name
                })
                this.setState({
                    provinces: provinces,
                    user: responseArr[0].data.user,
                    humanReadableBirthday: humanReadableBirthday,
                })
            }).catch(reason => {
                // console.log(reason)
            })
        }

        this.setState({
            ...this.props.location.state,
            loading: false,
            step: 1,
            insurancePersian: persianName,
        }, () => {
            this.calculateInsurance()
        })
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (this.state.step === 1)
        {
            let elms = document.querySelectorAll('.insurance-selection-input-label')

            for (let elm of elms)
            {
                if (elm.textContent === 'تومان')
                {
                    this.formatAsMoneyAfterUpdate(elm.parentElement.firstChild)
                }
            }
        }

        if (Object.entries(this.state.user).length === 0 && this.state.user.constructor === Object && prevState.step === 1 && this.state.step === 2)
        {
            this.setState({ calculationLoading: true })

            ax.all([
                ax.get(`/api/user`),
                ax.get('/api/provinces')
            ]).then(responseArr => {
                let humanReadableBirthday = ''
                if (responseArr[0].data.user.birthday) {
                    let plainBirthday = responseArr[0].data.user.birthday
                    let birthdayArr = plainBirthday.split('-')
                    if (birthdayArr[0]) {
                        let iranianMonths = ['','فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
                        humanReadableBirthday = birthdayArr[2] + ' ' + iranianMonths[birthdayArr[1]] + ' ' + birthdayArr[0]
                    }
                }
                const provinces = responseArr[1].data.provinces
                provinces.map(province => {
                    province.value = province.id
                    delete province.id
                    province.label = province.name
                    delete province.name
                })
                this.setState({
                    humanReadableBirthday: humanReadableBirthday,
                    provinces: provinces,
                    user: responseArr[0].data.user,
                }, () => {
                    this.setState({ calculationLoading: false })
                })
            }).catch(reason => {
                // console.log(reason)
            })
        }

        if (prevState.step === 2 && this.state.step === 3)
        {
            console.log(this.state.formInputs)
            this.setState(prevState => {
                return {
                    receiverInfo: {
                        ...prevState.receiverInfo,
                        fullname: prevState.user.fname + ' ' + prevState.user.lname,
                        phone: prevState.user.phone,
                        address: prevState.user.address,
                        receiver_province: prevState.user.province_id ? prevState.user.province.name : '',
                        receiver_city: prevState.user.city_id ? prevState.user.city.name : '',
                    },
                }
            })
        }
    }

    handleSelectChange(name, optionSelected)
    {
        if (name === 'car_brand')
        {
            ax.get(`/api/car/${optionSelected.value}/models`)
            .then(response => {
                const models = response.data.car_models

                models.map(model => {
                    model.value = model.id
                    delete model.id
                    model.label = model.title
                    delete model.title
                })

                this.setState(prevState => {
                    return {
                        carModels: models,
                        formInputs: {
                            ...prevState.formInputs,
                            [name]: optionSelected,
                            car_model: null,
                        },
                        finalPrice: 0,
                        disabledOrderBtn: true
                    }
                })
            }).catch(reason => {
                // console.log(reason.response)
            })

            return
        }

        if (name === 'car_model')
        {
            const car = this.state.carModels.filter(model => {
                return optionSelected.value === model.value
            })

            const specificModel = car[0]
            const manufactureYears = []

            const floorYear = (specificModel.from_year < 1600) ? specificModel.from_year : 1350

            for (let startYear = this.state.currentYear; startYear >= floorYear; startYear--)
            {
                manufactureYears.push({
                    value: startYear,
                    label: startYear
                })
            }

            this.setState(prevState => {
                return {
                    carManufactureYears: manufactureYears,
                    formInputs: {...prevState.formInputs, [name]: optionSelected}
                }
            })
        }

        if (name === 'medicOrParamedic')
        {
            ax.get(`/api/medic/${optionSelected.value}/specialties`)
            .then(response => {
                const specialties = response.data.specialties

                specialties.map(specialty => {
                    specialty.value = specialty.id
                    delete specialty.id
                    specialty.label = specialty.name
                    delete specialty.name
                })

                this.setState(prevState => {
                    return {
                        specialties: specialties,
                        formInputs: {
                            ...prevState.formInputs,
                            [name]: optionSelected,
                            specialty: null,
                            isResident: null,
                        },
                        finalPrice: 0,
                        disabledOrderBtn: true
                    }
                })
            }).catch(reason => {
                // console.log(reason.response)
            })

            return
        }

        if (name === 'prev_ins_company')
        {
            this.setState(prevState => {
                return {
                    formInputs: {
                        ...prevState.formInputs,
                        prevInsStartDate: '',
                        prevInsFinishDate: '',
                        prev_thirdparty_discount: null,
                        prev_driver_discount: null,
                        charge_prev_ins: { label: 'خیر', value: 0 },
                        driver_damage_qty: null,
                        life_damage_qty: null,
                        property_damage_qty: null,
                    }
                }
            })
        }

        if (name === 'charge_prev_ins')
        {
            this.setState(prevState => {
                return {
                    formInputs: {
                        ...prevState.formInputs,
                        [name]: optionSelected,
                        driver_damage_qty: null,
                        life_damage_qty: null,
                        property_damage_qty: null,
                    }
                }
            }, () => {
                const section = document.getElementById('thirdparty-additional-option-toggler').nextElementSibling
                section.style.maxHeight = section.scrollHeight + "px"
            })

            if (optionSelected.value)
            {
                this.setState({ finalPrice: 0, disabledOrderBtn: true })
                return
            } else {
                this.setState({ disabledOrderBtn: false })
            }
        }

        if (name === 'property_damage_qty' || name === 'life_damage_qty' || name === 'driver_damage_qty')
        {
            this.setState(prevState => {
                return { formInputs: {...prevState.formInputs, [name]: optionSelected} }
            }, () => {
                if (this.state.formInputs.property_damage_qty && this.state.formInputs.life_damage_qty && this.state.formInputs.driver_damage_qty)
                {
                    this.calculateInsurance()
                }
            })

            return
        }

        if (name === 'building_province')
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
                this.setState(prevState => {
                    return {
                        buildingCities: cities,
                        formInputs: { ...prevState.formInputs, [name]: optionSelected.label }
                    }
                })
            }).catch(reason => {
                // console.log(reason)
            })

            return
        }

        if (name === 'building_city')
        {
            this.setState(prevState => {
                return { formInputs: {...prevState.formInputs, [name]: optionSelected.label} }
            })

            return
        }

        if (name === 'receiver_province')
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
                this.setState(prevState => {
                    return {
                        receiverCities: cities,
                        receiverInfo: { ...prevState.receiverInfo, [name]: optionSelected.label }
                    }
                })
            }).catch(reason => {
                // console.log(reason)
            })

            return
        }

        if (name === 'receiver_city')
        {
            this.setState(prevState => {
                return { receiverInfo: {...prevState.receiverInfo, [name]: optionSelected.label} }
            })

            return
        }

        if (name === 'isResident' || name === 'isStudent')
        {
            this.setState(prevState => {
                return { formInputs: {...prevState.formInputs, [name]: optionSelected} }
            })

            return
        }

        this.setState(prevState => {
            return { formInputs: {...prevState.formInputs, [name]: optionSelected} }
        }, () => this.calculateInsurance())
    }

    handleInputChange(e)
    {
        const target = e.target
        const name = e.target.name
        const value = englishNum(e.target.value.split(',').join(''))

        if (name === 'passengers_qty' || name === 'prev_ins_start_date' || name === 'prev_ins_finish_date') return

        if (name === 'building_address' || name === 'building_age' || name === 'building_level' ||
            name === 'building_level_qty' || name === 'building_postal_code' || name === 'building_unit')
        {
            this.setState(prevState => {
                return { formInputs: {...prevState.formInputs, [name]: value} }
            })

            return
        }

        this.setState(prevState => {
            return {
                formInputs: {...prevState.formInputs, [name]: value},
                showApplyBtn: true,
                disabledOrderBtn: true,
            }
        }, () => {
            if (name === 'personel_qty' && this.state.formInputs.personel_qty < 50)
            {
                this.setState({ ...prevState.formInputs, personel_qty: '' })
                toast.error('تعداد افراد نمی تواند کمتر از 50 نفر باشد.')
                return
            }

            if (name === 'affordability' && this.state.formInputs.affordability < 50000)
            {
                this.setState({ ...prevState.formInputs, affordability: '' })
                toast.error('حداقل رقم پرداخت ماهیانه 50 هزار تومان است.')
                return
            }

            target.nextElementSibling.classList.add('active')
        })
    }

    handleSliderChange(value, name)
    {
        this.setState(prevState => {
            return { formInputs: { ...prevState.formInputs, [name]: value } }
        }, () => this.calculateInsurance())
    }

    handleOptionButton(e)
    {
        const name = e.currentTarget.dataset.name
        const value = e.currentTarget.dataset.value
        const persianName = e.currentTarget.dataset.persian

        if (name === 'payment_gateway')
        {
            this.setState(prevState => {
                return { formInputs: {...prevState.formInputs, [name]: value}, disabledFinalPaymentButton: false }
            })

            const allGatewayBtns = document.querySelectorAll('.gateway-btn')
            for (let btn of allGatewayBtns)
            {
                btn.classList.remove('active')
            }
            e.currentTarget.classList.add('active')

            return
        }

        this.setState(prevState => {
            return { formInputs: {...prevState.formInputs, [name]: value} }
        }, () => this.calculateInsurance())

        if (value == 1) {
            this.setState(prevState => {
                return { additionalOptionsPersian: [ ...prevState.additionalOptionsPersian, persianName ] }
            })
            e.currentTarget.dataset.value = 0
            e.currentTarget.classList.add('active')
        } else {
            const newOptions = this.state.additionalOptionsPersian.filter(option => option !== persianName)
            this.setState({ additionalOptionsPersian: newOptions })
            e.currentTarget.dataset.value = 1
            e.currentTarget.classList.remove('active')
        }
    }

    applyInputChange(e)
    {
        let applyChangeBtns = document.querySelectorAll('.apply-change-btn')
        for (let applyChangeBtn of applyChangeBtns)
        {
            applyChangeBtn.classList.remove('active')
        }
        this.calculateInsurance()
    }

    handleCheckboxChange(e)
    {
        const name = e.target.name
        const value = e.target.checked ? '1' : '0'

        this.setState(prevState => {
            return { formInputs: { ...prevState.formInputs, [name]: value } }
        }, () => {
            if (name === 'hasPrevBodyIns')
            {
                this.setState(prevState => {
                    return { formInputs: { ...prevState.formInputs, prev_body_discount: null } }
                })

                if (value == '1')
                {
                    this.setState({ finalPrice: 0, disabledOrderBtn: true })
                    return
                } else {
                    this.setState({ disabledOrderBtn: false })
                }
            }

            this.calculateInsurance()
        })
    }

    handleCountChange(count, name)
    {
        this.setState(prevState => {
            return { formInputs: {...prevState.formInputs, [name]: count} }
        }, () => {
            const passengersQty = this.state.formInputs.zero_to_12_age + this.state.formInputs.thirteen_to_65_age +
                                  this.state.formInputs.sixtySix_to_70_age + this.state.formInputs.seventyOne_to_75_age +
                                  this.state.formInputs.seventySix_to_80_age + this.state.formInputs.eightyOne_to_85_age

            this.setState(prevState => {
                return { formInputs: {...prevState.formInputs, passengers_qty: passengersQty} }
            })
        })
    }

    handleUserInputChange(e)
    {
        const name = e.target.name
        const value = englishNum(e.target.value)

        this.setState(prevState => {
            return {
                user: {...prevState.user, [name]: value},
            }
        })
    }

    handleReceiverInputChange(e)
    {
        const name = e.target.name
        const value = englishNum(e.target.value)

        this.setState(prevState => {
            return {
                receiverInfo: {...prevState.receiverInfo, [name]: value},
            }
        })
    }

    handlePrevInsDateChange(e)
    {
        e.target.nextElementSibling.nextElementSibling.classList.add('active')
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

    incrementStep()
    {
        window.scrollTo(0, 0)

        this.setState(prevState => {
            return { step: prevState.step + 1 }
        })
    }

    openCalendar(e)
    {
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

    formatAsMoney(e)
    {
        let target = e.target.value
        let num = target.toString().replace(/\$|\,/g, "");
        if (isNaN(num)) num = "0";
        let sign = num == (num = Math.abs(num));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num =
                num.substring(0, num.length - (4 * i + 3)) +
                "," +
                num.substring(num.length - (4 * i + 3));
        e.target.value = num;
    }

    formatAsMoneyJustValue(target)
    {
        let num = target.toString().replace(/\$|\,/g, "");
        if (isNaN(num)) num = "0";
        let sign = num == (num = Math.abs(num));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num =
                num.substring(0, num.length - (4 * i + 3)) +
                "," +
                num.substring(num.length - (4 * i + 3));
        return num;
    }

    formatAsMoneyAfterUpdate(elm)
    {
        let target = elm.value
        let num = target.toString().replace(/\$|\,/g, "");
        if (isNaN(num)) num = "0";
        let sign = num == (num = Math.abs(num));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num =
                num.substring(0, num.length - (4 * i + 3)) +
                "," +
                num.substring(num.length - (4 * i + 3));
        elm.value = num;
    }

    getInsurancePersianName(latin)
    {
        switch (latin) {
            case 'fire':
                return 'آتش سوزی'
                break
            case 'body':
                return 'بدنه'
                break
            case 'earthquake':
                return 'زلزله'
                break
            case 'life':
                return 'عمر'
                break
            case 'medic':
                return 'مسئولیت پزشکان'
                break
            case 'treatment':
                return 'درمان تکمیلی'
                break
            case 'thirdparty':
                return 'شخص ثالث'
                break
            case 'travel':
                return 'مسافرتی'
                break
            default:
                return 'بیمه ایران'
        }
    }

    toggleAdditionalOptions(e)
    {
        const target = e.currentTarget
        const options = target.parentElement.nextElementSibling

        if (options.style.maxHeight) {
            options.style.maxHeight = null
        } else {
            options.style.maxHeight = options.scrollHeight + "px"
        }
    }

    toggleThirdpartyAdditionalOptions(e)
    {
        const target = e.currentTarget
        const options = target.nextElementSibling

        if (options.style.maxHeight) {
            options.style.maxHeight = null
            options.style.overflow = 'hidden'
            target.classList.remove('active')
        } else {
            options.style.maxHeight = options.scrollHeight + "px"
            options.style.overflow = 'visible'
            target.classList.add('active')
        }
    }

    calculateInsurance()
    {
        this.setState(prevState => {
            return {
                calculationLoading: true,
                formInputs: {
                    ...prevState.formInputs,
                    prevInsStartDate: $('#prev_ins_start_date').val(),
                    prevInsFinishDate: $('#prev_ins_finish_date').val(),
                }
            }
        }, () => {
            const insData = this.state.formInputs

            if (this.state.insurance === 'thirdparty')
            {
                insData.car_brand_id = this.state.formInputs.car_brand.value
                insData.car_model_id = this.state.formInputs.car_model.value
                insData.car_birthday = this.state.formInputs.manufacture_year.value
                insData.prev_thirdparty_discount_value = this.state.formInputs.prev_thirdparty_discount.value
                insData.prev_driver_discount_value = this.state.formInputs.prev_driver_discount.value
                insData.did_charge_prev_ins = this.state.formInputs.charge_prev_ins.value
                insData.property_damage_qty_value = this.state.formInputs.property_damage_qty ? this.state.formInputs.property_damage_qty.value : ''
                insData.life_damage_qty_value = this.state.formInputs.life_damage_qty ? this.state.formInputs.life_damage_qty.value : ''
                insData.driver_damage_qty_value = this.state.formInputs.driver_damage_qty ? this.state.formInputs.driver_damage_qty.value : ''
                insData.prevInsFinishYear = this.state.formInputs.prevInsFinishDate.split('-')[0]
                insData.prevInsFinishMonth = this.state.formInputs.prevInsFinishDate.split('-')[1]
                insData.prevInsFinishDay = this.state.formInputs.prevInsFinishDate.split('-')[2]
            }

            if (this.state.insurance === 'body')
            {
                insData.car_brand_id = this.state.formInputs.car_brand.value
                insData.car_model_id = this.state.formInputs.car_model.value
                insData.car_birthday = this.state.formInputs.manufacture_year.value
                insData.prev_body_discount_value = this.state.formInputs.prev_body_discount ? this.state.formInputs.prev_body_discount.value : ''
            }

            if (this.state.insurance === 'travel')
            {
                insData.travel_plan_id = this.state.formInputs.travel_plan.value
                insData.travel_duration_latin = this.state.formInputs.travel_duration.value
            }

            if (this.state.insurance === 'medic')
            {
                insData.specialty_id = this.state.formInputs.specialty ? this.state.formInputs.specialty.value : ''
                insData.prev_medic_discount_value = this.state.formInputs.prev_medic_ins_discount ? this.state.formInputs.prev_medic_ins_discount.value : ''
            }

            ax.post(`/api/calculation/${this.state.insurance}`, insData)
            .then(response => {
                console.log(response.data.message)
                this.setState({
                    finalPrice: response.data.temp_final_cost,
                    calculationLoading: false,
                    disabledOrderBtn: false,
                }, () => {
                    if (this.state.finalPrice === '0')
                    {
                        toast.error('امکان ارائه بیمه با این شرایط وجود ندارد.')
                        this.setState({
                            disabledOrderBtn: true
                        })
                    }

                    if (response.data.wrong_discount_code)
                    {
                        toast.error('کد تخفیف وارد شده اشتباه است.')
                        this.setState(prevState => {
                            return { formInputs: { ...prevState.formInputs, customer_discount_code: '' } }
                        })
                    }
                })
            }).catch(reason => {
                console.log(reason.response)
                const error = reason.response.data.error

                if (error === 'too_old_car')
                {
                    toast.error('امکان ارائه بیمه بدنه برای خودرو های با بیش از ۱۵ سال کارکرد وجود ندارد.')
                    this.setState({
                        calculationLoading: false,
                        disabledOrderBtn: true,
                        finalPrice: 0,
                    })
                }

                if (error === 'too_cheap_car')
                {
                    toast.error('ارزش روز خودرو نمی تواند کمتر از ۵ میلیون تومان باشد.')
                    this.setState({
                        calculationLoading: false,
                        disabledOrderBtn: true,
                        finalPrice: 0,
                    })
                }
            })
        })
    }

    handleUpdateUserInfo()
    {
        if (this.state.user.fname === '' || this.state.user.lname === '' ||
            this.state.user.national_code === '' || $('input[name="birthday_day"]').val() === '' ||
            $('input[name="birthday_month"]').val() === '' || $('input[name="birthday_year"]').val() === '')
        {
            toast.error('پر کردن تمامی موارد ستاره دار الزامی است.')
            return
        }

        if (this.state.user.national_code.length !== 10)
        {
            toast.error('لطفا کد ملی خود را در 10 رقم و به درستی وارد کنید.')
            return
        }

        if (this.state.insurance === 'fire' || this.state.insurance === 'earthquake')
        {
            if (this.state.formInputs.building_address === '' || this.state.formInputs.building_postal_code === ''||
                this.state.formInputs.building_level_qty === '' || this.state.formInputs.building_age === '' ||
                this.state.formInputs.building_level === '' || this.state.formInputs.building_unit === '' ||
                $('input[name="building_province"]').val() === '' || $('input[name="building_city"]').val() === '')
            {
                toast.error('پر کردن تمامی موارد ستاره دار الزامی است.')
                return
            }

            if (this.state.formInputs.building_postal_code.length !== 10)
            {
                toast.error('لطفا کد پستی خود را در 10 رقم و به درستی وارد کنید.')
                return
            }
        }

        this.setState({ calculationLoading: true })

        const formData = new FormData()

        formData.append('fname', this.state.user.fname)
        formData.append('lname', this.state.user.lname)
        formData.append('national_code', this.state.user.national_code)
        formData.append('birthday_day', $('input[name="birthday_day"]').val())
        formData.append('birthday_month', $('input[name="birthday_month"]').val())
        formData.append('birthday_year', $('input[name="birthday_year"]').val())
        formData.append('email', this.state.user.email)
        formData.append('job', this.state.user.job)
        formData.append('province_id', $('input[name="province"]').val())
        formData.append('city_id', $('input[name="city"]').val())
        formData.append('address', this.state.user.address)

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
                calculationLoading: false
            }, () => this.incrementStep())
        }).catch(reason => {
            // console.log(reason)
            if (reason.response.status === 405) {
                let errors = reason.response.data
                let i
                for (let key in errors) {
                    for (i = 0; i < errors[key].length; i++) {
                        toast.error(errors[key][i])
                    }
                }
            }
            this.setState({ calculationLoading: false })
        })
    }

    handleSubmitOrder()
    {
        if (this.state.receiverInfo.fullname === '' || this.state.receiverInfo.phone === '' ||
            this.state.receiverInfo.landline_phone === '' || this.state.receiverInfo.address === ''||
            $('input[name="receiver_province"]').val() === '' || $('input[name="receiver_city"]').val() === '')
        {
            toast.error('پر کردن تمامی موارد ستاره دار الزامی است.')
            return
        }

        const details = {}
        const { formInputs } = this.state

        if (this.state.insurance === 'fire' || this.state.insurance === 'earthquake')
        {
            details.area = formInputs.area
            details.building_address = formInputs.building_address
            details.building_age = formInputs.building_age
            details.building_city = formInputs.building_city
            details.building_cost_per_meter = formInputs.building_cost_per_meter
            details.building_level = formInputs.building_level
            details.building_level_qty = formInputs.building_level_qty
            details.building_postal_code = formInputs.building_postal_code
            details.building_province = formInputs.building_province
            details.building_unit = formInputs.building_unit
            details.furniture_value = formInputs.furniture_value
            details.property_type = formInputs.property_type.label
            details.options = this.state.additionalOptionsPersian.join('،')
        }

        if (this.state.insurance === 'thirdparty')
        {
            details.car_brand = formInputs.car_brand.label
            details.car_model = formInputs.car_model.label
            details.manufacture_year = formInputs.manufacture_year.label
            details.financial_commitment_level = formInputs.financial_commitment_level
            details.prev_ins_start_date = formInputs.prevInsStartDate
            details.prev_ins_finish_date = formInputs.prevInsFinishDate
            details.prev_ins_company = formInputs.prev_ins_company.label
            details.prev_thirdparty_discount = formInputs.prev_thirdparty_discount.label
            details.prev_driver_discount = formInputs.prev_driver_discount.label
            if (formInputs.charge_prev_ins && formInputs.charge_prev_ins.value == 1)
            {
                details.life_damage_qty = formInputs.life_damage_qty.label
                details.property_damage_qty = formInputs.property_damage_qty.label
                details.driver_damage_qty = formInputs.driver_damage_qty.label
            }
        }

        if (this.state.insurance === 'body')
        {
            details.car_brand = formInputs.car_brand.label
            details.car_model = formInputs.car_model.label
            details.manufacture_year = formInputs.manufacture_year.label
            details.prev_body_discount = formInputs.prev_body_discount ? formInputs.prev_body_discount.label : ''
            details.zero_discount = formInputs.hasBeenUsed
            details.options = this.state.additionalOptionsPersian.join('،')
        }

        if (this.state.insurance === 'travel')
        {
            details.travel_plan = formInputs.travel_plan.label
            details.travel_duration = formInputs.travel_duration.label
            details.passengers_qty = formInputs.passengers_qty
            details.zero_to_12_age = formInputs.zero_to_12_age
            details.thirteen_to_65_age = formInputs.thirteen_to_65_age
            details.sixtySix_to_70_age = formInputs.sixtySix_to_70_age
            details.seventyOne_to_75_age = formInputs.seventyOne_to_75_age
            details.seventySix_to_80_age = formInputs.seventySix_to_80_age
            details.eightyOne_to_85_age = formInputs.eightyOne_to_85_age
        }

        if (this.state.insurance === 'medic')
        {
            details.medicOrParamedic = formInputs.medicOrParamedic.label
            details.prev_medic_ins_discount = formInputs.prev_medic_ins_discount.label
            details.specialty = formInputs.specialty.label
            details.beautySurgeryOption = (formInputs.beautySurgeryOption == '0') ? 'ندارد' : 'دارد'
            details.isResident = formInputs.isResident ? formInputs.isResident.label : null
            details.isStudent = formInputs.isStudent ? formInputs.isStudent.label : null
        }

        this.setState({ calculationLoading: true })

        ax.post('/api/submit-order', {
            ...this.state.receiverInfo,
            insurance: this.state.insurance,
            price: this.state.finalPrice.split(',').join(''),
            details: JSON.stringify(details)
        }).then(response => {
            this.setState({
                calculationLoading: false,
                orderId: response.data.order_id,
            }, () => {
                this.incrementStep()
            })
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
            this.setState({ calculationLoading: false })
        })
    }

    handleSubmitPayment()
    {
        console.log('handling submit payment come here...')
    }

    render()
    {
        const { buildingCostPerMeterLabels, cars, carModels, carManufactureYears,
                damageQtys, disabledBtn, discountMedicYears, discountPercents,
                discountYears, formInputs, franchiseePercents, insurance, insurancePersian,
                insuranceCompanies, loading, propertyType, specialties, step,
                travelPlan, travelDuration, yesNoQuestion, birthday_days,
                payment_method, finalPrice, humanReadableBirthday, provinces, cities,
                life_ins_duration, showApplyBtn, calculationLoading, disabledOrderBtn,
                additionalOptionsPersian, user, buildingCities, receiverCities,
                receiverInfo, disabledFinalPaymentButton, financialCommitmentLevelLabels,
                medicOrParamedic, residencyStatus, studentStatus } = this.state

        return (
            <div className="container pt-4 pt-lg-5 mt-5">
                {loading &&
                    <div className="sooroosh-overlay">
                        <img src={logo} alt="لوگوی شرکت سروش اقتصاد"/>
                    </div>
                }
                {/* Insurance Purchase Steps */}
                <div className="card shadow border-0 mb-3">
                    <div className="card-body p-3">
                        <div className="row no-gutters align-row text-center ins-purchase-steps">
                            <InsurancePurchaseStepLabel label={'انتخاب'} step={step} stepNumber={'1'} />
                            <InsurancePurchaseStepLabel label={'مشخصات'} step={step} stepNumber={'2'} />
                            <InsurancePurchaseStepLabel label={'ارسال'} step={step} stepNumber={'3'} />
                            <InsurancePurchaseStepLabel label={'پرداخت'} step={step} stepNumber={'4'} />
                        </div>
                    </div>
                </div>
                {step === 1 &&
                    <div className="ins-purchase-step-wrapper">
                        {calculationLoading &&
                            <div className="ins-purchase-step-overlay">
                                <i className="fa fa-spinner fa-spin"></i>
                            </div>
                        }
                        <div className={insurance === 'medic' ? 'card shadow border-0 mb-3 pt-2 pr-0 pl-0' : 'card shadow border-0 mb-3 pt-2 pr-0 pl-0 pr-xl-5 pl-xl-5'} style={{ position: 'relative' }}>
                            <div className={insurance === 'medic' ? 'card-body p-3' : 'card-body pt-3 pb-3 pr-3 pl-3 pr-lg-5 pl-lg-5'}>
                                {insurance === 'fire' &&
                                    <FireInsuranceOptions formInputs={formInputs}
                                                          propertyType={propertyType}
                                                          toggleAdditionalOptions={this.toggleAdditionalOptions}
                                                          handleSelectChange={this.handleSelectChange}
                                                          handleInputChange={this.handleInputChange}
                                                          applyInputChange={this.applyInputChange}
                                                          handleOptionButton={this.handleOptionButton}
                                                          formatAsMoney={this.formatAsMoney}
                                    />
                                }
                                {insurance === 'earthquake' &&
                                    <EarthquakeInsuranceOptions formInputs={formInputs}
                                                                propertyType={propertyType}
                                                                handleSelectChange={this.handleSelectChange}
                                                                handleInputChange={this.handleInputChange}
                                                                applyInputChange={this.applyInputChange}
                                                                formatAsMoney={this.formatAsMoney}
                                    />
                                }
                                {insurance === 'thirdparty' &&
                                    <ThirdpartyInsuranceOptions cars={cars}
                                                                carModels={carModels}
                                                                carManufactureYears={carManufactureYears}
                                                                damageQtys={damageQtys}
                                                                discountPercents={discountPercents}
                                                                formInputs={formInputs}
                                                                insuranceCompanies={insuranceCompanies}
                                                                yesNoQuestion={yesNoQuestion}
                                                                toggleThirdpartyAdditionalOptions={this.toggleThirdpartyAdditionalOptions}
                                                                applyInputChange={this.applyInputChange}
                                                                handleSelectChange={this.handleSelectChange}
                                                                handlePrevInsDateChange={this.handlePrevInsDateChange}
                                                                openCalendar={this.openCalendar}
                                    />
                                }
                                {insurance === 'body' &&
                                    <BodyInsuranceOptions cars={cars}
                                                          carModels={carModels}
                                                          carManufactureYears={carManufactureYears}
                                                          discountYears={discountYears}
                                                          formInputs={formInputs}
                                                          toggleAdditionalOptions={this.toggleAdditionalOptions}
                                                          handleSelectChange={this.handleSelectChange}
                                                          handleInputChange={this.handleInputChange}
                                                          handleCheckboxChange={this.handleCheckboxChange}
                                                          applyInputChange={this.applyInputChange}
                                                          handleOptionButton={this.handleOptionButton}
                                                          formatAsMoney={this.formatAsMoney}
                                    />
                                }
                                {insurance === 'travel' &&
                                    <TravelInsuranceOptions formInputs={formInputs}
                                                            travelPlan={travelPlan}
                                                            travelDuration={travelDuration}
                                                            handleSelectChange={this.handleSelectChange}
                                                            handleInputChange={this.handleInputChange}
                                                            handleCountChange={this.handleCountChange}
                                                            applyInputChange={this.applyInputChange}
                                    />
                                }
                                {insurance === 'medic' &&
                                    <MedicInsuranceOptions formInputs={formInputs}
                                                           discountMedicYears={discountMedicYears}
                                                           medicOrParamedic={medicOrParamedic}
                                                           residencyStatus={residencyStatus}
                                                           studentStatus={studentStatus}
                                                           specialties={specialties}
                                                           handleSelectChange={this.handleSelectChange}
                                                           handleCheckboxChange={this.handleCheckboxChange}
                                    />
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className={(insurance === 'body' || insurance === 'travel' || insurance === 'medic') ? 'col-12 col-sm-9 pl-3 pl-sm-2 mb-5' : 'col-9 pl-2 mb-5'}>
                                <InsurancePurchaseTable additionalOptionsPersian={additionalOptionsPersian}
                                                        disabledOrderBtn={disabledOrderBtn}
                                                        formInputs={formInputs}
                                                        insurance={insurance}
                                                        insurancePersian={insurancePersian}
                                                        finalPrice={finalPrice}
                                                        loggedIn={this.global.loggedIn}
                                                        formatAsMoneyJustValue={this.formatAsMoneyJustValue}
                                                        incrementStep={this.incrementStep}
                                />
                            </div>
                            <div className="col-3 pr-2">
                                <DiscountBox formInputs={formInputs} handleInputChange={this.handleInputChange} applyInputChange={this.applyInputChange} />
                                {/* Range Slider */}
                                {(insurance !== 'body' && insurance !== 'travel' && insurance !== 'medic') &&
                                    <div className="card shadow border-0 mb-3">
                                        <div className="card-body p-1 p-sm-3 ltr d-overflow-hidden text-center range-slider-wrapper" style={{ height: 600 }}>
                                            {(insurance === 'fire' || insurance === 'earthquake') &&
                                                <div style={{ height: 400 }} className="pb-3">
                                                    <p className="text-center font-size-12 mb-4 pb-2">هزینه ساخت هر متر مربع بنا (میلیون تومان)</p>
                                                    <Slider min={0}
                                                            max={5000000}
                                                            marks={buildingCostPerMeterLabels}
                                                            name="building_cost_per_meter"
                                                            onChange={this.handleSliderChange}
                                                            step={null}
                                                            value={formInputs.building_cost_per_meter}
                                                            vertical={true}
                                                    />
                                                </div>
                                            }
                                            {insurance === 'thirdparty' &&
                                                <div style={{ height: 500 }} className="pb-3">
                                                    <p className="text-center font-size-12 mb-4 pb-2">سقف جبران خسارت های مالی در هر حادثه (میلیون تومان)</p>
                                                    <Slider min={0}
                                                            max={180000000}
                                                            marks={financialCommitmentLevelLabels}
                                                            name="financial_commitment_level"
                                                            onChange={this.handleSliderChange}
                                                            step={null}
                                                            value={formInputs.financial_commitment_level}
                                                            vertical={true}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                {step === 2 &&
                    <div className="ins-purchase-step-wrapper">
                        {calculationLoading &&
                            <div className="ins-purchase-step-overlay">
                                <i className="fa fa-spinner fa-spin"></i>
                            </div>
                        }
                        <div className="card shadow border-0 mb-3">
                            <div className="card-body p-3 p-md-4">
                                <div className="alert alert-info text-center p-2">
                                    مشخصات بیمه گذار
                                </div>
                                <UserDetailForm birthday_days={birthday_days}
                                                calculationLoading={calculationLoading}
                                                cities={cities}
                                                humanReadableBirthday={humanReadableBirthday}
                                                provinces={provinces}
                                                user={user}
                                                handleProvinceChange={this.handleProvinceChange}
                                                handleUserInputChange={this.handleUserInputChange}
                                />
                                {(insurance === 'fire' || insurance === 'earthquake') &&
                                    <Fragment>
                                        <div className="alert alert-info text-center p-2">
                                            مشخصات ساختمان
                                        </div>
                                        <BuildingDetailForm cities={buildingCities}
                                                            formInputs={formInputs}
                                                            provinces={provinces}
                                                            handleInputChange={this.handleInputChange}
                                                            handleSelectChange={this.handleSelectChange}
                                        />
                                    </Fragment>
                                }
                                <div className="text-left dashboard-info-box">
                                    <button onClick={this.handleUpdateUserInfo} className="btn btn-info">تایید و ادامه</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {step === 3 &&
                    <div className="ins-purchase-step-wrapper">
                        {calculationLoading &&
                            <div className="ins-purchase-step-overlay">
                                <i className="fa fa-spinner fa-spin"></i>
                            </div>
                        }
                        <div className="card shadow border-0 mb-3">
                            <div className="card-body p-3 p-md-4">
                                <div className="alert alert-info text-center p-2">
                                    مشخصات تحویل گیرنده
                                </div>
                                <ReceiverDetailForm cities={receiverCities}
                                                    provinces={provinces}
                                                    receiverInfo={receiverInfo}
                                                    user={user}
                                                    handleSelectChange={this.handleSelectChange}
                                                    handleReceiverInputChange={this.handleReceiverInputChange}
                                />
                                <div className="text-left dashboard-info-box">
                                    <button onClick={this.handleSubmitOrder} className="btn btn-info">ثبت سفارش</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {step === 4 &&
                    <div className="ins-purchase-step-wrapper">
                        {calculationLoading &&
                            <div className="ins-purchase-step-overlay">
                                <i className="fa fa-spinner fa-spin"></i>
                            </div>
                        }
                        <PaymentBill disabledFinalPaymentButton={disabledFinalPaymentButton}
                                     finalPrice={finalPrice}
                                     formInputs={formInputs}
                                     humanReadableBirthday={humanReadableBirthday}
                                     insurance={insurance}
                                     insurancePersian={insurancePersian}
                                     user={user}
                                     handleOptionButton={this.handleOptionButton}
                                     formatAsMoneyJustValue={this.formatAsMoneyJustValue}
                                     handleSubmitPayment={this.handleSubmitPayment}
                        />
                    </div>
                }
            </div>
        )
    }
}
