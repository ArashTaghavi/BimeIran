import React from 'react'
import Select from 'react-select'

const ReceiverDetailForm = ({ cities, receiverInfo, provinces, user, handleReceiverInputChange, handleSelectChange }) =>
{
    return (
        <div className="dashboard-info-box personal-info-form">
            <div className="row align-row mb-3">
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="fullname">نام و نام خانوادگی تحویل گیرنده<span className="text-danger">*</span></label>
                    <input type="text" id="fullname" name="fullname" className="form-control" value={receiverInfo.fullname} onChange={handleReceiverInputChange}/>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="phone">شماره موبایل<span className="text-danger">*</span></label>
                    <input type="text" id="phone" name="phone" className="form-control" value={receiverInfo.phone} onChange={handleReceiverInputChange}/>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="building_province">استان<span className="text-danger">*</span></label>
                    <Select options={ provinces }
                            placeholder={"استان"}
                            name="receiver_province"
                            className="mj-select-menu"
                            defaultValue={user.province_id ? { label: user.province.name, value: user.province.id } : ''}
                            onChange={handleSelectChange.bind(this, 'receiver_province')}
                    />
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="building_city">شهر<span className="text-danger">*</span></label>
                    <Select options={ cities }
                            placeholder={"شهر"}
                            name="receiver_city"
                            className="mj-select-menu"
                            defaultValue={user.city_id ? { label: user.city.name, value: user.city.id } : ''}
                            onChange={handleSelectChange.bind(this, 'receiver_city')}
                    />
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="section">منطقه شهری</label>
                    <input type="text" id="section" name="section" className="form-control" value={receiverInfo.section} onChange={handleReceiverInputChange}/>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                    <label htmlFor="landline_phone">تلفن ثابت<span className="text-danger">*</span></label>
                    <input type="text" id="landline_phone" name="landline_phone" className="form-control" value={receiverInfo.landline_phone} onChange={handleReceiverInputChange}/>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="postal_code">کد پستی</label>
                    <input type="text" id="postal_code" name="postal_code" className="form-control" value={receiverInfo.postal_code} onChange={handleReceiverInputChange}/>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="address">آدرس<span className="text-danger">*</span></label>
                    <textarea id="address" name="address" className="form-control" rows="3" value={receiverInfo.address} onChange={handleReceiverInputChange}></textarea>
                </div>
            </div>
        </div>
    )
}

export default ReceiverDetailForm
