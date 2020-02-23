import React, {Component} from 'reactn'
import ax from 'axios'
import {englishNum} from '../../helper/GeneralHelper'
import Slideshow from './partials/Slideshow'
// import Reminder from './Reminder'
import About from './partials/About'
import FeatureBoxes from './partials/FeatureBoxes'
import InsuranceSelectionButton from './partials/InsuranceSelectionButton'
import FireInsuranceSelected from './selected-insurance/FireInsuranceSelected'
import EarthquakeInsuranceSelected from './selected-insurance/EarthquakeInsuranceSelected'
import ThirdpartyInsuranceSelected from './selected-insurance/ThirdpartyInsuranceSelected'
import BodyInsuranceSelected from './selected-insurance/BodyInsuranceSelected'
import LifeInsuranceSelected from './selected-insurance/LifeInsuranceSelected'
import MedicInsuranceSelected from './selected-insurance/MedicInsuranceSelected'
import TreatmentInsuranceSelected from './selected-insurance/TreatmentInsuranceSelected'
import TravelInsuranceSelected from './selected-insurance/TravelInsuranceSelected'
import logo from '../../../images/logo.png'

const months = [
    {label: 'فروردین', value: 1},
    {label: 'اردیبهشت', value: 2},
    {label: 'خرداد', value: 3},
    {label: 'تیر', value: 4},
    {label: 'مرداد', value: 5},
    {label: 'شهریور', value: 6},
    {label: 'مهر', value: 7},
    {label: 'آبان', value: 8},
    {label: 'آذر', value: 9},
    {label: 'دی', value: 10},
    {label: 'بهمن', value: 11},
    {label: 'اسفند', value: 12},
]

const days = []
for (let i = 1; i <= 31; i++) {
    days.push({label: i, value: i})
}

const years = []
for (let j = 1398; j >= 1300; j--) {
    years.push({label: j, value: j})
}

const lifeInsDuration = []
for (let k = 5; k <= 30; k++) {
    lifeInsDuration.push({label: k + ' سال', value: k})
}

