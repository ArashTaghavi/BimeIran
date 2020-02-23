import React from 'react'
import Select from 'react-select'

const UserDetailForm = ({ birthday_days, calculationLoading, cities, humanReadableBirthday, provinces, user, handleProvinceChange, handleUserInputChange }) =>
{
    const months = [
        { label: 'فروردین', value: 1 },
        { label: 'اردیبهشت', value: 2 },
        { label: 'خرداد', value: 3 },
        { label: 'تیر', value: 4 },
        { label: 'مرداد', value: 5 },
        { label: 'شهریور', value: 6 },
        { label: 'مهر', value: 7 },
        { label: 'آبان', value: 8 },
        { label: 'آذر', value: 9 },
        { label: 'دی', value: 10 },
        { label: 'بهمن', value: 11 },
        { label: 'اسفند', value: 12 },
    ]

    const years = []
    for (let j = 1398; j >= 1300; j--) {
        years.push({ label: j, value: j })
    }

    return (
        <div className="dashboard-info-box personal-info-form">
            {!calculationLoading &&
                <div className="row align-row mb-3">
                    <div className="col-12 col-sm-6 mb-3">
                        <label htmlFor="fname">نام<span className="text-danger">*</span></label>
                        <input type="text" id="fname" name="fname" className="form-control" value={user.fname ? user.fname : ''} onChange={handleUserInputChange}/>
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                        <label htmlFor="lname">نام خانوادگی<span className="text-danger">*</span></label>
                        <input type="text" id="lname" name="lname" className="form-control" value={user.lname ? user.lname : ''} onChange={handleUserInputChange}/>
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                        <label htmlFor="national_code">کد ملی<span className="text-danger">*</span></label>
                        <input type="text" id="national_code" name="national_code" className="form-control" value={user.national_code ? user.national_code : ''} onChange={handleUserInputChange}/>
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                        <label htmlFor="birthday">تاریخ تولد<span className="text-danger">*</span></label>
                        <div className="row align-row no-gutters">
                            <div className="col-4 pr-1 pl-1">
                                <Select options={ birthday_days }
                                        placeholder={"روز"}
                                        name="birthday_day"
                                        defaultValue={user.birthday ? { label: user.birthday.split('-')[2], value: user.birthday.split('-')[2] } : ''}
                                />
                            </div>
                            <div className="col-4 pr-1 pl-1">
                                <Select options={ months }
                                        placeholder={"ماه"}
                                        name="birthday_month"
                                        defaultValue={user.birthday ? { label: humanReadableBirthday.split(' ')[1], value: user.birthday.split('-')[1] } : ''}
                                />
                            </div>
                            <div className="col-4 pr-1 pl-1">
                                <Select options={ years }
                                        placeholder={"سال"}
                                        name="birthday_year"
                                        defaultValue={user.birthday ? { label: user.birthday.split('-')[0], value: user.birthday.split('-')[0] } : ''}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                        <label htmlFor="email">ایمیل</label>
                        <input type="text" id="email" name="email" className="form-control" value={user.email ? user.email : ''} onChange={handleUserInputChange}/>
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                        <label htmlFor="job">شغل</label>
                        <input type="text" id="job" name="job" className="form-control" value={user.job ? user.job : ''} onChange={handleUserInputChange}/>
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                        <label htmlFor="province">استان</label>
                        <Select options={ provinces }
                                placeholder={"انتخاب استان"}
                                name="province"
                                defaultValue={user.province_id ? { label: user.province.name, value: user.province.id } : ''}
                                onChange={handleProvinceChange}
                        />
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                        <label htmlFor="city">شهر</label>
                        <Select options={ cities }
                                placeholder={"انتخاب شهر"}
                                name="city"
                                defaultValue={user.city_id ? { label: user.city.name, value: user.city.id } : ''}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="address">آدرس</label>
                        <textarea id="address" name="address" className="form-control" rows="3" value={user.address ? user.address : ''} onChange={handleUserInputChange}></textarea>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserDetailForm
