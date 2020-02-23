import React from 'react'
import Select from 'react-select'

const LifeInsuranceSelected = ({ birthday_days, birthday_months, birthday_years, disabledBtn, formInputs, life_ins_duration, payment_method, step, decrementStep, incrementStep, handleSelectChange, handleInputChange, formatAsMoney, handleSubmitForm }) =>
{
    return (
        <div className="insurance-selection-form mb-4">
            <h3 className="mb-3">بیمه عمر</h3>
            {step === 1 &&
                <p className="mb-5">تاریخ تولد خود را وارد کنید.</p>
            }
            {step === 2 &&
                <p className="mb-5">مدت قرارداد خود را انتخاب کنید.</p>
            }
            {step === 3 &&
                <p className="mb-5">روش پرداخت خود را انتخاب کنید.</p>
            }
            {step === 4 &&
                <p className="mb-5">توان پرداخت ماهانه خود را وارد کنید.</p>
            }
            <div className="row align-row">
                <div className="col-3 pl-0">
                    <button onClick={decrementStep} className="btn btn-warning">مرحله قبل</button>
                </div>
                <div className="col-6 text-dark pl-0 pr-0">
                    {step === 1 &&
                        <div className="row align-row mj-leftslide">
                            <div className="col-12 col-md-4 pr-3 pl-3 pr-md-1 pl-md-1 mb-2 mb-md-0">
                                <Select options={ birthday_days }
                                        placeholder={"روز"}
                                        name="birthday_day"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'birthday_day')}
                                />
                            </div>
                            <div className="col-12 col-md-4 pr-3 pl-3 pr-md-1 pl-md-1 mb-2 mb-md-0">
                                <Select options={ birthday_months }
                                        placeholder={"ماه"}
                                        name="birthday_month"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'birthday_month')}
                                />
                            </div>
                            <div className="col-12 col-md-4 pr-3 pl-3 pr-md-1 pl-md-1">
                                <Select options={ birthday_years }
                                        placeholder={"سال"}
                                        name="birthday_year"
                                        className="mj-select-menu"
                                        onChange={handleSelectChange.bind(this, 'birthday_year')}
                                />
                            </div>
                        </div>
                    }
                    {step === 2 &&
                        <Select options={ life_ins_duration }
                                placeholder={"مدت قرارداد"}
                                name="life_ins_duration"
                                className="mj-leftslide mj-select-menu"
                                onChange={handleSelectChange.bind(this, 'life_ins_duration')}
                        />
                    }
                    {step === 3 &&
                        <Select options={ payment_method }
                                placeholder={"روش پرداخت"}
                                name="payment_method"
                                className="mj-leftslide mj-select-menu"
                                onChange={handleSelectChange.bind(this, 'payment_method')}
                        />
                    }
                    {step === 4 &&
                        <div>
                            <div className="insurance-selection-input-with-label mj-leftslide">
                                <input type="text"
                                       name="affordability"
                                       className="form-control"
                                       placeholder="توان پرداخت"
                                       value={formInputs.affordability}
                                       onChange={handleInputChange}
                                       onKeyUp={formatAsMoney}
                                />
                                <span className="insurance-selection-input-label">تومان</span>
                            </div>
                            <p className="text-danger mt-3 mb-0 font-weight-bold">حداقل مقدار پرداخت باید بیش تر از 50,000 تومان باشد.</p>
                        </div>
                    }
                </div>
                {step !== 4 &&
                    <div className="col-3 pr-0 text-left">
                        <button onClick={incrementStep}
                                disabled={disabledBtn ? 'disabled' : ''}
                                className="btn btn-primary">
                            مرحله بعد
                        </button>
                    </div>
                }
                {step === 4 &&
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

export default LifeInsuranceSelected
