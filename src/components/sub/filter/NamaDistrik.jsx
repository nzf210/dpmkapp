import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

//Redux
import { useSelector } from "react-redux";
import { mkamdisSelector } from '../../../features/FilterSlice';

const NamaDistrik = ({ kamdis, nmdis }) => {

    const dis = useSelector(mkamdisSelector.selectAll);
    const dt = [{ id: 0, kampung: '', kd_kampung: 0, distrik: '', kd_distrik: 0 }];
    dis.map((d) => { return dt.push(d) })
    const dis_ = dt.map(e => e.distrik);
    const data = dis_.filter((e, i) => dis_.indexOf(e) === i);
    const distrik = data;
    const [selected, setSelected] = useState(distrik[0]);
    const [query, setQuery] = useState('');
    const [closeicon, setCloseicon] = useState(false);


    const filteredDistrik =
        query === '' ? distrik : distrik.filter((dis) =>
            dis.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));

    useEffect(() => {
        if (kamdis !== 'undefined') {
            setSelected(kamdis.distrik);
        } return
    }, [kamdis]);

    useEffect(() => {
        dataKampung();
        //clearinput();
    }, []);



    const clearinput = () => {
        setSelected(distrik[0]);
        setCloseicon(false);
    }

    function dataKampung(a) {
        const da = dis.filter((e) => e.distrik === a)
        const dt = [{ id: 0, kampung: '', kd_kampung: 0, distrik: '', kd_distrik: 0 }];
        da.map((d) => { return dt.push(d) });
        nmdis(dt);
    }

    return (
        <div className="w-72 top-20 cursor-pointer">
            <Combobox value={selected} onChange={(e) => { setSelected(e); dataKampung(e) }}>
                <div className="mt-1">
                    <div className="flex flex-row w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                        <Combobox.Input placeholder='Nama Distrik ... '
                            className="w-full border-none focus:ring-2 py-2 pl-2 pr-1 text-sm leading-5 text-gray-900 active:ring-0 focus:border-none focus:outline-none focus:ring-cyan-600"
                            displayValue={(distrik) => distrik}
                            onChange={(e) => { setQuery(e.target.value); setCloseicon(true); }}
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
                                {filteredDistrik.length === 0 && query !== '' ? (<div className="cursor-default select-none py-2 px-4 text-gray-700">Tidak di temukan.</div>)
                                    : (
                                        filteredDistrik.map((dis) => (
                                            <Combobox.Option
                                                key={dis}
                                                className={({ active }) => `cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-white bg-slate-600' : 'text-gray-900'}`}
                                                value={dis} >
                                                {({ selected, active }) => (
                                                    <>
                                                        <div className=''>
                                                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}> {dis}</span>
                                                            {selected ? (
                                                                <span className={`inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-slate-600'}`} >
                                                                    <span className='bg-red-200'> {dis.distrik === '' ? null : <CheckIcon className="absolute w-5 h-5 left-3 -mt-5 " aria-hidden="true" />} </span>
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

export default NamaDistrik;




// import CloseIcon from '@mui/icons-material/Close';
// import { Fragment, useEffect, useState } from 'react';
// import { Combobox, Transition } from '@headlessui/react';
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

// //Redux
// import { useSelector } from "react-redux";
// import { mkamdisSelector } from '../../../features/FilterSlice';

// const distrik = [
//     { id: 0, distrik: '', kampung: '', kd_distrik: 0, kd_kampung: 0 }
// ]

// const NamaDistrik = ({ kamdis }) => {

//     const distrik_ = useSelector(mkamdisSelector.selectAll);
//     //const dis_ = distrik.map(e => e.distrik);

//     console.log(distrik_)

//     const { a, b, c, d } = distrik_;
//     console.log(a);
//     const [selected, setSelected] = useState(distrik[0]);
//     const [query, setQuery] = useState('');
//     const [closeicon, setCloseicon] = useState(false);

//     const filteredDistrik =
//         query === '' ? distrik : distrik.filter((dis) =>
//             dis.distrik.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));

//     useEffect(() => {
//         if (kamdis !== 'undefined') {
//             setSelected(kamdis);
//         } return
//     }, [kamdis]);

//     const clearinput = () => {
//         setSelected(distrik[0]);
//         setCloseicon(false);
//     }

//     return (

//         <div className="w-72 top-20 cursor-pointer">
//             <Combobox value={selected} onChange={setSelected}>
//                 <div className="mt-1">
//                     <div className="flex flex-row w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
//                         <Combobox.Input placeholder='Nama Distrik ... '
//                             className="w-full border-none focus:ring-2 py-2 pl-2 pr-1 text-sm leading-5 text-gray-900 active:ring-0 focus:border-none focus:outline-none focus:ring-cyan-600"
//                             displayValue={(distrik) => distrik.distrik}
//                             onChange={(e) => { setQuery(e.target.value); setCloseicon(true); }}
//                         />
//                         <div className='mt-[5.2px] cursor-pointer' onClick={clearinput} > {closeicon ? <CloseIcon /> : null}  </div>
//                         <Combobox.Button className="inset-y-0 right-0 flex items-center">
//                             <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
//                         </Combobox.Button>
//                     </div>
//                     <Transition
//                         as={Fragment}
//                         leave="transition ease-in duration-100"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                         afterLeave={() => setQuery('')}
//                     >
//                         <div className='absolute w-72'>
//                             <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                                 {filteredDistrik.length === 0 && query !== '' ? (<div className="cursor-default select-none py-2 px-4 text-gray-700">Tidak di temukan.</div>)
//                                     : (
//                                         filteredDistrik.map((dis) => (
//                                             <Combobox.Option
//                                                 key={dis.id}
//                                                 className={({ active }) => `cursor-default select-none py-2 pl-10 pr-4 ${active ? 'text-white bg-slate-600' : 'text-gray-900'}`}
//                                                 value={dis} >
//                                                 {({ selected, active }) => (
//                                                     <>
//                                                         <div className=''>
//                                                             <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}> {dis.nama}</span>
//                                                             {selected ? (
//                                                                 <span className={`inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-slate-600'}`} >
//                                                                     <span className='bg-red-200'> {dis.id === 0 ? null : <CheckIcon className="absolute w-5 h-5 left-3 -mt-5 " aria-hidden="true" />} </span>
//                                                                 </span>
//                                                             ) : null}
//                                                         </div>
//                                                     </>
//                                                 )}
//                                             </Combobox.Option>
//                                         ))
//                                     )}
//                             </Combobox.Options>
//                         </div>
//                     </Transition>
//                 </div>
//             </Combobox>
//         </div>
//     )
// }

// export default NamaDistrik;


