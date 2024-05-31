import React from 'react'
import CircleBG from '../../../../../assets/images/dashboard/circle.svg'

const MainBanner = () => {
    return (
        <>
            <div className="row">
                <div className='col-md-12'>
                    <div className='card css-cg5djk card-img-holder text-white'>
                        <div className="card-body">
                            <img src={CircleBG} className="card-img-absolute" alt="circle" />
                            <h2 class="MuiTypography-root MuiTypography-h2 css-bt9g5a">Cisco Social Impact Office</h2>
                            <p className='mnBannerHeading'> 
                                Cisco is a global technology company known not only for its products and services but also for its commitment to social justice.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainBanner
