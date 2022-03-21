// import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const NamaKampung = () => {

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

    let nm = true;

    return (
        <div className='mx-auto'>
            <div className='grid grid-cols-1'>
                <div className=''>
                    <div className="flex border-grey-light border w-60 h-7 ">
                        <input className="w-full rounded ml-1 outline-indigo-600 px-2" type="text" placeholder="Nama Kampung ... " value={nmdis_input} onChange={setInputDistrik} />
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
                    <div className="" >
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

export default NamaKampung;

// // import SearchIcon from '@mui/icons-material/Search';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import CloseIcon from '@mui/icons-material/Close';
// import { useState } from 'react';

// const NamaKampung = () => {

//     const dt = [
//         {
//             id: 1,
//             nama: "Kampung 1",
//             kerja: "Tidur"

//         },
//         {
//             id: 2,
//             nama: "Kampung 2",
//             kerja: "Tidur"

//         },
//         {
//             id: 3,
//             nama: "Kampung 3",
//             kerja: "Tidur"

//         },
//         {
//             id: 4,
//             nama: "Kampung 4",
//             kerja: "Tidur"

//         },
//         {
//             id: 5,
//             nama: "Kampung 5",
//             kerja: "Tidur"

//         },
//         {
//             id: 6,
//             nama: "Kampung 6",
//             kerja: "Tidur"

//         },
//         {
//             id: 7,
//             nama: "Kampung 7",
//             kerja: "Tidur"

//         },
//         {
//             id: 8,
//             nama: "Kampung 8",
//             kerja: "Tidur"

//         },
//         {
//             id: 9,
//             nama: "Kampung 9",
//             kerja: "Tidur"

//         },
//         {
//             id: 10,
//             nama: "Kampung 10",
//             kerja: "Tidur"

//         },
//         {
//             id: 11,
//             nama: "Kampung 11",
//             kerja: "Tidur"

//         },

//     ]

//     const [nmdis_input, setnmdis_input] = useState('');
//     const [filternamadis, setFilternamadis] = useState([]);


//     const setInputDistrik = (val) => {
//         console.log('ubah');
//         const carikata = val.target.value;
//         setnmdis_input(carikata);
//         const databaru = dt.filter((val_) => {
//             return val_.nama.toLowerCase().includes(carikata.toLowerCase());
//         });

//         if (carikata === "") {
//             setFilternamadis([])
//         } else {
//             setFilternamadis(databaru);
//         }
//     }

//     function bersihkanData() {
//         setFilternamadis([]);
//         setnmdis_input('');
//     }

//     return (
//         <div>
//             <div className='grid grid-cols-1'>
//                 <div className="flex placeholder:text-slate-500 sm:pr-0 mx-auto sm:ml-2">
//                     <input type="text" className='outline-none pr-5 pl-2 rounded-sm shadow-lg border-2 border-slate-300 active:ring active:ring-blue-300 transition focus:ring-blue-400' placeholder='Nama Kampung' value={nmdis_input} onChange={setInputDistrik} />
//                     <div className="searchIcon"><span className='rotate-90 -ml-6'>
//                         {nmdis_input === '' ? <ChevronRightIcon className='h-5 cursor-pointer' style={{ transform: 'rotate(90deg)' }} />
//                             : <CloseIcon className='h-3 cursor-pointer' onClick={() => {
//                                 bersihkanData()
//                             }} />
//                         }
//                     </span></div>
//                 </div>
//                 {filternamadis.length !== 0 && (
//                     <div className="mx-auto bg-slate-200 w-52 h-64 rounded-sm shadow-lg sm:ml-2 absolute mt-7" >
//                         {filternamadis.slice(0, 3).map((val, key) => {
//                             return (<div
//                                 className='cursor-pointer m-1 hover:bg-slate-300'
//                                 onClick={(val) => {
//                                     setnmdis_input(val.target.innerText); setFilternamadis([]);
//                                 }}
//                                 key={key}>{val.nama}</div>)
//                         })}
//                     </div>)
//                 }
//             </div>
//         </div>
//     )
// }

// export default NamaKampung;


// /*{
//     <div className="sm:-translate-x-10 sm:pr-80">
//     <div className='grid grid-cols-1'>
//         <div className="items-center justify-center mx-auto flex  border-2 border-blue-700 placeholder:text-slate-500">
//             <input type="text" className='outline-none pr-5 pl-2 rounded-sm' placeholder='Nama Kampung' value={nmdis_input} onChange={setInputDistrik} />
//             <div className="searchIcon"><span className='rotate-90 -ml-6'>
//                 {nmdis_input === '' ? <ChevronRightIcon className='h-5 cursor-pointer' style={{ transform: 'rotate(90deg)' }} />
//                     : <CloseIcon className='h-5 cursor-pointer' onClick={() => {
//                         bersihkanData()
//                     }} />
//                 }
//             </span></div>
//         </div>
//         {filternamadis.length != 0 && (
//             <ul className="mx-auto justify-start items-start bg-slate-200 w-52 h-64 rounded-sm shadow-lg" >
//                 {filternamadis.slice(0, 3).map((val, key) => {
//                     return (<li
//                         className='cursor-pointer m-1 hover:bg-slate-300'
//                         onClick={(val) => {
//                             setnmdis_input(val.target.innerText); setFilternamadis([]);
//                         }}
//                         key={key}>{val.nama}</li>)
//                 })}
//             </ul>)
//         }
//     </div>
// </div>
// }*/