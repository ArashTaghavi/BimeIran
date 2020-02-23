import React from 'react'

const AdditionalInsuranceOption = ({ label, name, handleOptionButton }) =>
{
    return (
        <button onClick={handleOptionButton}
                className="btn-ins-option mb-2 mr-1 ml-1"
                data-name={name}
                data-value="1"
                data-persian={label}>
            {label}
        </button>
    )
}

export default AdditionalInsuranceOption
