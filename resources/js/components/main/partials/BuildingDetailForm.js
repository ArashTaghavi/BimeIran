import React from 'react'
import Select from 'react-select'

const BuildingDetailForm = ({ cities, formInputs, provinces, handleInputChange, handleSelectChange }) =>
{
    return (
        <div className="dashboard-info-box personal-info-form">
            <div className="row align-row mb-3">
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="building_province">استان<span className="text-danger">*</span></label>
                    <Select options={ provinces }
                            placeholder={"استان"}
                            name="building_province"
                            className="mj-select-menu"
                            onChange={handleSelectChange.bind(this, 'building_province')}
                    />
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="building_city">شهر<span className="text-danger">*</span></label>
                    <Select options={ cities }
                            placeholder={"شهر"}
                            name="building_city"
                            className="mj-select-menu"
                            onChange={handleSelectChange.bind(this, 'building_city')}
                    />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="building_address">آدرس<span className="text-danger">*</span></label>
                    <textarea id="building_address" name="building_address" className="form-control" rows="3" value={formInputs.building_address} onChange={handleInputChange}></textarea>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="building_postal_code">کد پستی<span className="text-danger">*</span></label>
                    <input type="text" id="building_postal_code" name="building_postal_code" className="form-control" value={formInputs.building_postal_code} onChange={handleInputChange}/>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="building_level_qty">تعداد طبقات ساختمان<span className="text-danger">*</span></label>
                    <input type="text" id="building_level_qty" name="building_level_qty" className="form-control" value={formInputs.building_level_qty} onChange={handleInputChange}/>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="building_age">سن ساختمان<span className="text-danger">*</span></label>
                    <input type="text" id="building_age" name="building_age" className="form-control" value={formInputs.building_age} onChange={handleInputChange}/>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="building_level">طبقه ساختمان<span className="text-danger">*</span></label>
                    <input type="text" id="building_level" name="building_level" className="form-control" value={formInputs.building_level} onChange={handleInputChange}/>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="building_unit">واحد ساختمان<span className="text-danger">*</span></label>
                    <input type="text" id="building_unit" name="building_unit" className="form-control" value={formInputs.building_unit} onChange={handleInputChange}/>
                </div>
            </div>
            <div className="alert alert-warning font-size-13 text-center mb-3">
                <i className="fa fa-exclamation-triangle ml-2"></i>
                این بیمه نامه برای اماکن با کاربری تجاری یا اداری معتبر نمی باشد.
            </div>
        </div>
    )
}

export default BuildingDetailForm
