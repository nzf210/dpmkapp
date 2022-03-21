// import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
    const [dtfilter, setdtfilter] = useState(false);
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
        <div className=' sm:mr-0 mx-auto sm:items-end sm:justify-end'>
            <div className='grid grid-cols-1'>
                <div className="">
                    <div className="flex border-grey-light border w-60 h-7 ">
                        <input className="w-full rounded ml-1 outline-indigo-600 px-2" type="text" placeholder="Nama Distrik ... " value={nmdis_input} onChange={setInputDistrik} />
                        <button className="bg-grey-lightest border-grey border-l shadow hover:bg-grey-lightest">
                            <span className="w-auto flex justify-end items-center text-grey hover:text-grey-darkest">
                                <i className="material-icons text-xl my-auto rounded-sm  hover:bg-slate-100" onClick={() => { bersihkanData() }}>{nmdis_input === '' ? null : <CloseIcon sx={{ fontSize: 15 }} color="secondary" className='-mt-2' />}</i>
                                <i className="material-icons text-xl my-auto rounded-sm  hover:bg-slate-100" onClick={() => {
                                    (dtfilter ? setdtfilter(false) : setdtfilter(true))
                                }}><ArrowDropDownIcon className='-mt-2' /></i>
                            </span>
                        </button>
                    </div>
                </div>
                {(filternamadis.length !== 0 || dtfilter) && (
                    <div>
                        <div className='absolute'>
                            <div className='w-60 bg-slate-100 rounded-sm'>
                                {filternamadis.slice(0, 10).map((val, key) => {
                                    return (<div
                                        className='cursor-pointer m-1 hover:bg-slate-300 w-full mx-auto px-2'
                                        onClick={(val) => {
                                            setnmdis_input(val.target.innerText); setFilternamadis([]);
                                        }}
                                        key={key}>{val.nama}</div>)
                                })}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default NamaDistrik