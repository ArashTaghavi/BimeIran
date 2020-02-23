import React, { Fragment } from 'react'
import mellat_logo from '../../../../images/mellat_logo.png'
import saman_logo from '../../../../images/saman_logo.png'

const PaymentBill = ({ disabledFinalPaymentButton, finalPrice, formInputs, humanReadableBirthday, insurance, insurancePersian, user, formatAsMoneyJustValue, handleOptionButton, handleSubmitPayment }) =>
{
    return (
        <div className="card shadow border-0 mb-3">
            <div className="card-body p-3 p-md-4">
                <div className="dashboard-info-box-450 personal-info-form">
                    <h4 className="text-center mb-2"><i className="fa fa-credit-card ml-2"></i>فاکتور پرداخت</h4>
                    <div className="alert alert-info mb-0 text-center p-2">
                        <i className="fa fa-shopping-cart ml-1" style={{ fontSize: '18px', position: 'relative', top: '2px' }}></i>
                        مشخصات خرید
                    </div>
                    <div className="row font-size-13 no-gutters p-2 border-bottom">
                        <div className="col-7">
                            نام و نام خانوادگی بیمه گذار
                        </div>
                        <div className="col-5 text-left">
                            {user.fname + ' ' + user.lname}
                        </div>
                    </div>
                    <div className="row font-size-13 no-gutters p-2 border-bottom">
                        <div className="col-6">
                            کد ملی بیمه گذار
                        </div>
                        <div className="col-6 text-left">
                            {user.national_code}
                        </div>
                    </div>
                    <div className="row font-size-13 no-gutters p-2 border-bottom">
                        <div className="col-6">
                            تاریخ تولد بیمه گذار
                        </div>
                        <div className="col-6 text-left">
                            {humanReadableBirthday}
                        </div>
                    </div>
                    <div className="row font-size-13 no-gutters p-2 border-bottom">
                        <div className="col-6">
                            نوع بیمه
                        </div>
                        <div className="col-6 text-left">
                            {insurancePersian}
                        </div>
                    </div>
                    {(insurance === 'fire' || insurance === 'earthquake') &&
                        <Fragment>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-7">
                                    نوع ملک
                                </div>
                                <div className="col-5 text-left">
                                    {formInputs.property_type.label}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    متراژ مورد بیمه
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.area} متر
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    هزینه ساخت بنا
                                </div>
                                <div className="col-6 text-left">
                                    {formatAsMoneyJustValue(formInputs.building_cost_per_meter * formInputs.area)} تومان
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-7">
                                    ارزش لوازم خانه
                                </div>
                                <div className="col-5 text-left">
                                    {formatAsMoneyJustValue(formInputs.furniture_value)} تومان
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    سن ساختمان
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.building_age} سال
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    تعداد طبقات
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.building_level_qty}
                                </div>
                            </div>
                        </Fragment>
                    }
                    {insurance === 'thirdparty' &&
                        <Fragment>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    نوع وسیله نقلیه
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.car_brand.label}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    مدل خودرو
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.car_model.label}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2">
                                <div className="col-6">
                                    سال ساخت
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.manufacture_year.label}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-7">
                                    تاریخ اتمام بیمه نامه قبلی
                                </div>
                                <div className="col-5 text-left">
                                    {formInputs.prevInsFinishDate}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-7">
                                    درصد تخفیف بیمه نامه قبلی
                                </div>
                                <div className="col-5 text-left">
                                    {formInputs.prev_thirdparty_discount.value} درصد
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-7">
                                    درصد تخفیف حوادث راننده
                                </div>
                                <div className="col-5 text-left">
                                    {formInputs.prev_driver_discount.value} درصد
                                </div>
                            </div>
                        </Fragment>
                    }
                    {insurance === 'body' &&
                        <Fragment>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    نوع وسیله نقلیه
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.car_brand.label}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    مدل خودرو
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.car_model.label}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2">
                                <div className="col-6">
                                    سال ساخت
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.manufacture_year.label}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    ارزش خودرو
                                </div>
                                <div className="col-6 text-left">
                                    {formatAsMoneyJustValue(formInputs.vehicle_value)} تومان
                                </div>
                            </div>
                        </Fragment>
                    }
                    {insurance === 'travel' &&
                        <Fragment>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-4">
                                    طرح مسافرتی
                                </div>
                                <div className="col-8 text-left">
                                    {formInputs.travel_plan.label}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    مدت سفر
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.travel_duration.label}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    تعداد مسافران
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.passengers_qty} نفر
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2">
                                <div className="col-6">
                                    سطح پوشش
                                </div>
                                <div className="col-6 text-left">
                                    {(formInputs.travel_plan.value === 1 || formInputs.travel_plan.value === 2) &&
                                        <span>10 هزار یورو</span>
                                    }
                                    {formInputs.travel_plan.value === 3 &&
                                        <span>30 هزار یورو</span>
                                    }
                                    {(formInputs.travel_plan.value === 4 || formInputs.travel_plan.value === 5) &&
                                        <span>50 هزار یورو</span>
                                    }
                                </div>
                            </div>
                        </Fragment>
                    }
                    {insurance === 'medic' &&
                        <Fragment>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-4">
                                    تخصص
                                </div>
                                <div className="col-8 text-left">
                                    {formInputs.specialty ? formInputs.specialty.label : ''}
                                </div>
                            </div>
                            <div className="row font-size-13 no-gutters p-2 border-bottom">
                                <div className="col-6">
                                    سابقه عدم خسارت
                                </div>
                                <div className="col-6 text-left">
                                    {formInputs.prev_medic_ins_discount.label}
                                </div>
                            </div>
                            {formInputs.medicOrParamedic.value === '1' &&
                                <div className="row font-size-13 no-gutters p-2 border-bottom">
                                    <div className="col-6">
                                        پوشش اعمال زیبایی
                                    </div>
                                    <div className="col-6 text-left">
                                        {formInputs.beautySurgeryOption == '1' ? 'دارد' : 'ندارد'}
                                    </div>
                                </div>
                            }
                        </Fragment>
                    }
                    <div className="alert alert-info mb-0 text-center p-2">
                        <i className="fa fa-money ml-2" style={{ fontSize: '18px', position: 'relative', top: '2px' }}></i>
                        جزئیات پرداخت
                    </div>
                    <div className="row font-size-13 no-gutters p-2 border-bottom">
                        <div className="col-6">
                            قیمت بیمه نامه
                        </div>
                        <div className="col-6 text-left">
                            {finalPrice} تومان
                        </div>
                    </div>
                    <div className="row font-size-13 no-gutters p-2">
                        <div className="col-6">
                            هزینه ارسال
                        </div>
                        <div className="col-6 text-left">
                            رایگان
                        </div>
                    </div>
                    <h5 className="text-center border-top p-2 mb-4">
                        هزینه قابل پرداخت:
                        <span className="text-success mr-2">{finalPrice} تومان</span>
                    </h5>
                    <div className="text-center">
                        <button onClick={handleOptionButton}
                                className="btn-ins-option gateway-btn mb-2 mr-2 ml-2 font-size-14"
                                data-name="payment_gateway"
                                data-value="mellat">
                            درگاه ملت
                            <img src={mellat_logo} alt="لوگوی بانک ملت" className="mr-2" style={{ maxWidth: 'initial', maxHeight: '30px' }}/>
                        </button>
                        <button onClick={handleOptionButton}
                                className="btn-ins-option gateway-btn mb-2 mr-2 ml-2 font-size-14"
                                data-name="payment_gateway"
                                data-value="saman">
                            درگاه سامان
                            <img src={saman_logo} alt="لوگوی بانک سامان" className="mr-2" style={{ maxWidth: 'initial', maxHeight: '30px' }}/>
                        </button>
                    </div>
                    <div className="text-left mt-4">
                        <button onClick={handleSubmitPayment} disabled={disabledFinalPaymentButton ? 'disabled' : ''} className="btn btn-success">تایید و پرداخت</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentBill
