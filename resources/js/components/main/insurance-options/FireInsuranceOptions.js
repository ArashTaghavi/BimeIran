import React, { Fragment } from 'react'
import Select from 'react-select'
import AdditionalInsuranceOption from './../partials/AdditionalInsuranceOption'

const FireInsuranceOptions = ({ formInputs, propertyType, toggleAdditionalOptions, handleSelectChange, handleInputChange, applyInputChange, handleOptionButton, formatAsMoney }) =>
{
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-select-with-label">
                        <Select options={ propertyType }
                                placeholder={"نوع ملک"}
                                name="property_type"
                                value={formInputs.property_type}
                                onChange={handleSelectChange.bind(this, 'property_type')}
                        />
                        <span className="insurance-selection-select-label">نوع ملک</span>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-input-with-label">
                        <input type="text"
                               name="area"
                               className="form-control"
                               placeholder="متراژ مورد بیمه"
                               value={formInputs.area}
                               onChange={handleInputChange}
                        />
                        <span className="apply-change-btn" onClick={applyInputChange}>اعمال</span>
                        <span className="insurance-selection-input-label">متر</span>
                        <span className="insurance-selection-select-label">متراژ</span>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12 mb-3">
                    <div className="insurance-selection-select-with-label">
                        <input type="text"
                               name="furniture_value"
                               className="form-control"
                               placeholder="ارزش کلیه لوازم"
                               value={formInputs.furniture_value}
                               onChange={handleInputChange}
                               onKeyUp={formatAsMoney}
                               onFocus={formatAsMoney}
                        />
                        <span className="apply-change-btn" onClick={applyInputChange}>اعمال</span>
                        <span className="insurance-selection-input-label">تومان</span>
                        <span className="insurance-selection-select-label">ارزش کلیه لوازم</span>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <h6 className="d-none d-sm-block">پوشش های اضافی:</h6>
                <div className="text-center d-block d-sm-none">
                    <button className="btn btn-warning" id="additional-option-toggler" onClick={toggleAdditionalOptions}><i className="fa fa-bars ml-2"></i>پوشش های اضافی</button>
                </div>
                <div className="additional-options mt-3 mt-sm-0">
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasEarthquakeOption'} label={'زلزله و آتشفشان'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasPipeBurstOption'} label={'ترکیدگی لوله'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasLandslideOption'} label={'نشست زمین'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasPlainCrashOption'} label={'سقوط هواپیما'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasFloodOption'} label={'سیل'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasStormOption'} label={'طوفان'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasStealingOption'} label={'سرقت ناشی از شکست حرز'} />
                    <AdditionalInsuranceOption handleOptionButton={handleOptionButton} name={'hasRainingOption'} label={'ضایعات ناشی از برف و باران'} />
                </div>
            </div>
        </Fragment>
    )
}

export default FireInsuranceOptions
