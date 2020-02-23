import React from 'react'

const InsuranceSelectionButton = ({ insurance, handleInsuranceSelect, persianTitle }) =>
{
    return (
        <div className="col-md-3 col-sm-4 col-6 mb-4">
            <div className="insurance-selection-button" data-insurance={insurance} onClick={handleInsuranceSelect}>
                <span className={`icon-insurance icon-${insurance} text-white`}></span>
                <h6>{persianTitle}</h6>
            </div>
        </div>
    )
}

export default InsuranceSelectionButton
