import React from 'react'

const Slideshow = () =>
{
    return (
        <section className="mj-carousel">
            <div id="main-carousel" className="carousel carousel-fade slide" data-ride="carousel" data-interval="8000" data-pause="false">
                <div className="carousel-inner text-left">
                    <div className="carousel-item mj-carousel-item-01 active"></div>
                </div>
            </div>
        </section>
    )
}

export default Slideshow
