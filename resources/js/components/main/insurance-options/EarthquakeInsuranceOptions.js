import React, { Fragment } from 'react'
import Select from 'react-select'
import AdditionalInsuranceOption from './../partials/AdditionalInsuranceOption'

const EarthquakeInsuranceOptions = ({ formInputs, propertyType, handleSelectChange, handleInputChange, applyInputChange, formatAsMoney }) =>
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
            <div className="alert alert-info font-size-13">
                بیمه زلزله در واقع بیمه آتش‌سوزی است که پوشش فرعی زلزله هم دارد. شرکت سروش اقتصاد به جهت تسهیل در خرید این نوع از بیمه آتش‌سوزی، پوشش زلزله را به صورت پیش‌فرض در این بیمه قرار داده است و تحت عنوان بیمه زلزله عرضه می‌کند. با خرید بیمه زلزله نیازی به خرید بیمه آتش سوزی ندارید.
            </div>
        </Fragment>
    )
}

export default EarthquakeInsuranceOptions
