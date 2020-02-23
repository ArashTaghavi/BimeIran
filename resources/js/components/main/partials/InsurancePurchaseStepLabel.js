import React from 'react'

const InsurancePurchaseStepLabel = ({ label, step, stepNumber }) =>
{
    return (
        <div className={step == stepNumber ? 'col-3 pr-1 pl-1 active-step' : 'col-3 pr-1 pl-1'}>
            <span className={step == stepNumber ? 'mj-circle-label active mb-2' : 'mj-circle-label mb-2'}>{stepNumber}</span>
            <h6 className="font-weight-normal mb-0">{label}</h6>
        </div>
    )
}

export default InsurancePurchaseStepLabel
