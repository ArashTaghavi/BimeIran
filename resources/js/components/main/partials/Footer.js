import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import logo from '../../../../images/logo.png'

export default class Footer extends Component
{
    render()
    {
        const { companyInfo } = this.props

        return (
            <footer className="footer">
                <div className="footer-a">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-12 mb-4">
                                <Link to={'/'} className="mb-4">
                                    <img src={logo} alt="Logo"/>
                                </Link>
                                <p className="mb-0">
                                    شركت خدمـات بیمه ای سروش اقتصاد (کد 3080) با پشتوانه تجربه مدیران خود، در ادامه فعالیت نمایندگی کد 4627 پس از تجربه ده ساله نمایندگی حقیقی شركت بیمه ایران در تـاریخ سوم مهر ماه یكهـزار و سیصد و هشتاد و پنج خورشیـدی تحـت شماره 269313 ثبت و بعنوان نماینده حقوقی (شرکت خدمات بیمه ای) فعالیت خـود را رسما آغاز نمود و توانست در همان سه سال نخست، در ردیف شركتهای نمایندگی درجه یك بیمه ایران قرار گیرد.
                                </p>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <h5 className="mb-2">خدمات ما</h5>
                                <div className="row">
                                    <div className="col-6 mb-4">
                                        <a href="#">بیمه شخص ثالث</a>
                                        <a href="#">بیمه بدنه</a>
                                        <a href="#">بیمه موتور</a>
                                        <a href="#">بیمه مسافرتی</a>
                                        <a href="#">بیمه عمر</a>
                                    </div>
                                    <div className="col-6 mb-4">
                                        <a href="#">حوادث انفرادی</a>
                                        <a href="#">درمان تکمیلی</a>
                                        <a href="#">بیمه آتش سوزی</a>
                                        <a href="#">بیمه زلزله</a>
                                        <a href="#">بیمه مسئولیت پزشکان</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12 mb-4">
                                <h5 className="mb-2">موقعیت</h5>
                                <div className="row mb-4">
                                    <div className="col-lg-2 col-md-1 col-sm-2 col-3 text-center">
                                        <i className="fa fa-map-marker"></i>
                                    </div>
                                    <div className="col-lg-10 col-md-11 col-sm-10 col-9">
                                        <h6>موقعیت:</h6>
                                        <span>{companyInfo.address ? companyInfo.address : ''}</span>
                                    </div>
                                </div>
                                <h5 className="mb-2">مرکز تماس</h5>
                                <div className="row mb-4">
                                    <div className="col-lg-2 col-md-1 col-sm-2 col-3 text-center">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <div className="col-lg-10 col-md-11 col-sm-10 col-9">
                                        <h6>تماس بگیرید:</h6>
                                        <span className="ltr">{companyInfo.phone ? companyInfo.phone : ''}</span>
                                    </div>
                                </div>
                                <h5 className="mb-2">شبکه های اجتماعی</h5>
                                <div className="row mb-4">
                                    <div className="col-12 social-links">
                                        <a href={companyInfo.telegram ? companyInfo.telegram : '#'} target="_blank">
                                            <i className="fa fa-telegram"></i>
                                        </a>
                                        <a href={companyInfo.instagram ? companyInfo.instagram : '#'} target="_blank">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                        <a href={companyInfo.whatsapp ? companyInfo.whatsapp : '#'} target="_blank">
                                            <i className="fa fa-whatsapp"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-b">
                    <div className="container">
                        <div className="row align-row">
                            <div className="col-sm-8 col-12 text-sm-right text-center mb-2 mb-sm-0">
                                {new Date().getFullYear()} &copy; تمامی حقوق برای شرکت سروش اقتصاد محفوظ است.
                            </div>
                            <div className="col-sm-4 col-12 text-sm-left text-center developer-name">
                                Developed By <a href="https://t.me/mojtaba_namazi" target="_blank">MJ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
