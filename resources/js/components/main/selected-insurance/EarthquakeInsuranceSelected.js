import React from 'react'
import Select from 'react-select'

const FireInsuranceSelected = ({ disabledBtn, formInputs, propertyType, step, decrementStep, incrementStep, handleSelectChange, handleInputChange, formatAsMoney, handleSubmitForm }) =>
{
    return (
        <div className="insurance-selection-form mb-4">
            <h3 className="mb-3">بیمه زلزله</h3>
            {step === 1 &&
                <p className="mb-5">نوع ملک خود را انتخاب کنید.</p>
            }
            {step === 2 &&
                <p className="mb-5">متراژ ملک مورد نظر را وارد کنید.</p>
            }
            {step === 3 &&
                <p className="mb-5">ارزش کلیه لوازم <span className="text-warning">به استثنای پول نقد، طلا و جواهرات</span> را به تومان وارد کنید.</p>
            }
            <div className="row align-row">
                <div className="col-3 pl-0">
                    <button onClick={decrementStep} className="btn btn-warning">مرحله قبل</button>
                </div>
                <div className="col-6 text-dark pl-0 pr-0">
                    {step === 1 &&
                        <Select options={ propertyType }
                                placeholder={"نوع ملک"}
                                name="property_type"
                                className="mj-leftslide mj-select-menu"
                                onChange={handleSelectChange.bind(this, 'property_type')}
                        />
                    }
                    {step === 2 &&
                        <div className="insurance-selection-input-with-label mj-leftslide">
                            <input type="text"
                                   name="area"
                                   className="form-control"
                                   placeholder="متراژ مورد بیمه"
                                   value={formInputs.area}
                                   onChange={handleInputChange}
                            />
                            <span className="insurance-selection-input-label">متر</span>
                        </div>
                    }
                    {step === 3 &&
                        <div className="insurance-selection-input-with-label mj-leftslide">
                            <input type="text"
                                   name="furniture_value"
                                   className="form-control"
                                   placeholder="ارزش کلیه لوازم (به تومان)"
                                   value={formInputs.furniture_value}
                                   onChange={handleInputChange}
                                   onKeyUp={formatAsMoney}
                            />
                            <span className="insurance-selection-input-label">تومان</span>
                        </div>
                    }
                </div>
                {step !== 3 &&
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

export default FireInsuranceSelected
