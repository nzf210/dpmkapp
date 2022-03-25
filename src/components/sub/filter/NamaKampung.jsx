import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import { useSelector } from "react-redux";
import { mkamdisSelector } from '../../../features/FilterSlice';


const NamaKampung = ({ setDis }) => {

    const kam = useSelector(mkamdisSelector.selectAll);
    const dt = [{ id: 0, kampung: '', kd_kampung: 0, distrik: '', kd_distrik: 0 }]
    kam.map((d) => { return dt.push(d) })
    const kampung = dt;

    const [selected, setSelected] = useState(kampung[0]);
    const [query, setQuery] = useState('');
    const [closeicon, setCloseicon] = useState(false);

    const filteredKampung =
        query === '' ? kampung : kampung.filter((dis) =>
            dis.kampung.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));

    const clearinput = () => {
        setSelected(kampung[0]);
        setCloseicon(false);
    }

    return (
        <div className="w-72 top-20 border rounded-lg cursor-pointer">
            <Combobox value={selected} onChange={(e) => { setSelected(e); setDis(e); }} >
                <div className="mt-1">
                    <div className="flex flex-row w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                        <Combobox.Input placeholder='Nama Kampung ... '
                            className="w-full border-none focus:ring-2 py-2 pl-2 pr-1 text-sm leading-5 text-gray-900 active:ring-0 focus:border-none focus:outline-none focus:ring-cyan-600"
                            displayValue={(kampung) => kampung.kampung}
                            onChange={(e) => { setQuery(e.target.value); setCloseicon(true); console.log(e.target.value) }}
                        />
                        <div className='mt-[5.2px] cursor-pointer' onClick={clearinput} > {closeicon ? <CloseIcon /> : null}  </div>
                        <Combobox.Button className="inset-y-0 right-0 flex items-center">
                            <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <div className='absolute w-72'>
                            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredKampung.length === 0 && query !== '' ? (<div className="cursor-default select-none py-2 px-4 text-gray-700">Tidak di temukan.</div>)
                                    : (
                                        filteredKampung.map((dis) => (
                                            <Combobox.Option
                                                key={dis.id}
                                                className={({ active }) => `cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-white bg-slate-600' : 'text-gray-900'}`}
                                                value={dis}
                                                onChange={() => { console.log('on Change') }}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <div className='' >
                                                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                                                            //   selected={(e) => { setKd_distrik(dis.distrik); setDis(dis.distrik) }}
                                                            > {dis.kampung}</span>
                                                            {selected ? (
                                                                <span className={`inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-slate-600'}`} >
                                                                    <span> <CheckIcon className="absolute w-5 h-5 left-3 -mt-5 " aria-hidden="true" /></span>
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                            </Combobox.Options>
                        </div>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default NamaKampung;


// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import CloseIcon from '@mui/icons-material/Close';
// import { useState } from 'react';

// const NamaKampung = () => {

//     const dt = [
//         {
//             id: 1,
//             nama: "Syahril 1",
//             kerja: "Tidur"

//         },
//         {
//             id: 2,
//             nama: "Syahril 2",
//             kerja: "Tidur"

//         },
//         {
//             id: 3,
//             nama: "Syahril 3",
//             kerja: "Tidur"

//         },
//         {
//             id: 4,
//             nama: "Syahril 4",
//             kerja: "Tidur"

//         },
//         {
//             id: 5,
//             nama: "Syahril 5",
//             kerja: "Tidur"

//         },
//         {
//             id: 6,
//             nama: "Syahril 6",
//             kerja: "Tidur"

//         },
//         {
//             id: 7,
//             nama: "Syahril 7",
//             kerja: "Tidur"

//         },
//         {
//             id: 8,
//             nama: "Syahril 8",
//             kerja: "Tidur"

//         },
//         {
//             id: 9,
//             nama: "Syahril 9",
//             kerja: "Tidur"

//         },
//         {
//             id: 10,
//             nama: "Syahril 10",
//             kerja: "Tidur"

//         },
//         {
//             id: 11,
//             nama: "Syahril 11",
//             kerja: "Tidur"

//         },

//     ]

//     const [nmdis_input, setnmdis_input] = useState('');
//     const [dtfilter, setdtfilter] = useState(false);
//     const [filternamadis, setFilternamadis] = useState([]);


//     const setInputkampung = (val) => {
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

//     let nm = true;

//     return (
//         <div className='mx-auto'>
//             <div className='grid grid-cols-1'>
//                 <div className=''>
//                     <div className="flex border-grey-light border w-60 h-7 ">
//                         <input className="w-full rounded ml-1 outline-indigo-600 px-2" type="text" placeholder="Nama Kampung ... " value={nmdis_input} onChange={setInputDistrik} />
//                         <button className="bg-grey-lightest border-grey border-l shadow hover:bg-grey-lightest">
//                             <span className="w-auto flex justify-end items-center text-grey hover:text-grey-darkest">
//                                 <i className="material-icons text-xl my-auto rounded-sm  hover:bg-slate-100" onClick={() => { bersihkanData() }}>{nmdis_input === '' ? null : <CloseIcon sx={{ fontSize: 15 }} color="secondary" className='-mt-2' />}</i>
//                                 <i className="material-icons text-xl my-auto rounded-sm  hover:bg-slate-100" onClick={() => {
//                                     (dtfilter ? setdtfilter(false) : setdtfilter(true))
//                                 }}><ArrowDropDownIcon className='-mt-2' /></i>
//                             </span>
//                         </button>
//                     </div>
//                 </div>
//                 {(filternamadis.length !== 0 || dtfilter) && (
//                     <div className="" >
//                         <div className='absolute'>
//                             <div className='w-60 bg-slate-100 rounded-sm'>
//                                 {filternamadis.slice(0, 10).map((val, key) => {
//                                     return (<div
//                                         className='cursor-pointer m-1 hover:bg-slate-300 w-full mx-auto px-2'
//                                         onClick={(val) => {
//                                             setnmdis_input(val.target.innerText); setFilternamadis([]);
//                                         }}
//                                         key={key}>{val.nama}</div>)
//                                 })}
//                             </div>
//                         </div>
//                     </div>)
//                 }
//             </div>
//         </div>
//     )
// }

// export default NamaKampung;

// // // import SearchIcon from '@mui/icons-material/Search';
// // import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// // import CloseIcon from '@mui/icons-material/Close';
// // import { useState } from 'react';

// // const NamaKampung = () => {

// //     const dt = [
// //         {
// //             id: 1,
// //             nama: "Kampung 1",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 2,
// //             nama: "Kampung 2",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 3,
// //             nama: "Kampung 3",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 4,
// //             nama: "Kampung 4",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 5,
// //             nama: "Kampung 5",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 6,
// //             nama: "Kampung 6",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 7,
// //             nama: "Kampung 7",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 8,
// //             nama: "Kampung 8",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 9,
// //             nama: "Kampung 9",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 10,
// //             nama: "Kampung 10",
// //             kerja: "Tidur"

// //         },
// //         {
// //             id: 11,
// //             nama: "Kampung 11",
// //             kerja: "Tidur"

// //         },

// //     ]

// //     const [nmdis_input, setnmdis_input] = useState('');
// //     const [filternamadis, setFilternamadis] = useState([]);


// //     const setInputDistrik = (val) => {
// //         console.log('ubah');
// //         const carikata = val.target.value;
// //         setnmdis_input(carikata);
// //         const databaru = dt.filter((val_) => {
// //             return val_.nama.toLowerCase().includes(carikata.toLowerCase());
// //         });

// //         if (carikata === "") {
// //             setFilternamadis([])
// //         } else {
// //             setFilternamadis(databaru);
// //         }
// //     }

// //     function bersihkanData() {
// //         setFilternamadis([]);
// //         setnmdis_input('');
// //     }

// //     return (
// //         <div>
// //             <div className='grid grid-cols-1'>
// //                 <div className="flex placeholder:text-slate-500 sm:pr-0 mx-auto sm:ml-2">
// //                     <input type="text" className='outline-none pr-5 pl-2 rounded-sm shadow-lg border-2 border-slate-300 active:ring active:ring-blue-300 transition focus:ring-blue-400' placeholder='Nama Kampung' value={nmdis_input} onChange={setInputDistrik} />
// //                     <div className="searchIcon"><span className='rotate-90 -ml-6'>
// //                         {nmdis_input === '' ? <ChevronRightIcon className='h-5 cursor-pointer' style={{ transform: 'rotate(90deg)' }} />
// //                             : <CloseIcon className='h-3 cursor-pointer' onClick={() => {
// //                                 bersihkanData()
// //                             }} />
// //                         }
// //                     </span></div>
// //                 </div>
// //                 {filternamadis.length !== 0 && (
// //                     <div className="mx-auto bg-slate-200 w-52 h-64 rounded-sm shadow-lg sm:ml-2 absolute mt-7" >
// //                         {filternamadis.slice(0, 3).map((val, key) => {
// //                             return (<div
// //                                 className='cursor-pointer m-1 hover:bg-slate-300'
// //                                 onClick={(val) => {
// //                                     setnmdis_input(val.target.innerText); setFilternamadis([]);
// //                                 }}
// //                                 key={key}>{val.nama}</div>)
// //                         })}
// //                     </div>)
// //                 }
// //             </div>
// //         </div>
// //     )
// // }

// // export default NamaKampung;


// // /*{
// //     <div className="sm:-translate-x-10 sm:pr-80">
// //     <div className='grid grid-cols-1'>
// //         <div className="items-center justify-center mx-auto flex  border-2 border-blue-700 placeholder:text-slate-500">
// //             <input type="text" className='outline-none pr-5 pl-2 rounded-sm' placeholder='Nama Kampung' value={nmdis_input} onChange={setInputDistrik} />
// //             <div className="searchIcon"><span className='rotate-90 -ml-6'>
// //                 {nmdis_input === '' ? <ChevronRightIcon className='h-5 cursor-pointer' style={{ transform: 'rotate(90deg)' }} />
// //                     : <CloseIcon className='h-5 cursor-pointer' onClick={() => {
// //                         bersihkanData()
// //                     }} />
// //                 }
// //             </span></div>
// //         </div>
// //         {filternamadis.length != 0 && (
// //             <ul className="mx-auto justify-start items-start bg-slate-200 w-52 h-64 rounded-sm shadow-lg" >
// //                 {filternamadis.slice(0, 3).map((val, key) => {
// //                     return (<li
// //                         className='cursor-pointer m-1 hover:bg-slate-300'
// //                         onClick={(val) => {
// //                             setnmdis_input(val.target.innerText); setFilternamadis([]);
// //                         }}
// //                         key={key}>{val.nama}</li>)
// //                 })}
// //             </ul>)
// //         }
// //     </div>
// // </div>
// // }*/