import React from 'react'

const DiscountBox = ({ formInputs, handleInputChange, applyInputChange }) =>
{
    return (
        <div className="card shadow border-0 mb-3 customer-discount-box">
            <div className="card-body p-3">
                <p className="font-size-12 d-none d-sm-block">در صورت داشتن کد تخفیف، آن را در کادر زیر وارد نمایید:</p>
                <div className="insurance-selection-select-with-label">
                    <input type="text"
                           name="customer_discount_code"
                           className="form-control font-size-13 text-center"
                           placeholder="کد تخفیف"
                           value={formInputs.customer_discount_code}
                           onChange={handleInputChange}
                    />
                    <span className="apply-change-btn" onClick={applyInputChange}>اعمال</span>
                    <span className="insurance-selection-select-label"><i className="fa fa-percent text-danger"></i></span>
                </div>
            </div>
        </div>
    )
}

export default DiscountBox
