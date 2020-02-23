import React from 'react'
import feature_economic from '../../../../images/feature_economic.png'
import feature_quick from '../../../../images/feature_quick.png'
import feature_support from '../../../../images/feature_support.png'

const FeatureBoxes = () =>
{
    return (
        <div className="feature-boxes text-center pt-5 pb-5">
            <div className="container">
                <h2 className="mb-5">با ما به راحتی بیمه شوید</h2>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-12 mb-4">
                        <div className="card h-100">
                            <img src={feature_economic} alt="به صرفه بودن بیمه ایران"/>
                            <h5 className="mt-3">مقرون به صرفه</h5>
                            <p className="pr-3 pl-3">
                                برای خرید هر چی سریع تر بیمه درمان می تونی به راحتی در سایت ثبت نام کنی و با خرید بیمه، خیال خودتو راحت کنی
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 mb-4">
                        <div className="card h-100">
                            <img src={feature_quick} alt="صدور فوری بیمه نامه ایران"/>
                            <h5 className="mt-3">بیمه نامه حرفه ای</h5>
                            <p className="pr-3 pl-3">
                                برای اینکه با یک مشاوره حرفه ای مشورت کنی و براساس اون بیمه نامه حرفه ای انتخاب کنی میتونی از کارشناسان مجرب ما مشاوره حرفه ای بگیری
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 mb-4">
                        <div className="card h-100">
                            <img src={feature_support} alt="پشتیبانی 24 ساعته بیمه ایران"/>
                            <h5 className="mt-3">پشتیبانی 24 ساعته</h5>
                            <p className="pr-3 pl-3">
                                در هر زمانی که نیاز به پشتیبانی و راهنمایی داشتید، تعلل نکنید، تلفن را بردارید و با شماره مرکز تماس بگیرید. کارشناسان ما از دل و جان پاسخ گوی شما هستند.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureBoxes
