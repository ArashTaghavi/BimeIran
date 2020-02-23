import React, { Fragment } from 'react'
import Select from 'react-select'
import Checkbox from 'rc-checkbox'
import AdditionalInsuranceOption from './../partials/AdditionalInsuranceOption'

const BodyInsuranceOptions = ({ cars, carModels, carManufactureYears, discountYears, formInputs, applyInputChange, handleSelectChange, handleInputChange, toggleAdditionalOptions, formatAsMoney, handleOptionButton, handleCheckboxChange }) =>
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
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-input-with-label">
                        <input type="text"
                               name="vehicle_accessories_value"
                               className="form-control"
                               placeholder="ارزش لوازم غیرفابریک"
                               value={formInputs.vehicle_accessories_value}
                               onChange={handleInputChange}
                               onKeyUp={formatAsMoney}
                        />
                        <span className="apply-change-btn" onClick={applyInputChange}>اعمال</span>
                        <span className="insurance-selection-input-label">تومان</span>
                        <span className="insurance-selection-select-label">ارزش لوازم غیرفابریک</span>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-select-with-label">
                        <input type="text"
                               name="vehicle_value"
                               className="form-control"
                               placeholder="ارزش روز خودرو (حداقل ۵ میلیون تومان)"
                               value={formInputs.vehicle_value}
                               onChange={handleInputChange}
                               onKeyUp={formatAsMoney}
                        />
                        <span className="apply-change-btn" onClick={applyInputChange}>اعمال</span>
                        <span className="insurance-selection-input-label">تومان</span>
                        <span className="insurance-selection-select-label">ارزش روز خودرو (حداقل ۵ میلیون تومان)</span>
                    </div>
                </div>
                <div className="col-12 mb-1">
                    <div className="rtl text-right font-size-13">
                        <label htmlFor="hasBeenUsed" className="cursor-pointer">
                            <Checkbox
                                className="ml-2"
                                checked={parseInt(formInputs.hasBeenUsed)}
                                name="hasBeenUsed"
                                id="hasBeenUsed"
                                onChange={handleCheckboxChange}
                            />
                            تخفیف صفر کیلومتر
                        </label>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="rtl text-right font-size-13 mb-2">
                        <label htmlFor="hasPrevBodyIns" className="cursor-pointer">
                            <Checkbox
                                className="ml-2"
                                checked={parseInt(formInputs.hasPrevBodyIns)}
                                name="hasPrevBodyIns"
                                id="hasPrevBodyIns"
                                onChange={handleCheckboxChange}
                            />
                            بیمه بدنه دارم
                        </label>
                    </div>
                    {formInputs.hasPrevBodyIns == '1' &&
                        <div className="insurance-selection-select-with-label text-right rtl mb-3">
                            <Select options={ discountYears }
                                    placeholder={"تخفیف عدم خسارت بدنه"}
                                    name="prev_body_discount"
                                    className="font-size-13"
                                    value={formInputs.prev_body_discount}
                                    onChange={handleSelectChange.bind(this, 'prev_body_discount')}
                            />
                            <span className="insurance-selection-select-label">تخفیف عدم خسارت بدنه</span>
                        </div>
                    }
                </div>
            </div>
            <div className="text-center">
                <h6 className="d-none d-sm-block">پوشش های اضافی:</h6>
                <div className="text-center d-block d-sm-none">
                    <button className="btn btn-warning" id="additional-option-toggler" onClick={toggleAdditionalOptions}><i className="fa fa-bars ml-2"></i>پوشش های اضافی</button>
                </div>
                <div className="additional-options mt-3 mt-sm-0">
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasGlassBreakOption'} label={'شکست شیشه'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasChemicalsSplashOption'} label={'پاشیدن مواد شیمیایی و اسیدی'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasStealingAtOnceOption'} label={'سرقت درجا'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasFluctuationOption'} label={'نوسانات ارزش بازار'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasNaturalDisastersOption'} label={'سیل، زلزله و بلایای طبیعی'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasTransportationOption'} label={'ایاب و ذهاب'} />
                </div>
            </div>
        </Fragment>
    )
}

export default BodyInsuranceOptions
