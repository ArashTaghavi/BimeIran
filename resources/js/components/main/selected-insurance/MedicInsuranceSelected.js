import React from 'react'
import Select from 'react-select'

const MedicInsuranceSelected = ({disabledBtn, discountMedicYears, formInputs, specialties, step, decrementStep, incrementStep, handleSelectChange, handleRadioButton, handleSubmitForm}) => {
    step === 3 ? step= 4 : step;
    return (
        <div className="insurance-selection-form mb-4">
            <h3 className="mb-3">بیمه مسئولیت پزشکان</h3>
            {step === 1 &&
            <p className="mb-5">پزشک هستید یا پیراپزشک؟</p>
            }
            {step === 2 &&
            <p className="mb-5">تخصص خود را انتخاب کنید.</p>
            }
            {step === 3 && formInputs.medicOrParamedic === '1' &&
            <p className="mb-5">آیا رزیدنت هستید؟</p>
            }
            {step === 3 && formInputs.medicOrParamedic === '2' &&
            <p className="mb-5">آیا دانشجو هستید؟</p>
            }
            {step === 4 &&
            <p className="mb-5">سابقه عدم خسارت خود را انتخاب کنید.</p>
            }
            <div className="row align-row">
                <div className="col-3 pl-0">
                    <button onClick={decrementStep} className="btn btn-warning">مرحله قبل</button>
                </div>
                <div className="col-6 text-dark pl-0 pr-0">
                    {step === 1 &&
                    <div className="row align-row mj-leftslide text-center">
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                            <button onClick={handleRadioButton}
                                    className="btn btn-info w-100"
                                    data-name="medicOrParamedic"
                                    data-value="1">
                                پزشک
                            </button>
                        </div>
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                            <button onClick={handleRadioButton}
                                    className="btn btn-info w-100"
                                    data-name="medicOrParamedic"
                                    data-value="2">
                                پیراپزشک
                            </button>
                        </div>
                    </div>
                    }
                    {step === 2 &&
                    <Select options={specialties}
                            placeholder={"تخصص پزشکی"}
                            name="specialty"
                            className="mj-leftslide mj-select-menu"
                            onChange={handleSelectChange.bind(this, 'specialty')}
                    />
                    }
                    {step === 3 && formInputs.medicOrParamedic.value === '1' &&
                    <div className="row align-row mj-leftslide text-center">
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                            <button onClick={handleRadioButton}
                                    className="btn btn-info w-100"
                                    data-name="isResident"
                                    data-value="1">
                                رزیدنت هستم
                            </button>
                        </div>
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                            <button onClick={handleRadioButton}
                                    className="btn btn-info w-100"
                                    data-name="isResident"
                                    data-value="0">
                                رزیدنت نیستم
                            </button>
                        </div>
                    </div>
                    }
                    {step === 3 && formInputs.medicOrParamedic.value === '2' &&
                    <div className="row align-row mj-leftslide text-center">
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                            <button onClick={handleRadioButton}
                                    className="btn btn-info w-100"
                                    data-name="isStudent"
                                    data-value="1">
                                دانشجو هستم
                            </button>
                        </div>
                        <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                            <button onClick={handleRadioButton}
                                    className="btn btn-info w-100"
                                    data-name="isStudent"
                                    data-value="0">
                                دانشجو نیستم
                            </button>
                        </div>
                    </div>
                    }
                    {step === 4 &&
                    <Select options={discountMedicYears}
                            placeholder={"سابقه عدم خسارت"}
                            name="prev_medic_ins_discount"
                            className="mj-leftslide mj-select-menu"
                            onChange={handleSelectChange.bind(this, 'prev_medic_ins_discount')}
                    />
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

export default MedicInsuranceSelected
