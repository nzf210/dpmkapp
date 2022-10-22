import React, { useState } from "react";


let a;
let tw = new Date();
if (tw.getTimezoneOffset() === 0) (a = tw.getTime() + (7 * 60 * 60 * 1000))
else (a = tw.getTime());
tw.setTime(a);
let tahun = tw.getFullYear();
let hari = tw.getDay();
let bulan = tw.getMonth();
let tanggal = tw.getDate();
let hariarray = ["Minggu,", "Senin,", "Selasa,", "Rabu,", "Kamis,", "Jum'at,", "Sabtu,"];
let bulanarray = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus",
    "September", "Oktober", "November", "Desember"];
let tgl_ = hariarray[hari] + " " + tanggal + " " + bulanarray[bulan] + " " + tahun;

const Header = () => {
    const [tgl] = useState(tgl_);
    return (
        < >
            <div className="flex flex-row justify-between px-4 h-9 items-center bg-slate-800 z-50">
                <span className="sm:font-extrabold sm:tracking-wider font-thin text-green-700">DPMK <span className="text-white font-thin sm:font-bold"> Kabupaten Yahukimo</span></span>
                <div className="">
                    <div className="flex flex-row">
                        <span className="hidden lg:block text-white font-light mr-3">Selamat Datang : </span>
                        <span className="hidden md:block text-slate-300 font-semibold" id="namauser"></span>
                    </div>
                </div>
                <span className="text-blue-200 sm:text-white font-thin sm:font-semibold" id="tanggalwaktu">{tgl}</span>
            </div>
        </>
    )
}

export default Header