export default class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            birthday_days: days,
            birthday_months: [],
            birthday_years: [],
            cars: [],
            carManufactureYears: [],
            carModels: [],
            currentYear: '',
            damageQtys: [
                {label: 'فاقد خسارت', value: '0'},
                {label: 'یک بار خسارت', value: '1'},
                {label: 'دو بار خسارت', value: '2'},
                {label: 'سه بار خسارت یا بیشتر', value: '3'},
            ],
            disabledBtn: true,
            discountPercents: [
                {label: 'صفر درصد', value: '0'},
                {label: '5 درصد', value: '5'},
                {label: '10 درصد', value: '10'},
                {label: '15 درصد', value: '15'},
                {label: '20 درصد', value: '20'},
                {label: '25 درصد', value: '25'},
                {label: '30 درصد', value: '30'},
                {label: '35 درصد', value: '35'},
                {label: '40 درصد', value: '40'},
                {label: '45 درصد', value: '45'},
                {label: '50 درصد', value: '50'},
                {label: '55 درصد', value: '55'},
                {label: '60 درصد', value: '60'},
                {label: '65 درصد', value: '65'},
                {label: '70 درصد', value: '65'},
            ],
            discountYears: [
                {label: 'با خسارت', value: '0'},
                {label: 'یک سال', value: '1'},
                {label: 'دو سال', value: '2'},
                {label: 'سه سال', value: '3'},
                {label: 'چهار سال و بیشتر', value: '4'},
            ],
            discountMedicYears: [
                {label: 'با خسارت', value: '0'},
                // { label: 'صدور اولیه', value: '10' },
                {label: 'یک سال', value: '1'},
                {label: 'دو سال', value: '2'},
                {label: 'سه سال', value: '3'},
                {label: 'چهار سال و بیشتر', value: '4'},
            ],
            formInputs: {
                affordability: '',
                area: '',
                beautySurgeryOption: '0',
                building_address: '',
                building_age: '',
                building_cost_per_meter: 1000000,
                building_level: '',
                building_level_qty: '',
                building_postal_code: '',
                building_unit: '',
                customer_discount_code: '',
                financial_commitment_level: 9000000,
                furniture_value: '',
                hasPrevBodyIns: '0',
                passengers_qty: '',
                payment_gateway: '',
                personel_qty: '',
                personel_61_to_70_qty: '',
                personel_71_to_80_qty: '',
                prevInsStartDate: '',
                prevInsFinishDate: '',
                vehicle_accessories_value: '',
                vehicle_value: '',
                zero_to_12_age: 0,
                thirteen_to_65_age: 0,
                sixtySix_to_70_age: 0,
                seventyOne_to_75_age: 0,
                seventySix_to_80_age: 0,
                eightyOne_to_85_age: 0,
            },
            franchiseePercents: [
                {label: '10 درصد', value: '10'},
                {label: '20 درصد', value: '20'},
                {label: '30 درصد', value: '30'},
            ],
            insurance: '',
            insuranceCompanies: [
                // { label: 'صفر کیلومتر', value: 'new' },
                // { label: 'فاقد بیمه', value: 'without' },
                {label: 'ایران', value: 'iran'},
                {label: 'البرز', value: 'alborz'},
                {label: 'آرمان', value: 'arman'},
                {label: 'آسیا', value: 'asia'},
                {label: 'سینا', value: 'sina'},
                {label: 'دانا', value: 'dana'},
                {label: 'دی', value: 'dey'},
                {label: 'کارآفرین', value: 'kar_afarin'},
                {label: 'کوثر', value: 'kousar'},
                {label: 'ما', value: 'ma'},
                {label: 'میهن', value: 'mihan'},
                {label: 'ملت', value: 'mellat'},
                {label: 'معلم', value: 'moalem'},
                {label: 'پاسارگاد', value: 'pasargad'},
                {label: 'پارسیان', value: 'parsian'},
                {label: 'تجارت نو', value: 'tejarat_no'},
                {label: 'تعاون', value: 'taavon'},
                {label: 'رازی', value: 'razi'},
                {label: 'سامان', value: 'saman'},
                {label: 'سرمد', value: 'sarmad'},
                {label: 'نوین', value: 'novin'},
                {label: 'حکمت', value: 'hekmat'},
                {label: 'آسماری', value: 'asmari'},
                {label: 'سامان حامی', value: 'saman_hami'},
                {label: 'آتیه سازان حافظ', value: 'atie_sazan_hafez'},
            ],
            life_ins_duration: lifeInsDuration,
            loading: true,
            payment_method: [
                {label: 'سه ماهه', value: '3'},
                {label: 'شش ماهه', value: '6'},
                {label: 'سالانه', value: '12'},
            ],
            propertyType: [
                {label: 'یک واحد در آپارتمان', value: 'apartment_single'},
                {label: 'یک ساختمان ویلایی', value: 'villa'},
                {label: 'آپارتمان یا مجتمع', value: 'apartment_whole'}
            ],
            specialties: [],
            step: 0,
            travelPlan: [
                {label: 'کشور های حوزه خلیج فارس', value: 1},
                {label: 'ترکیه، خاورمیانه و آفریقا', value: 2},
                {label: 'کشور های اروپایی عضو شنگن', value: 3},
                {label: 'کلیه کشور های جهان (به جز امریکا، کانادا و ژاپن)', value: 4},
                {label: 'سراسر جهان', value: 5},
            ],
            travelDuration: [
                {label: '1 تا 7 روز', value: 'one_seven'},
                {label: '8 تا 15 روز', value: 'eight_fifteen'},
                {label: '16 تا 23 روز', value: 'sixteen_twentythree'},
                {label: '24 تا 31 روز', value: 'twentyfour_thirtyone'},
                {label: '32 تا 45 روز', value: 'thirtytwo_fortyfive'},
                {label: '46 تا 62 روز', value: 'fortysix_sixtytwo'},
                {label: '63 تا 92 روز', value: 'sixtythree_nintytwo'},
                {label: '6 ماه', value: 'six_month'},
                {label: '1 سال', value: 'one_year'},
            ],
            yesNoQuestion: [
                {label: 'بله', value: 1},
                {label: 'خیر', value: 0},
            ],
        }

        this.handleInsuranceSelect = this.handleInsuranceSelect.bind(this)
        this.decrementStep = this.decrementStep.bind(this)
        this.incrementStep = this.incrementStep.bind(this)
        this.doubleIncrementStep = this.doubleIncrementStep.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleCountChange = this.handleCountChange.bind(this)
        this.handlePrevInsDateChange = this.handlePrevInsDateChange.bind(this)
        this.handleStorePrevInsDates = this.handleStorePrevInsDates.bind(this)
        this.formatAsMoney = this.formatAsMoney.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.openCalendar = this.openCalendar.bind(this)
        this.handleRadioButton = this.handleRadioButton.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        ax.get('/api/cars')
            .then(response => {
                const cars = response.data.cars

                cars.map(car => {
                    car.value = car.id
                    delete car.id
                    car.label = car.name
                    delete car.name
                })

                this.setState({cars: cars, currentYear: response.data.current_year, loading: false})
            }).catch(reason => {
            // console.log(reason.response)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.step === 1 && this.state.step === 0) {
            this.setState({
                birthday_months: [],
                birthday_years: [],
                carManufactureYears: [],
                carModels: [],
                disabledBtn: true,
                formInputs: {
                    affordability: '',
                    area: '',
                    beautySurgeryOption: '0',
                    building_address: '',
                    building_age: '',
                    building_cost_per_meter: 1000000,
                    building_level: '',
                    building_level_qty: '',
                    building_postal_code: '',
                    building_unit: '',
                    customer_discount_code: '',
                    financial_commitment_level: 9000000,
                    furniture_value: '',
                    hasPrevBodyIns: '0',
                    passengers_qty: '',
                    payment_gateway: '',
                    personel_qty: '',
                    personel_61_to_70_qty: '',
                    personel_71_to_80_qty: '',
                    prevInsStartDate: '',
                    prevInsFinishDate: '',
                    vehicle_accessories_value: '',
                    vehicle_value: '',
                    zero_to_12_age: 0,
                    thirteen_to_65_age: 0,
                    sixtySix_to_70_age: 0,
                    seventyOne_to_75_age: 0,
                    seventySix_to_80_age: 0,
                    eightyOne_to_85_age: 0,
                },
                insurance: '',
            })
        }

        if (this.state.insurance === 'thirdparty' && prevState.step === 2 && this.state.step === 1) {
            this.setState({
                carManufactureYears: [],
                carModels: [],
            })
        }

        if (this.state.insurance === 'body' && prevState.step === 4 && this.state.step === 3 && !this.state.formInputs.prev_body_discount) {
            this.setState({step: 2})
        }
    }

    formatAsMoney(e) {
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

    handleInsuranceSelect(e) {
        const insurance = e.currentTarget.dataset.insurance;

        this.setState({
            insurance: insurance,
            step: 1
        })
    }

    decrementStep() {
        this.setState(prevState => {
            return {disabledBtn: true, step: prevState.step - 1}
        })
    }

    incrementStep() {
        this.setState(prevState => {
            return {disabledBtn: true, step: prevState.step + 1}
        })
    }

    doubleIncrementStep() {
        this.setState(prevState => {
            return {disabledBtn: true, step: prevState.step + 2}
        })
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

    handleSelectChange(name, optionSelected) {
        if (name === 'car_brand') {
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
                            formInputs: {...prevState.formInputs, [name]: optionSelected}
                        }
                    })
                }).catch(reason => {
                // console.log(reason.response)
            })

            return
        }

        if (name === 'car_model') {
            const car = this.state.carModels.filter(model => {
                return optionSelected.value === model.value
            })

            const specificModel = car[0]
            const manufactureYears = []

            const floorYear = (specificModel.from_year < 1600) ? specificModel.from_year : 1350

            for (let startYear = this.state.currentYear; startYear >= floorYear; startYear--) {
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

            return
        }

        if (name === 'birthday_day') {
            this.setState(prevState => {
                return {
                    birthday_months: months,
                    formInputs: {...prevState.formInputs, [name]: optionSelected}
                }
            })

            return
        }

        if (name === 'birthday_month') {
            this.setState(prevState => {
                return {
                    birthday_years: years,
                    formInputs: {...prevState.formInputs, [name]: optionSelected}
                }
            })

            return
        }

        if (name === 'prev_ins_company') {
            this.setState(prevState => {
                return {formInputs: {...prevState.formInputs, [name]: optionSelected}}
            }, () => {
                if (optionSelected.value === 'new' || optionSelected.value === 'without') {
                    this.handleSubmitForm()
                } else {
                    this.incrementStep()
                }
            })

            return
        }

        if (name === 'prev_thirdparty_discount' || name === 'prev_driver_discount') {
            this.setState(prevState => {
                return {formInputs: {...prevState.formInputs, [name]: optionSelected}}
            }, () => {
                if (this.state.formInputs.prev_thirdparty_discount && this.state.formInputs.prev_driver_discount && this.state.formInputs.charge_prev_ins) {
                    if (this.state.formInputs.charge_prev_ins.value) {
                        this.incrementStep()
                    } else {
                        this.handleSubmitForm()
                    }
                }
            })

            return
        }

        if (name === 'property_damage_qty' || name === 'life_damage_qty' || name === 'driver_damage_qty') {
            this.setState(prevState => {
                return {formInputs: {...prevState.formInputs, [name]: optionSelected}}
            }, () => {
                if (this.state.formInputs.property_damage_qty && this.state.formInputs.life_damage_qty && this.state.formInputs.driver_damage_qty) {
                    this.handleSubmitForm()
                }
            })

            return
        }

        if (name === 'charge_prev_ins') {
            if (this.state.formInputs.prev_thirdparty_discount && this.state.formInputs.prev_driver_discount) {
                if (optionSelected.value) {
                    this.setState(prevState => {
                        return {
                            step: prevState.step + 1,
                            formInputs: {...prevState.formInputs, [name]: optionSelected}
                        }
                    })

                    return
                } else {
                    this.setState(prevState => {
                        return {formInputs: {...prevState.formInputs, [name]: optionSelected}}
                    }, () => {
                        this.handleSubmitForm()
                    })

                    return
                }
            } else {
                this.setState(prevState => {
                    return {formInputs: {...prevState.formInputs, [name]: optionSelected}}
                })

                return
            }
        }

        if (name === 'prev_body_discount') {
            this.setState(prevState => {
                return {formInputs: {...prevState.formInputs, hasPrevBodyIns: '1'}}
            })
        }

        if (name === 'prev_medic_ins_discount' || name === 'treatment_franchisee') {
            this.setState(prevState => {
                return {formInputs: {...prevState.formInputs, [name]: optionSelected}, disabledBtn: false}
            })

            return
        }

        this.setState(prevState => {
            return {formInputs: {...prevState.formInputs, [name]: optionSelected}}
        })

        this.incrementStep()
    }

    handleInputChange(e) {
        const name = e.target.name
        const value = englishNum(e.target.value.split(',').join(''))

        if (name === 'passengers_qty' || name === 'prev_ins_start_date' || name === 'prev_ins_finish_date') return

        if (value !== '') {
            this.setState(prevState => {
                return {
                    formInputs: {...prevState.formInputs, [name]: value},
                    disabledBtn: false
                }
            }, () => {
                if (name === 'personel_qty' && this.state.formInputs.personel_qty < 50) {
                    this.setState({disabledBtn: true})
                }

                if (name === 'affordability' && this.state.formInputs.affordability < 50000) {
                    this.setState({disabledBtn: true})
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    formInputs: {...prevState.formInputs, [name]: value},
                    disabledBtn: true
                }
            })
        }
    }

    handleRadioButton(e) {
        const name = e.currentTarget.dataset.name
        const value = e.currentTarget.dataset.value

        if (name === 'medicOrParamedic') {
            ax.get(`/api/medic/${value}/specialties`)
                .then(response => {
                    const specialties = response.data.specialties

                    specialties.map(specialty => {
                        specialty.value = specialty.id
                        delete specialty.id
                        specialty.label = specialty.name
                        delete specialty.name
                    })

                    this.setState(prevState => {
                        const option = value === '1' ? {label: 'پزشک', value: '1'} : {label: 'پیراپزشک', value: '2'}
                        return {
                            specialties: specialties,
                            formInputs: {...prevState.formInputs, [name]: option}
                        }
                    })
                }).catch(reason => {
                // console.log(reason.response)
            })

            this.incrementStep()

            return
        }

        if (name === 'isResident') {
            this.setState(prevState => {
                const option = value === '1' ? {label: 'رزیدنت هستم', value: '1'} : {label: 'رزیدنت نیستم', value: '0'}
                return {
                    formInputs: {...prevState.formInputs, [name]: option}
                }
            });

            this.incrementStep();

            return
        }

        if (name === 'isStudent') {
            this.setState(prevState => {
                const option = value === '1' ? {label: 'دانشجو هستم', value: '1'} : {label: 'دانشجو نیستم', value: '0'}
                return {
                    formInputs: {...prevState.formInputs, [name]: option}
                }
            })

            this.incrementStep()

            return
        }

        this.setState(prevState => {
            return {formInputs: {...prevState.formInputs, [name]: value}}
        })

        if (name === 'travel_dest' && value === '1') {
            this.doubleIncrementStep()
            return
        }

        this.incrementStep()
    }

    handleCountChange(count, name) {
        this.setState(prevState => {
            return {formInputs: {...prevState.formInputs, [name]: count}}
        }, () => {
            const passengersQty = this.state.formInputs.zero_to_12_age + this.state.formInputs.thirteen_to_65_age +
                this.state.formInputs.sixtySix_to_70_age + this.state.formInputs.seventyOne_to_75_age +
                this.state.formInputs.seventySix_to_80_age + this.state.formInputs.eightyOne_to_85_age

            this.setState(prevState => {
                return {formInputs: {...prevState.formInputs, passengers_qty: passengersQty}}
            })
        })
    }

    handlePrevInsDateChange(e) {
        if (e.target.name === 'prev_ins_start_date') {
            if ($('#prev_ins_finish_date').val() !== '') {
                this.setState({disabledBtn: false})
            }
        }

        if (e.target.name === 'prev_ins_finish_date') {
            if ($('#prev_ins_start_date').val() !== '') {
                this.setState({disabledBtn: false})
            }
        }
    }

    handleStorePrevInsDates() {
        const prevInsStartDate = $('#prev_ins_start_date').val()
        const prevInsFinishDate = $('#prev_ins_finish_date').val()

        this.setState(prevState => {
            return {
                formInputs: {
                    ...prevState.formInputs,
                    prevInsStartDate: prevInsStartDate,
                    prevInsFinishDate: prevInsFinishDate,
                },
                disabledBtn: true
            }
        })

        this.incrementStep()
    }

    handleSubmitForm() {
        this.props.history.push({
            pathname: `/${this.state.insurance}/compare`,
            state: this.state
        })
    }

    render() {
        const {
            cars, carModels, carManufactureYears, damageQtys, disabledBtn,
            discountMedicYears, discountPercents, discountYears, formInputs,
            franchiseePercents, insurance, insuranceCompanies, propertyType,
            specialties, step, travelPlan, travelDuration, yesNoQuestion,
            birthday_days, birthday_months, birthday_years, payment_method,
            life_ins_duration
        } = this.state

        return (
            <div className="container-fluid">
                {this.state.loading &&
                <div className="sooroosh-overlay">
                    <img src={logo} alt="Logo"/>
                </div>
                }
                <header className="header">
                    <Slideshow/>
                    <section className="insurance-selection-box p-3 p-md-4 pb-0">
                        {step === 0 &&
                        <div className="insurance-selection-btns mj-rightslide text-center">
                            <div className="row align-row">
                                <InsuranceSelectionButton insurance={'fire'} persianTitle={'بیمه آتش سوزی'}
                                                          handleInsuranceSelect={this.handleInsuranceSelect}/>
                                <InsuranceSelectionButton insurance={'body'} persianTitle={'بیمه بدنه'}
                                                          handleInsuranceSelect={this.handleInsuranceSelect}/>
                                <InsuranceSelectionButton insurance={'earthquake'} persianTitle={'بیمه زلزله'}
                                                          handleInsuranceSelect={this.handleInsuranceSelect}/>
                                <InsuranceSelectionButton insurance={'life'} persianTitle={'بیمه عمر'}
                                                          handleInsuranceSelect={this.handleInsuranceSelect}/>
                                <InsuranceSelectionButton insurance={'medic'} persianTitle={'مسئولیت پزشکان'}
                                                          handleInsuranceSelect={this.handleInsuranceSelect}/>
                                <InsuranceSelectionButton insurance={'treatment'} persianTitle={'درمان تکمیلی'}
                                                          handleInsuranceSelect={this.handleInsuranceSelect}/>
                                <InsuranceSelectionButton insurance={'thirdparty'} persianTitle={'بیمه شخص ثالث'}
                                                          handleInsuranceSelect={this.handleInsuranceSelect}/>
                                <InsuranceSelectionButton insurance={'travel'} persianTitle={'بیمه مسافرتی'}
                                                          handleInsuranceSelect={this.handleInsuranceSelect}/>
                            </div>
                        </div>
                        }
                        {step !== 0 && insurance === 'fire' &&
                        <FireInsuranceSelected disabledBtn={disabledBtn}
                                               formInputs={formInputs}
                                               propertyType={propertyType}
                                               step={step}
                                               decrementStep={this.decrementStep}
                                               incrementStep={this.incrementStep}
                                               handleSelectChange={this.handleSelectChange}
                                               handleInputChange={this.handleInputChange}
                                               formatAsMoney={this.formatAsMoney}
                                               handleSubmitForm={this.handleSubmitForm}
                        />
                        }
                        {step !== 0 && insurance === 'earthquake' &&
                        <EarthquakeInsuranceSelected disabledBtn={disabledBtn}
                                                     formInputs={formInputs}
                                                     propertyType={propertyType}
                                                     step={step}
                                                     decrementStep={this.decrementStep}
                                                     incrementStep={this.incrementStep}
                                                     handleSelectChange={this.handleSelectChange}
                                                     handleInputChange={this.handleInputChange}
                                                     formatAsMoney={this.formatAsMoney}
                                                     handleSubmitForm={this.handleSubmitForm}
                        />
                        }
                        {step !== 0 && insurance === 'thirdparty' &&
                        <ThirdpartyInsuranceSelected disabledBtn={disabledBtn}
                                                     cars={cars}
                                                     carModels={carModels}
                                                     carManufactureYears={carManufactureYears}
                                                     damageQtys={damageQtys}
                                                     discountPercents={discountPercents}
                                                     formInputs={formInputs}
                                                     insuranceCompanies={insuranceCompanies}
                                                     step={step}
                                                     yesNoQuestion={yesNoQuestion}
                                                     decrementStep={this.decrementStep}
                                                     incrementStep={this.incrementStep}
                                                     handleSelectChange={this.handleSelectChange}
                                                     handlePrevInsDateChange={this.handlePrevInsDateChange}
                                                     handleStorePrevInsDates={this.handleStorePrevInsDates}
                                                     handleSubmitForm={this.handleSubmitForm}
                                                     openCalendar={this.openCalendar}
                        />
                        }
                        {step !== 0 && insurance === 'body' &&
                        <BodyInsuranceSelected disabledBtn={disabledBtn}
                                               cars={cars}
                                               carModels={carModels}
                                               carManufactureYears={carManufactureYears}
                                               discountYears={discountYears}
                                               formInputs={formInputs}
                                               step={step}
                                               decrementStep={this.decrementStep}
                                               incrementStep={this.incrementStep}
                                               doubleIncrementStep={this.doubleIncrementStep}
                                               handleSelectChange={this.handleSelectChange}
                                               handleRadioButton={this.handleRadioButton}
                                               handleInputChange={this.handleInputChange}
                                               formatAsMoney={this.formatAsMoney}
                                               handleSubmitForm={this.handleSubmitForm}
                        />
                        }
                        {step !== 0 && insurance === 'life' &&
                        <LifeInsuranceSelected disabledBtn={disabledBtn}
                                               birthday_days={birthday_days}
                                               birthday_months={birthday_months}
                                               birthday_years={birthday_years}
                                               formInputs={formInputs}
                                               life_ins_duration={life_ins_duration}
                                               payment_method={payment_method}
                                               step={step}
                                               decrementStep={this.decrementStep}
                                               incrementStep={this.incrementStep}
                                               handleSelectChange={this.handleSelectChange}
                                               handleInputChange={this.handleInputChange}
                                               formatAsMoney={this.formatAsMoney}
                                               handleSubmitForm={this.handleSubmitForm}
                        />
                        }
                        {step !== 0 && insurance === 'medic' &&
                        <MedicInsuranceSelected disabledBtn={disabledBtn}
                                                discountMedicYears={discountMedicYears}
                                                formInputs={formInputs}
                                                specialties={specialties}
                                                step={step}
                                                decrementStep={this.decrementStep}
                                                incrementStep={this.incrementStep}
                                                handleSelectChange={this.handleSelectChange}
                                                handleRadioButton={this.handleRadioButton}
                                                handleSubmitForm={this.handleSubmitForm}
                        />
                        }
                        {step !== 0 && insurance === 'treatment' &&
                        <TreatmentInsuranceSelected disabledBtn={disabledBtn}
                                                    formInputs={formInputs}
                                                    franchiseePercents={franchiseePercents}
                                                    step={step}
                                                    decrementStep={this.decrementStep}
                                                    incrementStep={this.incrementStep}
                                                    handleSelectChange={this.handleSelectChange}
                                                    handleInputChange={this.handleInputChange}
                                                    handleSubmitForm={this.handleSubmitForm}
                        />
                        }
                        {step !== 0 && insurance === 'travel' &&
                        <TravelInsuranceSelected disabledBtn={disabledBtn}
                                                 formInputs={formInputs}
                                                 step={step}
                                                 travelPlan={travelPlan}
                                                 travelDuration={travelDuration}
                                                 decrementStep={this.decrementStep}
                                                 incrementStep={this.incrementStep}
                                                 doubleIncrementStep={this.doubleIncrementStep}
                                                 handleSelectChange={this.handleSelectChange}
                                                 handleRadioButton={this.handleRadioButton}
                                                 handleInputChange={this.handleInputChange}
                                                 handleCountChange={this.handleCountChange}
                                                 handleSubmitForm={this.handleSubmitForm}
                        />
                        }
                    </section>
                </header>
                <About/>
                {/*<Reminder />*/}
                <FeatureBoxes/>
            </div>
        )
    }
}
