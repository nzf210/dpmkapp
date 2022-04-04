import React, { useEffect, useState } from "react";
import NamaDistrik from "../filter/NamaDistrik";
import NamaKampung from "../filter/NamaKampung";
import { useSelector } from 'react-redux';

const distrik = [
    { id: 0, distrik: '', kampung: '', kd_distrik: 0, kd_kampung: 0 }
]

const Filterkampung = () => {

    const [kamdis, setstate] = useState(distrik[0]);
    const [nmdis_, setNmdis_] = useState([]);
    const [disable, setDisable] = useState(true);
    const [kdkampung, setKdkampung] = useState('');
    const setDis = (e) => { setstate(e) };
    const nmdis = (e) => { setNmdis_(e); };

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2 } = useSelector(state => state.userLogin);

    //console.log('first nama', nama, kd_distrik, kd_kampung, kd_lvl1, kd_lvl2);
    useEffect(
        () => {
            if (kd_lvl1 === 1) { setDisable(false); }
            setKdkampung(kd_kampung);
        }
        , []
    )



    return (
        <div className="w-full sm:-mt-1 z-30">
            <div className=" container mx-auto">
                <div className=" container flex-auto sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 justify-center items-center grid grid-cols-1">
                    <div className="mx-auto col-span-2 lg:col-span-4 md:col-span-3 lg:mr-5">
                        < NamaDistrik kamdis={kamdis} nmdis={nmdis} disable={disable} />
                    </div>
                    <div className="mx-auto col-span-2 lg:col-span-4 md:col-span-3 lg:ml-5">
                        < NamaKampung setDis={setDis} setstate={setstate} nmdis_={nmdis_} disable={disable} kdkampung={kdkampung} />
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Filterkampung