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
