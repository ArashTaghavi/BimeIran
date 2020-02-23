import React from 'react'
import Select from 'react-select'
import CounterInput from 'react-counter-input'

const TravelInsuranceSelected = ({ disabledBtn, formInputs, step, travelPlan, travelDuration, decrementStep, incrementStep, doubleIncrementStep, handleSelectChange, handleInputChange, handleCountChange, handleRadioButton, handleSubmitForm }) =>
{
    return (
        <div className="insurance-selection-form mb-4">
            <h3 className="mb-3">بیمه مسافرتی</h3>
            {step === 1 &&
                <p className="mb-5">طرح مسافرتی خود را انتخاب نمایید.</p>
            }
            {step === 2 &&
                <p className="mb-5">مدت زمان سفر خود را مشخص کنید.</p>
            }
            {step === 3 &&
                <p className="mb-5">تعداد مسافران را بر اساس بازه های سنی مشخص کنید.</p>
            }
            <div className="row align-row">
                <div className="col-3 pl-0">
                    <button onClick={decrementStep} className="btn btn-warning">مرحله قبل</button>
                </div>
                <div className="col-6 text-dark pl-0 pr-0">
                    {step === 1 &&
                        <Select options={ travelPlan }
                                placeholder={"طرح مسافرتی"}
                                name="travel_plan"
                                className="mj-leftslide mj-select-menu"
                                onChange={handleSelectChange.bind(this, 'travel_plan')}
                        />
                    }
                    {step === 2 &&
                        <Select options={ travelDuration }
                                placeholder={"مدت سفر"}
                                name="travel_duration"
                                className="mj-leftslide mj-select-menu"
                                onChange={handleSelectChange.bind(this, 'travel_duration')}
                        />
                    }
                    {step === 3 &&
                        <div className="insurance-selection-input-with-label mj-leftslide">
                            <input type="text"
                                   name="passengers_qty"
                                   className="form-control"
                                   placeholder="تعداد مسافران"
                                   value={formInputs.passengers_qty}
                                   onChange={handleInputChange}
                            />
                            <span className="insurance-selection-input-label">نفر</span>
                            <div className="passenger-qty-selection-box-wrapper">
                                <div className="passenger-qty-selection-box">
                                    <div className="row align-row mb-2">
                                        <div className="col-6">
                                            0 تا 12 سال
                                        </div>
                                        <div className="col-6">
                                            <CounterInput min={0}
                                                          max={100}
                                                          name="zero_to_12_age"
                                                          onCountChange={handleCountChange}
                                                          wrapperStyle={{ justifyContent: 'flex-end' }}
                                                          btnStyle={{ backgroundColor: 'blue' ,borderRadius: '10px', color: '#fff', height: '20px', padding: '0', textAlign: 'center', width: '20px', }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-row mb-2">
                                        <div className="col-6">
                                            13 تا 65 سال
                                        </div>
                                        <div className="col-6">
                                            <CounterInput min={0}
                                                          max={100}
                                                          name="thirteen_to_65_age"
                                                          onCountChange={handleCountChange}
                                                          wrapperStyle={{ justifyContent: 'flex-end' }}
                                                          btnStyle={{ backgroundColor: 'blue' ,borderRadius: '10px', color: '#fff', height: '20px', padding: '0', textAlign: 'center', width: '20px', }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-row mb-2">
                                        <div className="col-6">
                                            66 تا 70 سال
                                        </div>
                                        <div className="col-6">
                                            <CounterInput min={0}
                                                          max={100}
                                                          name="sixtySix_to_70_age"
                                                          onCountChange={handleCountChange}
                                                          wrapperStyle={{ justifyContent: 'flex-end' }}
                                                          btnStyle={{ backgroundColor: 'blue' ,borderRadius: '10px', color: '#fff', height: '20px', padding: '0', textAlign: 'center', width: '20px', }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-row mb-2">
                                        <div className="col-6">
                                            71 تا 75 سال
                                        </div>
                                        <div className="col-6">
                                            <CounterInput min={0}
                                                          max={100}
                                                          name="seventyOne_to_75_age"
                                                          onCountChange={handleCountChange}
                                                          wrapperStyle={{ justifyContent: 'flex-end' }}
                                                          btnStyle={{ backgroundColor: 'blue' ,borderRadius: '10px', color: '#fff', height: '20px', padding: '0', textAlign: 'center', width: '20px', }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-row mb-2">
                                        <div className="col-6">
                                            76 تا 80 سال
                                        </div>
                                        <div className="col-6">
                                            <CounterInput min={0}
                                                          max={100}
                                                          name="seventySix_to_80_age"
                                                          onCountChange={handleCountChange}
                                                          wrapperStyle={{ justifyContent: 'flex-end' }}
                                                          btnStyle={{ backgroundColor: 'blue' ,borderRadius: '10px', color: '#fff', height: '20px', padding: '0', textAlign: 'center', width: '20px', }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-row">
                                        <div className="col-6">
                                            81 تا 85 سال
                                        </div>
                                        <div className="col-6">
                                            <CounterInput min={0}
                                                          max={100}
                                                          name="eightyOne_to_85_age"
                                                          onCountChange={handleCountChange}
                                                          wrapperStyle={{ justifyContent: 'flex-end' }}
                                                          btnStyle={{ backgroundColor: 'blue' ,borderRadius: '10px', color: '#fff', height: '20px', padding: '0', textAlign: 'center', width: '20px', }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                disabled={formInputs.passengers_qty > 0 ? '' : 'disabled'}
                                className="btn btn-success">
                            استعلام
                        </button>
                    </div>
                }
            </div>
            <p className="text-info text-center font-size-13 mt-5">
                <i className="fa fa-exclamation-circle ml-2"></i>
                اعتبار بیمه نامه از زمان درج مهر خروج بر روی گذرنامه آغاز می گردد.
            </p>
        </div>
    )
}

export default TravelInsuranceSelected
