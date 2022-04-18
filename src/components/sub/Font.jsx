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