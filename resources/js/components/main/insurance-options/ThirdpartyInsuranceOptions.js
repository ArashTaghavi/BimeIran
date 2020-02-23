import React, { Fragment } from 'react'
import Select from 'react-select'

const ThirdpartyInsuranceOptions = ({ cars, carModels, carManufactureYears, damageQtys, discountPercents, formInputs, insuranceCompanies, yesNoQuestion, toggleThirdpartyAdditionalOptions, applyInputChange, handleSelectChange, handlePrevInsDateChange, openCalendar }) =>
{
    return (
        <Fragment>
            <h6 className="font-weight-bold"><i className="fa fa-angle-left ml-2 text-primary"></i>اطلاعات خودرو</h6>
            <div className="row">
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-select-with-label">
                        <Select options={ cars }
                                placeholder={"برند"}
                                name="car_brand"
                                className="mj-select-menu"
                                value={formInputs.car_brand}
                                onChange={handleSelectChange.bind(this, 'car_brand')}
                        />
                        <span className="insurance-selection-select-label">برند</span>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-select-with-label">
                        <Select options={ carModels }
                                placeholder={"مدل"}
                                name="car_model"
                                className="mj-select-menu"
                                value={formInputs.car_model}
                                onChange={handleSelectChange.bind(this, 'car_model')}
                        />
                        <span className="insurance-selection-select-label">مدل</span>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-select-with-label">
                        <Select options={ carManufactureYears }
                                placeholder={"سال ساخت"}
                                name="manufacture_year"
                                className="mj-select-menu"
                                value={formInputs.manufacture_year}
                                onChange={handleSelectChange.bind(this, 'manufacture_year')}
                        />
                        <span className="insurance-selection-select-label">سال ساخت</span>
                    </div>
                </div>
            </div>
            <span id="thirdparty-additional-option-toggler" className="text-info font-size-12" onClick={toggleThirdpartyAdditionalOptions}>
                نمایش <span className="more-text">بیشتر</span><span className="less-text">کمتر</span>
                <i className="fa fa-angle-down mr-2"></i>
            </span>
            <div className="thirdparty-additional-options">
                <h6 className="font-weight-bold"><i className="fa fa-angle-left ml-2 text-primary"></i>اطلاعات بیمه نامه قبلی</h6>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-12 mb-3">
                        <div className="insurance-selection-select-with-label">
                            <Select options={ insuranceCompanies }
                                    placeholder={"شرکت بیمه گر قبلی"}
                                    name="prev_ins_company"
                                    className="mj-select-menu"
                                    value={formInputs.prev_ins_company}
                                    onChange={handleSelectChange.bind(this, 'prev_ins_company')}
                            />
                            <span className="insurance-selection-select-label">شرکت بیمه گر قبلی</span>
                        </div>
                    </div>
                    {formInputs.prev_ins_company.value !== 'new' && formInputs.prev_ins_company.value !== 'without' &&
                        <Fragment>
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <div className="insurance-selection-input-with-label mj-date">
                                    <input type="text"
                                           name="prev_ins_start_date"
                                           id="prev_ins_start_date"
                                           className="form-control text-center"
                                           placeholder="تاریخ شروع بیمه نامه قبلی"
                                           value={formInputs.prevInsStartDate}
                                           onFocus={openCalendar}
                                           onChange={handlePrevInsDateChange}
                                           onBlur={handlePrevInsDateChange}
                                    />
                                    <div className="mj-calendar"></div>
                                    <span className="apply-change-btn" onClick={applyInputChange}>اعمال</span>
                                    <span className="insurance-selection-select-label">تاریخ شروع بیمه نامه قبلی</span>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <div className="insurance-selection-input-with-label mj-date">
                                    <input type="text"
                                           name="prev_ins_finish_date"
                                           id="prev_ins_finish_date"
                                           className="form-control text-center"
                                           placeholder="تاریخ پایان بیمه نامه قبلی"
                                           value={formInputs.prevInsFinishDate}
                                           onFocus={openCalendar}
                                           onChange={handlePrevInsDateChange}
                                           onBlur={handlePrevInsDateChange}
                                    />
                                    <div className="mj-calendar"></div>
                                    <span className="apply-change-btn" onClick={applyInputChange}>اعمال</span>
                                    <span className="insurance-selection-select-label">تاریخ پایان بیمه نامه قبلی</span>
                                </div>
                            </div>
                        </Fragment>
                    }
                </div>
                {formInputs.prev_ins_company.value !== 'new' && formInputs.prev_ins_company.value !== 'without' &&
                    <Fragment>
                        <h6 className="font-weight-bold"><i className="fa fa-angle-left ml-2 text-primary"></i>تخفیف بیمه نامه قبلی</h6>
                        <div className="row">
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <div className="insurance-selection-select-with-label">
                                    <Select options={ discountPercents }
                                            placeholder={"درصد تخفیف ثالث"}
                                            name="prev_thirdparty_discount"
                                            className="mj-select-menu"
                                            value={formInputs.prev_thirdparty_discount}
                                            onChange={handleSelectChange.bind(this, 'prev_thirdparty_discount')}
                                    />
                                    <span className="insurance-selection-select-label">درصد تخفیف ثالث</span>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <div className="insurance-selection-select-with-label">
                                    <Select options={ discountPercents }
                                            placeholder={"درصد تخفیف حوادث راننده"}
                                            name="prev_driver_discount"
                                            className="mj-select-menu"
                                            value={formInputs.prev_driver_discount}
                                            onChange={handleSelectChange.bind(this, 'prev_driver_discount')}
                                    />
                                    <span className="insurance-selection-select-label">درصد تخفیف حوادث راننده</span>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12 mb-3">
                                <div className="insurance-selection-select-with-label">
                                    <Select options={ yesNoQuestion }
                                            placeholder={"آیا از بیمه نامه قبلی خود خسارت گرفته اید؟"}
                                            name="charge_prev_ins"
                                            className="mj-select-menu"
                                            value={formInputs.charge_prev_ins}
                                            onChange={handleSelectChange.bind(this, 'charge_prev_ins')}
                                    />
                                    <span className="insurance-selection-select-label">آیا از بیمه نامه قبلی خود خسارت گرفته اید؟</span>
                                </div>
                            </div>
                        </div>
                        {formInputs.charge_prev_ins.value == true &&
                            <Fragment>
                                <h6 className="font-weight-bold"><i className="fa fa-angle-left ml-2 text-primary"></i>خسارت بیمه نامه قبلی</h6>
                                <div className="row">
                                    <div className="col-md-4 col-sm-6 col-12 mb-3">
                                        <div className="insurance-selection-select-with-label">
                                            <Select options={ damageQtys }
                                                    placeholder={"تعداد خسارت مالی"}
                                                    name="property_damage_qty"
                                                    value={formInputs.property_damage_qty}
                                                    onChange={handleSelectChange.bind(this, 'property_damage_qty')}
                                            />
                                            <span className="insurance-selection-select-label">تعداد خسارت مالی</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6 col-12 mb-3">
                                        <div className="insurance-selection-select-with-label">
                                            <Select options={ damageQtys }
                                                    placeholder={"تعداد خسارت جانی"}
                                                    name="life_damage_qty"
                                                    value={formInputs.life_damage_qty}
                                                    onChange={handleSelectChange.bind(this, 'life_damage_qty')}
                                            />
                                            <span className="insurance-selection-select-label">تعداد خسارت جانی</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6 col-12 mb-3">
                                        <div className="insurance-selection-select-with-label">
                                            <Select options={ damageQtys }
                                                    placeholder={"تعداد خسارت حوادث راننده"}
                                                    name="driver_damage_qty"
                                                    value={formInputs.driver_damage_qty}
                                                    onChange={handleSelectChange.bind(this, 'driver_damage_qty')}
                                            />
                                            <span className="insurance-selection-select-label">تعداد خسارت حوادث راننده</span>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        }
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}

export default ThirdpartyInsuranceOptions
