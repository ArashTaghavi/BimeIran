import React from 'react'
import Select from 'react-select'

const BodyInsuranceSelected = ({ cars, carModels, carManufactureYears, disabledBtn, discountYears, formInputs, step, decrementStep, incrementStep, doubleIncrementStep, formatAsMoney, handleSelectChange, handleInputChange, handleRadioButton, handleSubmitForm }) =>
{
    return (
        <div className="insurance-selection-form mb-4">
            <h3 className="mb-3">بیمه بدنه</h3>
            {step === 1 &&
                <p className="mb-5">اطلاعات مربوط به خودروی خود را انتخاب کنید.</p>
            }
            {step === 2 &&
                <p className="mb-5">آیا در حال حاضر بیمه بدنه دارید؟</p>
            }
            {step === 3 &&
                <p className="mb-5">تخفیف عدم خسارت بدنه خودروی خود را انتخاب کنید. <span className="text-warning">(مربوط به مالک فعلی خودرو)</span></p>
            }
            {step === 4 &&
                <p className="mb-5">وضعیت خودروی خود را از لحاظ کارکرد تعیین کنید.</p>
            }
            {step === 5 &&
                <p className="mb-5">ارزش روز خودروی خود را به تومان وارد کنید.</p>
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
                        <div className="row align-row text-center mj-leftslide">
                            <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                                <button onClick={incrementStep} className="btn btn-info w-100">
                                    بیمه بدنه دارم
                                </button>
                            </div>
                            <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                                <button onClick={doubleIncrementStep} className="btn btn-info w-100">
                                    بیمه بدنه ندارم
                                </button>
                            </div>
                        </div>
                    }
                    {step === 3 &&
                        <Select options={ discountYears }
                                placeholder={"تخفیف عدم خسارت بدنه"}
                                name="prev_body_discount"
                                className="mj-leftslide mj-select-menu"
                                onChange={handleSelectChange.bind(this, 'prev_body_discount')}
                        />
                    }
                    {step === 4 &&
                        <div className="row align-row mj-leftslide text-center">
                            <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                                <button onClick={handleRadioButton}
                                        className="btn btn-info w-100"
                                        data-name="hasBeenUsed"
                                        data-value="0">
                                    کارکرده
                                </button>
                            </div>
                            <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                                <button onClick={handleRadioButton}
                                        className="btn btn-info w-100"
                                        data-name="hasBeenUsed"
                                        data-value="1">
                                    صفر کیلومتر
                                </button>
                            </div>
                        </div>
                    }
                    {step === 5 &&
                        <div className="insurance-selection-input-with-label mj-leftslide">
                            <input type="text"
                                   name="vehicle_value"
                                   className="form-control"
                                   placeholder="ارزش روز خودرو"
                                   value={formInputs.vehicle_value}
                                   onChange={handleInputChange}
                                   onKeyUp={formatAsMoney}
                            />
                            <span className="insurance-selection-input-label">تومان</span>
                        </div>
                    }
                </div>
                {step !== 5 &&
                    <div className="col-3 pr-0 text-left">
                        <button onClick={incrementStep}
                                disabled={disabledBtn ? 'disabled' : ''}
                                className="btn btn-primary">
                            مرحله بعد
                        </button>
                    </div>
                }
                {step === 5 &&
                    <div className="col-3 pr-0 text-left">
                        <button onClick={handleSubmitForm}
                                disabled={disabledBtn ? 'disabled' : ''}
                                className="btn btn-success">
                            استعلام
                        </button>
                    </div>
                }
            </div>
            <p className="text-warning text-center font-size-13 mt-5">
                <i className="fa fa-exclamation-triangle ml-2"></i>
                صدور نهایی بیمه بدنه نیازمند بازدید و تایید کارشناس بیمه است و تنها در محدوده شهر تهران امکان پذیر می باشد.
            </p>
        </div>
    )
}

export default BodyInsuranceSelected
