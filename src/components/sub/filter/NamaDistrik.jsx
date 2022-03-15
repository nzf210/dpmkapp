// import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const NamaDistrik = () => {

    const dt = [
        {
            id: 1,
            nama: "Syahril 1",
            kerja: "Tidur"

        },
        {
            id: 2,
            nama: "Syahril 2",
            kerja: "Tidur"

        },
        {
            id: 3,
            nama: "Syahril 3",
            kerja: "Tidur"

        },
        {
            id: 4,
            nama: "Syahril 4",
            kerja: "Tidur"

        },
        {
            id: 5,
            nama: "Syahril 5",
            kerja: "Tidur"

        },
        {
            id: 6,
            nama: "Syahril 6",
            kerja: "Tidur"

        },
        {
            id: 7,
            nama: "Syahril 7",
            kerja: "Tidur"

        },
        {
            id: 8,
            nama: "Syahril 8",
            kerja: "Tidur"

        },
        {
            id: 9,
            nama: "Syahril 9",
            kerja: "Tidur"

        },
        {
            id: 10,
            nama: "Syahril 10",
            kerja: "Tidur"

        },
        {
            id: 11,
            nama: "Syahril 11",
            kerja: "Tidur"

        },

    ]

    const [nmdis_input, setnmdis_input] = useState('');
    const [filternamadis, setFilternamadis] = useState([]);


    const setInputDistrik = (val) => {
        console.log('ubah');
        const carikata = val.target.value;
        setnmdis_input(carikata);
        const databaru = dt.filter((val_) => {
            return val_.nama.toLowerCase().includes(carikata.toLowerCase());
        });

        if (carikata === "") {
            setFilternamadis([])
        } else {
            setFilternamadis(databaru);
        }
    }

    function bersihkanData() {
        setFilternamadis([]);
        setnmdis_input('');
    }

    return (
        <div>
            <div className='grid grid-cols-1 items-end mr-0'>
                <div className="flex placeholder:text-slate-500 sm:pr-0 mx-auto sm:mr-2">
                    <input type="text" className='outline-none pr-5 pl-2 rounded-sm shadow-lg border-2 border-slate-300 active:ring active:ring-blue-300 transition focus:ring-blue-400 ' placeholder='Nama Distrik' value={nmdis_input} onChange={setInputDistrik} />
                    <div className="searchIcon"><span className='rotate-90 -ml-6'>
                        {nmdis_input === '' ? <ChevronRightIcon className='h-5 cursor-pointer' style={{ transform: 'rotate(90deg)' }} />
                            : <CloseIcon className='h-3 w-3 cursor-pointer' onClick={() => {
                                bersihkanData()
                            }} />
                        }
                    </span></div>
                </div>
                {filternamadis.length !== 0 && (
                    <div className="mx-auto bg-slate-200 w-52 h-64 overflow-hidden rounded-sm shadow-lg sm:mr-2" >
                        {filternamadis.slice(0, 3).map((val, key) => {
                            return (<div
                                className='cursor-pointer m-1 hover:bg-slate-300'
                                onClick={(val) => {
                                    setnmdis_input(val.target.innerText); setFilternamadis([]);
                                }}
                                key={key}>{val.nama}</div>)
                        })}
                    </div>)
                }
            </div>
        </div>
    )
}

export default NamaDistrik