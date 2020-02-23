import React from 'react'
import Select from 'react-select'

const TreatmentInsuranceSelected = ({ disabledBtn, formInputs, franchiseePercents, step, decrementStep, incrementStep, handleSelectChange, handleInputChange, handleSubmitForm }) =>
{
    return (
        <div className="insurance-selection-form mb-4">
            <h3 className="mb-3">بیمه درمان تکمیلی</h3>
            {step === 1 &&
                <p className="mb-5">تعداد کل افراد را وارد کنید.</p>
            }
            {step === 2 &&
                <p className="mb-5">تعداد افراد در بازه سنی 61 تا 70 سال را وارد کنید.</p>
            }
            {step === 3 &&
                <p className="mb-5">تعداد افراد در بازه سنی 71 تا 80 سال را وارد کنید.</p>
            }
            {step === 4 &&
                <p className="mb-5">فرانشیز مورد نظر خود را انتخاب کنید.</p>
            }
            <div className="row align-row">
                <div className="col-3 pl-0">
                    <button onClick={decrementStep} className="btn btn-warning">مرحله قبل</button>
                </div>
                <div className="col-6 text-dark pl-0 pr-0">
                    {step === 1 &&
                        <div>
                            <div className="insurance-selection-input-with-label mj-leftslide">
                                <input type="text"
                                       name="personel_qty"
                                       className="form-control"
                                       placeholder="تعداد کل افراد"
                                       value={formInputs.personel_qty}
                                       onChange={handleInputChange}
                                />
                                <span className="insurance-selection-input-label">نفر</span>
                            </div>
                            <p className="text-danger mt-3 mb-0 font-weight-bold">حداقل تعداد افراد با احتساب اعضای خانواده 50 نفر است.</p>
                        </div>
                    }
                    {step === 2 &&
                        <div className="insurance-selection-input-with-label mj-leftslide">
                            <input type="text"
                                   name="personel_61_to_70_qty"
                                   className="form-control"
                                   placeholder="افراد 61 تا 70 سال"
                                   value={formInputs.personel_61_to_70_qty}
                                   onChange={handleInputChange}
                            />
                            <span className="insurance-selection-input-label">نفر</span>
                        </div>
                    }
                    {step === 3 &&
                        <div className="insurance-selection-input-with-label mj-leftslide">
                            <input type="text"
                                   name="personel_71_to_80_qty"
                                   className="form-control"
                                   placeholder="افراد 71 تا 80 سال"
                                   value={formInputs.personel_71_to_80_qty}
                                   onChange={handleInputChange}
                            />
                            <span className="insurance-selection-input-label">نفر</span>
                        </div>
                    }
                    {step === 4 &&
                        <Select options={ franchiseePercents }
                                placeholder={"میزان فرانشیز"}
                                name="treatment_franchisee"
                                className="mj-leftslide mj-select-menu"
                                onChange={handleSelectChange.bind(this, 'treatment_franchisee')}
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

export default TreatmentInsuranceSelected
