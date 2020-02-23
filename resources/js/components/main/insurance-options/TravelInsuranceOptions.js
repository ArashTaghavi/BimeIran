import React, { Fragment } from 'react'
import Select from 'react-select'
import CounterInput from 'react-counter-input'

const TravelInsuranceOptions = ({ formInputs, travelPlan, travelDuration, applyInputChange, handleSelectChange, handleInputChange, handleCountChange }) =>
{
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-select-with-label">
                        <Select options={ travelPlan }
                                placeholder={"طرح مسافرتی"}
                                name="travel_plan"
                                value={formInputs.travel_plan}
                                onChange={handleSelectChange.bind(this, 'travel_plan')}
                        />
                        <span className="insurance-selection-select-label">طرح مسافرتی</span>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-select-with-label">
                        <Select options={ travelDuration }
                                placeholder={"مدت سفر"}
                                name="travel_duration"
                                value={formInputs.travel_duration}
                                onChange={handleSelectChange.bind(this, 'travel_duration')}
                        />
                        <span className="insurance-selection-select-label">مدت سفر</span>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-input-with-label mj-leftslide">
                        <input type="text"
                               name="passengers_qty"
                               className="form-control"
                               placeholder="تعداد مسافران"
                               value={formInputs.passengers_qty}
                               onChange={handleInputChange}
                        />
                        <span className="apply-change-btn" onClick={applyInputChange}>اعمال</span>
                        <span className="insurance-selection-input-label">نفر</span>
                        <span className="insurance-selection-select-label">تعداد مسافران</span>
                        <div className="passenger-qty-selection-box-wrapper passenger-qty-selection-box-wrapper-from-bottom">
                            <div className="passenger-qty-selection-box">
                                <div className="row align-row mb-2">
                                    <div className="col-6">
                                        0 تا 12 سال
                                    </div>
                                    <div className="col-6">
                                        <CounterInput min={0}
                                                      max={100}
                                                      count={formInputs.zero_to_12_age}
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
                                                      count={formInputs.thirteen_to_65_age}
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
                                                      count={formInputs.sixtySix_to_70_age}
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
                                                      count={formInputs.seventyOne_to_75_age}
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
                                                      count={formInputs.seventySix_to_80_age}
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
                                                      count={formInputs.eightyOne_to_85_age}
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
                </div>
                <div className="col-12">
                    <div className="text-center">
                        {(formInputs.travel_plan.value === 1 || formInputs.travel_plan.value === 2) &&
                            <span className="text-info">سطح تعهدات مالی: 10 هزار یورو</span>
                        }
                        {formInputs.travel_plan.value === 3 &&
                            <span className="text-info">سطح تعهدات مالی: 30 هزار یورو</span>
                        }
                        {(formInputs.travel_plan.value === 4 || formInputs.travel_plan.value === 5) &&
                            <span className="text-info">سطح تعهدات مالی: 50 هزار یورو</span>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default TravelInsuranceOptions
