import React from 'react';
import tableIcons from './TableIcon';

import MaterialTable from 'material-table';
//import {read} from 'xlsx';
import * as XLSX from 'xlsx/xlsx.mjs';




const Table = ({ title, option, kolom, data, setKolom, setData }) => {

    const convertToJson = (head, data) => {
        const baris = []
        data.forEach(row => {
            let barisdata = {}
            row.forEach((el, i) => {
                barisdata[head[i]] = el;
            })
            baris.push(barisdata);
        })
        return baris;
    }

    const importXcel = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const bstr = e.target.result;
            const workBookXcel = XLSX.read(bstr, { type: "binary" })
            //Sheet Pertama
            const namaWorkSheet = workBookXcel.SheetNames[0];
            const workSheet = workBookXcel.Sheets[namaWorkSheet];
            //convert data ke Array
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
            const header = fileData[0];
            const head = header.map(e => ({ title: e, field: e }))
            console.log(head);
            setKolom(head);

            //Hapus Header
            fileData.splice(0, 1);
            setData(convertToJson(header, fileData));


        }
        reader.readAsBinaryString(file);
    }







    return (
        <>
            <input type="file" onChange={importXcel} />
            <MaterialTable
                title={title}
                options={option}
                data={data}
                columns={kolom}
                icons={tableIcons}
            />
        </>
    )
}

export default Table