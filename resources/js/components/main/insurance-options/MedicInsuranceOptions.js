import React, { Fragment } from 'react'
import Select from 'react-select'
import Checkbox from 'rc-checkbox'
import CounterInput from 'react-counter-input'

const MedicInsuranceOptions = ({ discountMedicYears, formInputs, medicOrParamedic, residencyStatus, specialties, studentStatus, handleCheckboxChange, handleSelectChange }) =>
{
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-3 col-sm-6 col-12 mb-3 mb-md-0">
                    <div className="insurance-selection-select-with-label">
                        <Select options={ medicOrParamedic }
                                placeholder={"نوع"}
                                name="medicOrParamedic"
                                value={formInputs.medicOrParamedic}
                                onChange={handleSelectChange.bind(this, 'medicOrParamedic')}
                        />
                        <span className="insurance-selection-select-label">نوع</span>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-12 mb-3 mb-sm-0">
                    <div className="insurance-selection-select-with-label">
                        <Select options={ specialties }
                                placeholder={"تخصص پزشکی"}
                                name="specialty"
                                value={formInputs.specialty}
                                onChange={handleSelectChange.bind(this, 'specialty')}
                        />
                        <span className="insurance-selection-select-label">تخصص پزشکی</span>
                    </div>
                </div>
                {formInputs.medicOrParamedic.value == '1' &&
                    <div className="col-md-3 col-sm-6 col-12 mb-3 mb-md-0">
                        <div className="insurance-selection-select-with-label">
                            <Select options={ residencyStatus }
                                    placeholder={"وضعیت"}
                                    name="isResident"
                                    value={formInputs.isResident}
                                    onChange={handleSelectChange.bind(this, 'isResident')}
                            />
                            <span className="insurance-selection-select-label">وضعیت</span>
                        </div>
                    </div>
                }
                {formInputs.medicOrParamedic.value == '2' &&
                    <div className="col-md-3 col-sm-6 col-12 mb-3 mb-md-0">
                        <div className="insurance-selection-select-with-label">
                            <Select options={ studentStatus }
                                    placeholder={"وضعیت"}
                                    name="isStudent"
                                    value={formInputs.isStudent}
                                    onChange={handleSelectChange.bind(this, 'isStudent')}
                            />
                            <span className="insurance-selection-select-label">وضعیت</span>
                        </div>
                    </div>
                }
                <div className="col-md-3 col-sm-6 col-12 mb-0">
                    <div className="insurance-selection-select-with-label">
                        <Select options={ discountMedicYears }
                                placeholder={"سابقه عدم خسارت"}
                                name="prev_medic_ins_discount"
                                value={formInputs.prev_medic_ins_discount}
                                onChange={handleSelectChange.bind(this, 'prev_medic_ins_discount')}
                        />
                        <span className="insurance-selection-select-label">سابقه عدم خسارت</span>
                    </div>
                </div>
                {formInputs.medicOrParamedic.value == '1' &&
                    <div className="col-12 mt-3">
                        <div className="rtl text-right font-size-13">
                            <label htmlFor="beautySurgeryOption" className="cursor-pointer">
                                <Checkbox
                                    className="ml-2"
                                    checked={parseInt(formInputs.beautySurgeryOption)}
                                    name="beautySurgeryOption"
                                    id="beautySurgeryOption"
                                    onChange={handleCheckboxChange}
                                />
                                پوشش اعمال زیبایی
                            </label>
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default MedicInsuranceOptions
