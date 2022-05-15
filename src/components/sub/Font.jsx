import black from '../../public/Roboto_Slab/static/RobotoSlab-Black.ttf';
import React from 'react';

//
import {
    View, Svg, Font, Path
} from "@react-pdf/renderer";
import QRCode from 'qrcode.react';
import ReactHtmlParser from 'react-html-parser';
import { renderToStaticMarkup } from 'react-dom/server';

export default Font.register({
    family: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [
        {
            src: black,
        }
    ],
})



export function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toUpperCase() : word.toLowerCase();
    }).replace(/\s+/g, '');
}

export function currency(b) {
    let separator;
    let prefix;
    let number_string = b.toString().replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}


/* QR COde .......... */

export const PdfWithQrCode = ({ ssf_id }) => {
    const qrCodeComponent = (
        <QRCode
            value={ssf_id}
            renderAs="svg"
            size={80}
        />
    );

    const qrCodeComponentStaticMarkup = renderToStaticMarkup(qrCodeComponent);

    const parsedQrCodeSvg = parseQrCodeMarkup(qrCodeComponentStaticMarkup);
    if (!parsedQrCodeSvg) {
        return null;
    }

    return (
        <View>
            <Svg
                style={{ width: 80, height: 80 }}
                viewBox="0 0 49 49"
            >
                {parsedQrCodeSvg.props.children.filter(c => c.type === 'path').map((child, index) => (
                    <Path
                        key={index}
                        d={child.props.d}
                        fill={child.props.fill}
                    />
                ))}
            </Svg>
        </View>
    );
}

const parseQrCodeMarkup = (markup) => {
    let parsedQrCodeSvg = null;
    ReactHtmlParser(markup).forEach(el => {
        const { type } = el;
        if (type === 'svg') {
            parsedQrCodeSvg = el;
        }
    });

    return parsedQrCodeSvg;
};

/* QR COde .......... */

/* Loader ....................................................... */
export const Loader = () => {
    let circleCommonClasses = 'h-2.5 w-2.5 bg-current  rounded-full bg-blue-500 ';
    return (
        <div className='absolute inset-0 z-50'>
            <div className='w-full min-h-screen'>
                <div className='z-30'>
                    <div className='w-40 mx-auto align-middle min-h-screen flex'>
                        <div className='items-center h-5 translate-x-1/2 flex-col min-h-screen '>
                            <div className='h-1/2'></div>
                            <div className='inline-block align-middle my-auto h-7' >
                                <div className='flex'>
                                    <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                                    <div
                                        className={`${circleCommonClasses} mr-1 animate-bounce200`}
                                    ></div>
                                    <div className={`${circleCommonClasses} animate-bounce400`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};


/* Loader ....................................................... */

/* ======================== Terbilang ============================ */
let satuan = ["", "satu ", "dua ", "tiga ", "empat ", "lima ", "enam ", "tujuh ", "delapan ", "sembilan "]

export let konvertAng = (n) => {
    //QString sen = QString::number(n);
    if (n < 10) {
        return satuan[n];
    } else if (n === 10) { // khusus untuk sepuluh
        return "sepuluh ";
    } else if (n === 11) { // khusus untuk sebelas
        return "sebelas ";
    } else if (n < 20) {
        return satuan[n - 10] + "belas ";
    } else if (n < 100) {
        return satuan[(n - (n % 10)) / 10] + "puluh " + konvertAng(n % 10);
    } else { return ""; }
}

export let konvertAngka = (n) => {
    if (n < 0) {
        return "negatif " + konvertAngka(-n);
    } else if (n < 10) {
        return satuan[n];
    } else if (n === 10) { // khusus untuk sepuluh
        return "sepuluh ";
    } else if (n === 11) { // khusus untuk sebelas
        return "sebelas ";
    } else if (n < 20) {
        return satuan[n - 10] + "belas ";
    } else if (n < 100) {
        return satuan[(n - (n % 10)) / 10] + "puluh " + konvertAngka(n % 10);
    } else if (n < 1000) {
        return (n < 200 ? "seratus " : satuan[(n - (n % 100)) / 100] + "ratus ") + konvertAngka(n % 100);
    } else if (n < 1000000) {
        return (n < 2000 ? "seribu " : konvertAngka((n - (n % 1000)) / 1000) + "ribu ") + konvertAngka(n % 1000);
    } else if (n < 1000000000) {
        return konvertAngka((n - (n % 1000000)) / 1000000) + "juta " + konvertAngka(n % 1000000);
    } else if (n < 1000000000000) {
        return konvertAngka((n - (n % 1000000000)) / 1000000000) + "Miliar " + konvertAngka(n % 1000000000);
    } else if (n < 1000000000000000) {
        return konvertAngka((n - (n % 1000000000000)) / 1000000000000) + "Triliun " + konvertAngka(n % 1000000000000);
    }
    else {
        return "Angka lebih besar dari 999.999.999.999,999,999 (harus kurang dari 1jt T)";
    }
}
/* ======================== Terbilang ============================ */

const CENT = 0;
const POINT = 1;
const NOMINAL = ["Nol", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan"];

function threedigit(word) {
    while (word.length < 3) word = "0" + word;
    word = word.split("");
    let a = word[0]; let b = word[1]; let c = word[2];
    word = "";
    word += (a !== "0" ? (a !== "1" ? NOMINAL[parseInt(a)] : "Se") : "") + (a !== "0" ? (a !== "1" ? " Ratus" : "ratus") : "");
    word += " " + (b !== "0" ? (b !== "1" ? NOMINAL[parseInt(b)] : "Se") : "") + (b !== "0" ? (b !== "1" ? " Puluh" : "puluh") : "");
    word += " " + (c !== "0" ? NOMINAL[parseInt(c)] : "");
    word = word.replace(/Sepuluh ([^ ]+)/gi, "$1 Belas");
    word = word.replace(/Satu Belas/gi, "Sebelas");
    word = word.replace(/^[ ]+$/gi, "");

    return word;
}


export let capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join('')

export function sayit_v2(s, t = CENT, r = 2, curr = "RUPIAH") {
    if (isNaN(t)) {
        t.toUpperCase().replace(/^\s+|\s+$/g, '');
        t = t === "POINT" ? POINT : CENT;
    }
    t = t === POINT ? POINT : CENT;
    if (t === CENT) r = 2;

    s += "";
    let regexp = /^(\d*\.\d+|\d+)$/gi

    if (regexp.test(s)) {
        s = s.replace(/^0+/gi, "");
        let zero3 = ["", "Ribu", "Juta", "Milyar", "Trilyun", "Kuadriliun",
            "Kuantiliun", "Sekstiliun", "Septiliun", "Oktiliun",
            "Noniliun", "Desiliun"]

        s = s.split(".");
        if (s[1]) {
            s[1] = Math.round(s[1] / Math.pow(10, s[1].length - r)) + "";
        }

        let word = s[0];
        let cent = s[1] ? s[1] : (t === CENT ? "0" : "");
        if (cent.length < 2 && t === CENT) cent += "0";

        let subword = ""; let i = 0;
        while (word.length > 3) {
            let subdigit = threedigit(word.substr(word.length - 3, 3));
            subword = subdigit + (subdigit !== "" ? " " + zero3[i] + " " : "") + subword;
            word = word.substring(0, word.length - 3);
            i++;
        }
        subword = threedigit(word) + " " + zero3[i] + " " + subword;
        subword = subword.replace(/^ +$/gi, "");

        word = (subword === "" ? "NOL" : subword.toUpperCase()) + (t === CENT ? " " + curr : " KOMA");

        if (t === CENT) { subword = threedigit(cent); }
        else {
            subword = [];
            for (i in cent) subword.push(NOMINAL[cent[i]]);
            subword = subword.join(" ");
        }
        cent = (subword === "" ? "" : " ") + subword.toUpperCase() + (subword === "" || t === POINT ? "" : " SEN");
        let terbilang = (word + cent).toLowerCase()
        return capitalizeFirstLetter(terbilang, 'ID');
    }
    else return "ERROR: Invalid number format";
}

// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

