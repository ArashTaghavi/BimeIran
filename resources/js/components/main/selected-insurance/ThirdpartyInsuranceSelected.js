import React from 'react'
import Select from 'react-select'

const ThirdpartyInsuranceSelected = ({ cars, carModels, carManufactureYears, damageQtys, disabledBtn, discountPercents, formInputs, insuranceCompanies, step, yesNoQuestion, decrementStep, incrementStep, handleSelectChange, handlePrevInsDateChange, handleStorePrevInsDates, handleSubmitForm, openCalendar }) =>
{
    return (
        <div className="insurance-selection-form mb-4">
            <h3 className="mb-3">بیمه شخص ثالث</h3>
            {step === 1 &&
                <p className="mb-5">اطلاعات مربوط به خودروی خود را انتخاب کنید.</p>
            }
            {step === 2 &&
                <p className="mb-5">شرکت بیمه گر قبلی خود را انتخاب کنید.</p>
            }
            {step === 3 &&
                <p className="mb-5">تاریخ شروع و پایان بیمه نامه قبلی خود را وارد کنید.</p>
            }
            {step === 4 &&
                <p className="mb-5">درصد تخفیف بیمه شخص ثالث و حوادث راننده را از روی بیمه نامه قبلی خود وارد کنید.</p>
            }
            {step === 5 &&
                <p className="mb-5">تعداد دفعات استفاده از بیمه‌نامه قبلی برای پرداخت خسارت مالی، جانی و حوادث راننده را وارد کنید.</p>
            }
            <div className="row align-row">
                <div className="col-3 pl-0">
                    <button onClick={decrementStep} className="btn btn-warning">مرحله قبل</button>
                </div>
                <div className="col-6 text-dark pl-0 pr-0">
                    {step === 1 &&
                        <div className="row align-row mj-leftslide">
                            <div className="col-12 col-sm-6 mb-3">
                                <Select options={ cars }
                                        placeholder={"برند"}
                                        name="car_brand"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'car_brand')}
                                />
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                                <Select options={ carModels }
                                        placeholder={"مدل"}
                                        name="car_model"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'car_model')}
                                />
                            </div>
                            <div className="col-12">
                                <Select options={ carManufactureYears }
                                        placeholder={"سال ساخت"}
                                        name="manufacture_year"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'manufacture_year')}
                                />
                            </div>
                        </div>
                    }
                    {step === 2 &&
                        <Select options={ insuranceCompanies }
                                placeholder={"شرکت بیمه گر قبلی"}
                                name="prev_ins_company"
                                className="mj-leftslide mj-select-menu"
                                onChange={handleSelectChange.bind(this, 'prev_ins_company')}
                        />
                    }
                    {step === 3 &&
                        <div className="mj-leftslide">
                            <div className="mj-date text-center mb-3">
                                <input type="text"
                                       name="prev_ins_start_date"
                                       id="prev_ins_start_date"
                                       className="form-control text-center"
                                       placeholder="تاریخ شروع بیمه نامه قبلی"
                                       onFocus={openCalendar}
                                       onBlur={handlePrevInsDateChange}
                                       onChange={e => e.target.value = ''}
                                />
                                <div className="mj-calendar"></div>
                            </div>
                            <div className="mj-date text-center">
                                <input type="text"
                                       name="prev_ins_finish_date"
                                       id="prev_ins_finish_date"
                                       className="form-control text-center"
                                       placeholder="تاریخ پایان بیمه نامه قبلی"
                                       onFocus={openCalendar}
                                       onBlur={handlePrevInsDateChange}
                                       onChange={e => e.target.value = ''}
                                />
                                <div className="mj-calendar"></div>
                            </div>
                        </div>
                    }
                    {step === 4 &&
                        <div className="row align-row mj-leftslide">
                            <div className="col-12 mb-3">
                                <Select options={ discountPercents }
                                        placeholder={"درصد تخفیف ثالث"}
                                        name="prev_thirdparty_discount"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'prev_thirdparty_discount')}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <Select options={ discountPercents }
                                        placeholder={"درصد تخفیف حوادث راننده"}
                                        name="prev_driver_discount"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'prev_driver_discount')}
                                />
                            </div>
                            <div className="col-12">
                                <Select options={ yesNoQuestion }
                                        placeholder={"آیا از بیمه نامه قبلی خود خسارت گرفته اید؟"}
                                        name="charge_prev_ins"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'charge_prev_ins')}
                                />
                            </div>
                        </div>
                    }
                    {step === 5 &&
                        <div className="row align-row mj-leftslide">
                            <div className="col-12 mb-3">
                                <Select options={ damageQtys }
                                        placeholder={"تعداد خسارت مالی"}
                                        name="property_damage_qty"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'property_damage_qty')}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <Select options={ damageQtys }
                                        placeholder={"تعداد خسارت جانی"}
                                        name="life_damage_qty"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'life_damage_qty')}
                                />
                            </div>
                            <div className="col-12">
                                <Select options={ damageQtys }
                                        placeholder={"تعداد خسارت حوادث راننده"}
                                        name="driver_damage_qty"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'driver_damage_qty')}
                                />
                            </div>
                        </div>
                    }
                </div>
                {step !== 5 && step !== 4 && step !== 3 &&
                    <div className="col-3 pr-0 text-left">
                        <button onClick={incrementStep}
                                disabled={disabledBtn ? 'disabled' : ''}
                                className="btn btn-primary">
                            مرحله بعد
                        </button>
                    </div>
                }
                {step === 3 &&
                    <div className="col-3 pr-0 text-left">
                        <button onClick={handleStorePrevInsDates}
                                disabled={disabledBtn ? 'disabled' : ''}
                                className="btn btn-primary">
                            مرحله بعد
                        </button>
                    </div>
                }
                {(step === 4 || step === 5) &&
                    <div className="col-3 pr-0 text-left">
                        <button onClick={handleSubmitForm}
                                disabled={disabledBtn ? 'disabled' : ''}
                                className="btn btn-success">
                            استعلام
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ThirdpartyInsuranceSelected
