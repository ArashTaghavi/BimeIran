import React, { Fragment } from 'reactn'
import iran_ins_logo from '../../../../images/iran_insurance_logo.png'

const InsurancePurchaseTable = ({ additionalOptionsPersian, loggedIn, formInputs, disabledOrderBtn, insurance, insurancePersian, finalPrice, incrementStep, formatAsMoneyJustValue }) =>
{
    const optionsText = additionalOptionsPersian.join('،')

    return (
        <Fragment>
            <div className="card shadow border-0 mb-3 p-0 overflow-hidden">
                <div className="card-body p-0">
                    <table className="table purchase-ins-table table-striped text-center m-0">
                        <thead>
                            <tr>
                                <th className="d-none d-sm-block">شرکت بیمه</th>
                                <th>نوع بیمه</th>
                                <th>قیمت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="d-none d-sm-block">
                                    <img src={iran_ins_logo} alt="لوگوی بیمه ایران" style={{ maxWidth: '50px' }}/>
                                </td>
                                <td>{insurancePersian}</td>
                                <td>
                                    <span id="temp-final-price">{finalPrice}</span> تومان
                                </td>
                                <td>
                                    <button data-toggle="modal" data-target="#final-purchase-review" disabled={disabledOrderBtn ? 'disabled' : ''} className="btn btn-info">سفارش</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="final-purchase-review">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    {loggedIn &&
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title mx-auto mb-0 font-weight-normal">تایید سفارش</h4>
                                <button className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-info text-center mb-0 p-2">
                                    مشخصات بیمه ایران
                                </div>
                                <div className="row font-size-13 no-gutters p-2 border-bottom">
                                    <div className="col-6">
                                        حق بیمه
                                    </div>
                                    <div className="col-6 text-left">
                                        {finalPrice} تومان
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
                                {(insurance === 'fire' || insurance === 'body') &&
                                    <div className="row font-size-13 no-gutters p-2">
                                        <div className="col-6">
                                            پوشش های اضافی
                                        </div>
                                        <div className="col-6 text-left">
                                            {optionsText ? optionsText : '-'}
                                        </div>
                                    </div>
                                }
                                {insurance === 'thirdparty' &&
                                    <div className="row font-size-13 no-gutters p-2">
                                        <div className="col-6">
                                            سطح تعهد مالی
                                        </div>
                                        <div className="col-6 text-left">
                                            {formatAsMoneyJustValue(formInputs.financial_commitment_level)} تومان
                                        </div>
                                    </div>
                                }
                                {insurance === 'travel' &&
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
                                }
                                {(insurance === 'fire' || insurance === 'earthquake') &&
                                    <Fragment>
                                        <div className="alert alert-info text-center mb-0 p-2">
                                            مشخصات {formInputs.property_type.label}
                                        </div>
                                        <div className="row font-size-13 no-gutters p-2 border-bottom">
                                            <div className="col-6">
                                                متراژ
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
                                        <div className="row font-size-13 no-gutters p-2">
                                            <div className="col-6">
                                                ارزش لوازم خانه
                                            </div>
                                            <div className="col-6 text-left">
                                                {formatAsMoneyJustValue(formInputs.furniture_value)} تومان
                                            </div>
                                        </div>
                                    </Fragment>
                                }
                                {insurance === 'thirdparty' &&
                                    <Fragment>
                                        <div className="alert alert-info text-center mb-0 p-2">
                                            مشخصات اتومبیل
                                        </div>
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
                                                تاریخ شروع بیمه نامه قبلی
                                            </div>
                                            <div className="col-5 text-left">
                                                {formInputs.prevInsStartDate}
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
                                        <div className={(formInputs.charge_prev_ins && formInputs.charge_prev_ins.value == 1) ? 'row font-size-13 no-gutters p-2 border-bottom' : 'row font-size-13 no-gutters p-2'}>
                                            <div className="col-7">
                                                شرکت بیمه گر قبلی
                                            </div>
                                            <div className="col-5 text-left">
                                                {formInputs.prev_ins_company.label}
                                            </div>
                                        </div>
                                        {formInputs.charge_prev_ins && formInputs.charge_prev_ins.value == 1 && !disabledOrderBtn &&
                                            <Fragment>
                                                <div className="row font-size-13 no-gutters p-2 border-bottom">
                                                    <div className="col-6">
                                                        تعداد خسارت جانی
                                                    </div>
                                                    <div className="col-6 text-left">
                                                        {formInputs.life_damage_qty.label}
                                                    </div>
                                                </div>
                                                <div className="row font-size-13 no-gutters p-2 border-bottom">
                                                    <div className="col-6">
                                                        تعداد خسارت مالی
                                                    </div>
                                                    <div className="col-6 text-left">
                                                        {formInputs.property_damage_qty.label}
                                                    </div>
                                                </div>
                                                <div className="row font-size-13 no-gutters p-2">
                                                    <div className="col-6">
                                                        تعداد خسارت راننده
                                                    </div>
                                                    <div className="col-6 text-left">
                                                        {formInputs.driver_damage_qty.label}
                                                    </div>
                                                </div>
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                                {insurance === 'body' &&
                                    <Fragment>
                                        <div className="alert alert-info text-center mb-0 p-2">
                                            مشخصات اتومبیل
                                        </div>
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
                                        <div className="row font-size-13 no-gutters p-2 border-bottom">
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
                                        <div className="row font-size-13 no-gutters p-2">
                                            <div className="col-12">
                                                <div className="alert alert-warning text-center font-size-13 mb-0">
                                                    <i className="fa fa-exclamation-triangle ml-2"></i>
                                                    صدور نهایی بیمه بدنه نیازمند بازدید و تایید کارشناس بیمه است و تنها در محدوده شهر تهران امکان پذیر می باشد.
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                }
                                {insurance === 'travel' &&
                                    <Fragment>
                                        <div className="alert alert-info text-center mb-0 p-2">
                                            مشخصات سفر
                                        </div>
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
                                            <div className="col-12">
                                                <div className="alert alert-warning text-center font-size-13 mb-0">
                                                    <i className="fa fa-exclamation-triangle ml-2"></i>
                                                    این بیمه‌نامه در سفر هایی معتبر است که بعد از خرید آن شروع شده باشند.
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                }
                                {insurance === 'medic' &&
                                    <Fragment>
                                        <div className="alert alert-info text-center mb-0 p-2">
                                            {formInputs.medicOrParamedic.value === '1' ? 'مشخصات پزشک' : 'مشخصات پیراپزشک'}
                                        </div>
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
                            </div>
                            <div className="modal-footer border-top">
                                <button onClick={incrementStep} className="btn btn-info d-block mx-auto" data-dismiss="modal">سفارش</button>
                            </div>
                        </div>
                    }
                    {!loggedIn &&
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title mx-auto mb-0 font-weight-normal">ثبت نام نکرده اید؟</h4>
                                <button className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p className="mb-0">لطفا برای ادامه فرآیند خرید، ابتدا وارد شده و یا ثبت نام کنید.</p>
                            </div>
                            <div className="modal-footer border-top">
                                <button className="btn btn-info d-block mx-auto" data-dismiss="modal">بستن</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default InsurancePurchaseTable
