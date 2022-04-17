import { Font } from '@react-pdf/renderer';
import black from '../../public/Roboto_Slab/static/RobotoSlab-Black.ttf';
import bold from '../../public/Roboto_Slab/static/RobotoSlab-Bold.ttf';
import extrabold from '../../public/Roboto_Slab/static/RobotoSlab-ExtraBold.ttf';
import extralight from '../../public/Roboto_Slab/static/RobotoSlab-ExtraLight.ttf';
import light from '../../public/Roboto_Slab/static/RobotoSlab-Light.ttf';
import medium from '../../public/Roboto_Slab/static/RobotoSlab-Medium.ttf';
import reguler from '../../public/Roboto_Slab/static/RobotoSlab-Regular.ttf';
import semibold from '../../public/Roboto_Slab/static/RobotoSlab-SemiBold.ttf';
import thin from '../../public/Roboto_Slab/static/RobotoSlab-Thin.ttf';

export default Font.register({
    family: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [
        {
            src: black,
        },
        {
            src: bold,
            fontWeight: "bold",
        },
        {
            src: extrabold,
            fontWeight: "extrabold",
        },
        {
            src: extralight,
            fontWeight: "extralight",
        },
        {
            src: light,
            fontWeight: "light",
        },
        {
            src: medium,
            fontWeight: "medium",
        },
        {
            src: reguler,
            fontWeight: "reguler",
        },
        {
            src: semibold,
            fontWeight: "semibold",
        },
        {
            src: thin,
            fontWeight: "thin",
        },
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