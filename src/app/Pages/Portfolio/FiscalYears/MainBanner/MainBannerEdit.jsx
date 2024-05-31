import React, { useState } from 'react'
import CircleBG from '../../../../../assets/images/dashboard/circle.svg'
import { Input, Textarea  } from '@chakra-ui/react'
const MainBannerEdit = () => {
    const [textValue, setTextValue] = useState()

    const handleInputChange = () => {

    }

    return (
        <>
            <div className="row">
                <div className='col-md-12'>
                    <div className='card css-cg5djk card-img-holder text-white'>
                        <div className="card-body">
                            <img src={CircleBG} className="card-img-absolute" alt="circle" />
                            <h2 class="MuiTypography-root MuiTypography-h2 css-bt9g5a">
                                <Input placeholder='Basic usage' defaultValue={"Cisco Social Impact Office"} />
                            </h2>
                            <p className='mnBannerHeading'> 
                                <Textarea
                                    value={textValue}
                                    onChange={handleInputChange}
                                    placeholder='Here is a sample placeholder'
                                    defaultValue={"Cisco is a global technology company known not only for its products and services but also for its commitment to social justice."}
                                    size='sm'
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainBannerEdit
