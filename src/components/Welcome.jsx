import Yhk from '../public/yhk.png';
import React from 'react';

const Welcome = () => {
    return (
        <>
            <div className='min-h-screen w-full'>
                {/* <div className="h-36"></div> */}
                <div className='min-h-screen'>
                    <div className='container min-h-screen mx-auto rounded-xl'>
                        <div className='min-h-screen flex rounded-xl'>
                            <div className='flex w-full rounded-xl'>
                                <div className='my-auto mx-auto rounded-xl'>
                                    <div className='my-auto  rounded-xl'>
                                        <div className="container w-80 mx-auto sm:w-[720px] md:w-[920px] sm:h-[500px] rounded-xl shadow-2xl pt-10 sm:mt-0" id="child-utama">
                                            <img src={Yhk} alt="Yahukimo" className="w-72 mx-auto  sm:hidden" />
                                            <img src={Yhk} alt="Yahukimo" className="w-96 mx-auto  hidden sm:block" />
                                            <p className="justify-evenly text-center pt-4"> Selamat Datang - Aplikasi Pengeloaan Keuangan Kampung Kabupaten Yahukimo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome