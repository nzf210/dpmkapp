import React from "react";
import {
    Page,
    Text,
    Image,
    Document,
    StyleSheet,
    View, Font
} from "@react-pdf/renderer";
import Yhk from '../../../public/yhk.png';
import bold from '../../../public/Roboto_Slab/static/RobotoSlab-Bold.ttf';
import extrabold from '../../../public/Roboto_Slab/static/RobotoSlab-ExtraBold.ttf';
import extralight from '../../../public/Roboto_Slab/static/RobotoSlab-ExtraLight.ttf';
import light from '../../../public/Roboto_Slab/static/RobotoSlab-Light.ttf';
import medium from '../../../public/Roboto_Slab/static/RobotoSlab-Medium.ttf';
import reguler from '../../../public/Roboto_Slab/static/RobotoSlab-Regular.ttf';
import semibold from '../../../public/Roboto_Slab/static/RobotoSlab-SemiBold.ttf';
import thin from '../../../public/Roboto_Slab/static/RobotoSlab-Thin.ttf';
import ExtraLightItalic from '../../../public/Raleway/static/Raleway-ExtraLightItalic.ttf';
import BoldItalic from '../../../public/Raleway/static/Raleway-BoldItalic.ttf';
import SemiBoldItalic from '../../../public/Raleway/static/Raleway-SemiBoldItalic.ttf';
import moment from "moment";
import { currency, PdfWithQrCode, sayit_v2 } from '../Font';
import CurrencyFormat from 'react-currency-format';
import { brown } from "@material-ui/core/colors";


Font.register({
    family: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [

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

Font.register({
    family: "Raleway",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [
        {
            src: ExtraLightItalic,
            fontWeight: "thin",
        },
        {
            src: SemiBoldItalic,
            fontWeight: "semibold",
        },
        {
            src: BoldItalic,
            fontWeight: "Bold",

        }
    ],
})

const Sp2dDoc = ({ dataselectspp, nama, dataKadis }) => {
    // useEffect(() => {
    //     console.log("spd dok", dataselectspp);
    // }, []);

    const style = StyleSheet.create({
        pageNumber: { position: "absolute", fontSize: 12, bottom: 30, left: 0, right: 0, textAlign: "center", color: "grey" },
        table: { width: "100%" }, image: { height: "50px", width: "50px", position: 'absolute', marginTop: 45, marginLeft: 63 },
        row: { flexDirection: 'row' }, hide: { color: 'white' },
    });

    return (
        <Document key="doc-sp2d">
            {dataselectspp &&
                dataselectspp.map((e, i) => (
                    <>
                        <Page
                            size="A4"
                            key={`doc-sp2d-${i}`}
                            style={{ paddingTop: "15px", paddingLeft: "50px", paddingBottom: "40px", paddingRight: "35px", fontFamily: 'Roboto', fontWeight: 'light', border: 0.8 }}
                        >
                            <Image style={style.image} src={Yhk} fixed />
                            <View style={[style.table, { flexDirection: 'column' }]} key={`doc_sp2d_view`} >
                                <View style={[style.table, { flexDirection: 'row', marginTop: 20 }]}>
                                    <View style={{ height: 70, width: '15%', border: 0.8 }}></View>
                                    <View style={[{ flexDirection: 'column', width: '70%' }]}>
                                        <Text style={[{ width: "100%", textAlign: 'center', fontSize: 13, fontWeight: 'semibold', height: 35, borderBottom: 0.8, borderTop: 0.8, paddingTop: 8.5 }]}>PEMERINTAH KABUPATEN YAHUKIMO</Text>
                                        <Text style={[{ width: "100%", textAlign: 'center', fontWeight: 'semibold', fontSize: 11, height: 35, borderBottom: 0.8, paddingTop: 9 }]}>SURAT PENGANTAR PENCAIRAN DANA (SP2D)</Text>
                                    </View>
                                    <View style={[{ flexDirection: 'column', width: '15%', border: 0.8 }]}>
                                        <Text style={[{ height: 34, width: "100%", fontWeight: 'semibold', fontSize: 11, textAlign: 'center', paddingTop: 8.5 }]}>BEBAN</Text>
                                        <Text style={[{ width: "100%", textAlign: 'center', height: 3, fontWeight: 'semibold', fontSize: 11, paddingTop: 8 }]}>DD/APBN</Text>
                                    </View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontSize: 8 }]}>
                                    <View style={[style.row, { flexDirection: 'column', width: '50%', maxWidth: '50%', borderLeft: 0.8, borderBottom: 0.8 }]}>

                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>1. Nomor SP2SPD</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{(JSON.parse(e.sub).length >= 2 ? JSON.parse(e.sub)[1].no_spp : '-')}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>2. Tanggal SP2SPD</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>
                                                {(JSON.parse(e.sub).length >= 2 ? moment((JSON.parse(e.sub).length >= 2 ? JSON.parse(e.sub)[1].tgl_spp : '-')).locale('id').format("DD MMMM YYYY") : '-')}
                                            </Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>3. Nomor SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{(JSON.parse(e.sub).length >= 2 ? JSON.parse(e.sub)[1].no_spm : '-')}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>4. Tanggal SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>
                                                {(JSON.parse(e.sub).length >= 2 ? moment((JSON.parse(e.sub).length >= 2 ? JSON.parse(e.sub)[1].tgl_spm : '-')).locale('id').format("DD MMMM YYYY") : '-')}
                                            </Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>5. Nomor SP2SPD</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{(JSON.parse(e.sub).length === 3 ? JSON.parse(e.sub)[2].no_spp : '-')}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>6. Tanggal SP2SPD</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>
                                                {(JSON.parse(e.sub).length === 3 ? moment((JSON.parse(e.sub).length === 3 ? JSON.parse(e.sub)[2].tgl_spp : '-')).locale('id').format("DD MMMM YYYY") : '-')}
                                            </Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>7. Nomor SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{(JSON.parse(e.sub).length === 3 ? JSON.parse(e.sub)[2].no_spm : '-')}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>8. Tanggal SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>
                                                {(JSON.parse(e.sub).length === 3 ? moment((JSON.parse(e.sub).length === 3 ? JSON.parse(e.sub)[2].tgl_spm : '-')).locale('id').format("DD MMMM YYYY") : '-')}
                                            </Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>9. Nomor SP2SPD</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{(JSON.parse(e.sub).length >= 1 ? JSON.parse(e.sub)[0].no_spp : '-')}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>10. Tanggal SP2SPD</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>
                                                {(JSON.parse(e.sub)[0].sts_spm === true ? moment((JSON.parse(e.sub).length >= 1 ? JSON.parse(e.sub)[0].tgl_spp : '-')).locale('id').format("DD MMMM YYYY") : '-')}
                                            </Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>11. Nomor SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{(JSON.parse(e.sub).length >= 1 ? JSON.parse(e.sub)[0].no_spm : '-')}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}>12. Tanggal SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>
                                                {(JSON.parse(e.sub)[0].sts_spm === true ? moment((JSON.parse(e.sub).length >= 1 ? JSON.parse(e.sub)[0].tgl_spm : '-')).locale('id').format("DD MMMM YYYY") : '-')}
                                            </Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}><Text style={{ color: 'white' }}>12..</Text>Kampung</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{e.kampung}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 73, minWidth: 70 }]}><Text style={{ color: 'white' }}>12..</Text>Distrik</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{e.distrik}</Text>
                                        </View>
                                    </View>
                                    <View style={[style.row, { flexDirection: 'column', width: '50%', maxWidth: '50%', border: 0.8, borderTop: 0, fontSize: 8 }]}>
                                        <View style={[{ width: '100%', flexDirection: 'row' }]}>
                                            <Text style={[{ paddingLeft: 3, width: 73 }]}>Dari</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3 }}>DINAS PEMBERDAYAAN MASYARAKAT KAMPUNG</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 73 }]}>Nomor SP2D</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3 }}>{e.no_sp2d}</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 73 }]}>Tanggal SP2D</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3 }}>{moment(e.tgl_sp2d).locale('id').format("DD MMMM YYYY")}</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 73 }]}>Tahun Anggaran</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3 }}>2022</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 73 }]}>Terlampir</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3, fontFamily: 'Raleway', fontWeight: 'thin', fontSize: 6, fontStyle: 'italic' }}>1. Surat Permohonan Penerbitan Surat Pengantar Pencairan (SP2SPD)</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 73 }, style.hide]}>xxxxxxxx</Text>
                                            <Text style={style.hide}>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3, fontFamily: 'Raleway', fontWeight: 'thin', fontSize: 6, fontStyle: 'italic' }}>2. Surat Kelengkapan Berkas Kampung (SKBK)</Text>
                                        </View>
                                        <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: "center", width: '100%' }}>
                                            <View style={{ marginBottom: -5 }}>
                                                <PdfWithQrCode ssf_id={`SURAT PENGANTAR PENCAIRAN DANA ${e.opt1} DISTRIK${e.distrik}KAMPUNG${e.kampung}@${e.nama_kepala}/${e.nama}$${e.no_rek}>${(JSON.parse(e.sub).length >= 1 ? JSON.parse(e.sub)[0].pagu : 0) + (JSON.parse(e.sub).length >= 2 ? JSON.parse(e.sub)[1].pagu : 0) + (JSON.parse(e.sub).length === 3 ? JSON.parse(e.sub)[2].pagu : 0)} `} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[style.row, { fontSize: 9, flexDirection: 'column', borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8, paddingTop: 4, paddingBottom: 4 }]}>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 90 }]}>Bank</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>BANK PAPUA CAB. DEKAI</Text>
                                        </View>
                                        <Text style={[{ paddingLeft: 3 }]}>Hendaklah mencairkan dari</Text>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 90 }]}>Rekening</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{e.no_rek}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 90 }]}>Nama Rekening</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{e.rek}</Text>
                                        </View>
                                        {/* <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 90 }]}>Tanggal SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{moment(e.tgl_spm).locale('id').format("DD MMMM YYYY")}</Text>
                                        </View> */}
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 90 }]}>Uang Sebesar</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>
                                                <CurrencyFormat value={(JSON.parse(e.sub)[0].sts_spm === true ? JSON.parse(e.sub)[0].pagu : 0) + (JSON.parse(e.sub)[1].sts_spm === true ? JSON.parse(e.sub)[1].pagu : 0) + (JSON.parse(e.sub)[2].sts_spm === true ? JSON.parse(e.sub)[2].pagu : 0)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 90 }]}>Terbilang</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontFamily: 'Raleway', fontWeight: 'semibold', textTransform: 'capitalize', maxWidth: 410 }}>
                                                {sayit_v2((JSON.parse(e.sub)[0].sts_spm === true ? JSON.parse(e.sub)[0].pagu : 0) + (JSON.parse(e.sub)[1].sts_spm === true ? JSON.parse(e.sub)[1].pagu : 0) + (JSON.parse(e.sub)[2].sts_spm === true ? JSON.parse(e.sub)[2].pagu : 0))}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[style.row, { fontSize: 9, flexDirection: 'column', borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8, paddingTop: 4, paddingBottom: 4 }]}>
                                        <Text style={[{ paddingLeft: 3 }]}>Kepada:</Text>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 130 }]}>Nama Kepala Kampung</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold', width: 220, }}>{e.nama_kepala}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 130 }]}>Nama Bendahara Kampung</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold', width: 220 }}>{e.nama}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 130 }]}>Nama Kampung</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold', width: 220 }}>{e.kampung}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 130 }]}>Nama Disstrik</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold', width: 220 }}>{e.distrik}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 130 }]}>Keperluan Untuk</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <View style={{ flexDirection: 'column', width: 350, }}>
                                                {JSON.parse(e.sub).length === 1 ?
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text>1. </Text>
                                                        <Text style={{ fontWeight: 'semibold', width: 220, minWidth: 220, textAlign: 'left' }}>Belanja Dana Desa Reguler {e.opt1}</Text>
                                                    </View> : null
                                                }
                                                {JSON.parse(e.sub).length === 2 ?
                                                    <View>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text>1. </Text>
                                                            <Text style={{ fontWeight: 'semibold', width: 220, minWidth: 220, textAlign: 'left' }}>Belanja Dana Desa Reguler {e.opt1}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text>2. </Text>
                                                            <Text style={{ fontWeight: 'semibold', width: 220, minWidth: 220, textAlign: 'left' }}>Belanja Bantuan Langsung Tunai (BLT) Dana Desa (DD){JSON.parse(e.sub)[0].thp_select}</Text>
                                                        </View>
                                                    </View> : null
                                                }
                                                {JSON.parse(e.sub).length === 3 ?
                                                    <View>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text>1. </Text>
                                                            <Text style={{ fontWeight: 'semibold', width: 220, minWidth: 220, textAlign: 'left' }}>Belanja Dana Desa Reguler {e.opt1}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text>2. </Text>
                                                            <Text style={{ fontWeight: 'semibold', width: 220, minWidth: 220, textAlign: 'left' }}>Belanja Bantuan Covid_19 Sebesar 8% (Delapan Persen) dari Pagu Dana Desa</Text>
                                                        </View>
                                                        {JSON.parse(e.sub)[0].sts_spm === true ? <View style={{ flexDirection: 'row' }}>
                                                            <Text>3. </Text>
                                                            <Text style={{ fontWeight: 'semibold', width: 220, minWidth: 220, textAlign: 'left' }}>Belanja Bantuan Langsung Tunai (BLT) Dana Desa (DD) {JSON.parse(e.sub)[0].thp_select}</Text>
                                                        </View> : null}
                                                    </View> : null
                                                }
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontWeight: 'semibold', fontSize: 9, textAlign: 'center', paddingBottom: 3, paddingTop: 5, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                    <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>No.</Text></View>
                                    <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>Kode Rekening</Text></View>
                                    <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>Uraian</Text></View>
                                    <View style={[{ width: '15%' }]}><Text>Jumlah (Rp)</Text></View>
                                </View>

                                {JSON.parse(e.sub).length === 1 ?
                                    <View>
                                        <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                            <View style={[{ width: '100%', textAlign: 'left', paddingLeft: 3, fontWeight: 'semibold' }]}><Text>Belanja Dana Desa Reguler {e.opt1}</Text></View>
                                        </View>
                                        <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                            <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>1</Text></View>
                                            <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>............</Text></View>
                                            <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>Belanja Dana Desa Reguler {e.opt1}</Text></View>
                                            <View style={[{ width: '15%', textAlign: 'right', paddingRight: 3 }]}><Text>{currency(JSON.parse(e.sub)[0].pagu)}</Text></View>
                                        </View>
                                    </View>
                                    : null}
                                {JSON.parse(e.sub).length === 2 ?
                                    <View>
                                        <View>
                                            <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                <View style={[{ width: '100%', textAlign: 'left', paddingLeft: 3, fontWeight: 'semibold' }]}><Text>Belanja Dana Desa Reguler {e.opt1}</Text></View>
                                            </View>
                                            <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>1</Text></View>
                                                <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>............</Text></View>
                                                <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>Belanja Dana Desa Reguler {e.opt1}</Text></View>
                                                <View style={[{ width: '15%', textAlign: 'right', paddingRight: 3 }]}>
                                                    <Text>
                                                        <CurrencyFormat value={(JSON.parse(e.sub)[1].pagu)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={''} />
                                                        {/* {currency(JSON.parse(e.sub)[1].pagu)} */}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                <View style={[{ width: '100%', textAlign: 'left', paddingLeft: 3, fontWeight: 'semibold' }]}><Text>5.4.01.01 Belanja Tak Terduga</Text></View>
                                            </View>
                                            <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>2</Text></View>
                                                <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>5.1.01.01.01</Text></View>
                                                <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>Belanja Bantuan Langsung Tunai Untuk {e.j_kk} KK</Text></View>
                                                <View style={[{ width: '15%', textAlign: 'right', paddingRight: 3 }]}>
                                                    <Text>
                                                        <CurrencyFormat value={(JSON.parse(e.sub)[0].pagu)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={''} />
                                                        {/* {currency(JSON.parse(e.sub)[0].pagu)} */}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    : null}
                                {JSON.parse(e.sub).length === 3 ?
                                    <View>
                                        <View>
                                            <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                <View style={[{ width: '100%', textAlign: 'left', paddingLeft: 3, fontWeight: 'semibold' }]}><Text>Belanja Dana Desa Reguler {e.opt1}</Text></View>
                                            </View>
                                            <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>1</Text></View>
                                                <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>............</Text></View>
                                                <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>Belanja Dana Desa Reguler {e.opt1}</Text></View>
                                                <View style={[{ width: '15%', textAlign: 'right', paddingRight: 3 }]}>
                                                    <Text>
                                                        <CurrencyFormat value={JSON.parse(e.sub)[2].sts_spm === true ? (JSON.parse(e.sub)[2].pagu) : 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={''} />
                                                        {/* {currency(JSON.parse(e.sub)[2].pagu)} */}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                <View style={[{ width: '100%', textAlign: 'left', paddingLeft: 3, fontWeight: 'semibold' }]}><Text>5.2.02.04 Penyelenggaraan Desa Siaga Kesehatan</Text></View>
                                            </View>
                                            <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>2</Text></View>
                                                <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>5.2.02.04</Text></View>
                                                <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}>
                                                    <Text>Penyelenggaraan Desa Siaga Kesehatan</Text>
                                                </View>
                                                <View style={[{ width: '15%', textAlign: 'right', paddingRight: 3 }]}>
                                                    <Text>
                                                        <CurrencyFormat value={JSON.parse(e.sub)[1].sts_spm === true ? (JSON.parse(e.sub)[1].pagu) : 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={''} />
                                                        {/* {currency(JSON.parse(e.sub)[1].pagu)} */}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        {JSON.parse(e.sub)[0].sts_spm === true ?
                                            <View>
                                                <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                    <View style={[{ width: '100%', textAlign: 'left', paddingLeft: 3, fontWeight: 'semibold' }]}><Text>5.4.01.01 Belanja Tak Terduga</Text></View>
                                                </View>
                                                <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                                    <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>3</Text></View>
                                                    <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>5.1.01.01.01</Text></View>
                                                    <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>Belanja Bantuan Langsung Tunai Untuk {e.j_kk} KK</Text></View>
                                                    <View style={[{ width: '15%', textAlign: 'right', paddingRight: 3 }]}>
                                                        <Text>
                                                            <CurrencyFormat value={JSON.parse(e.sub)[0].sts_spm === true ? (JSON.parse(e.sub)[0].pagu) : 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={''} />
                                                            {/* {currency(JSON.parse(e.sub)[0].pagu)} */}
                                                        </Text></View>
                                                </View>
                                            </View> : null}
                                    </View>
                                    : null}

                                <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                    <View style={[{ width: '10%', color: 'white' }]}><Text>No.</Text></View>
                                    <View style={[{ width: '25%', color: 'white' }]}><Text>Kode Rekening</Text></View>
                                    <View style={[{ width: '50%', textAlign: 'right', fontWeight: 'semibold' }]}><Text>Jumlah</Text></View>
                                    <View style={[{ width: '15%', fontWeight: 'semibold', textAlign: 'right', paddingRight: 3 }]}>
                                        <Text>
                                            <CurrencyFormat value={(JSON.parse(e.sub)[0].sts_spm === true ? JSON.parse(e.sub)[0].pagu : 0) + (JSON.parse(e.sub)[1].sts_spm === true ? JSON.parse(e.sub)[1].pagu : 0) + (JSON.parse(e.sub)[2].sts_spm === true ? JSON.parse(e.sub)[2].pagu : 0)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                                            {/* {currency((JSON.parse(e.sub).length >= 1 ? JSON.parse(e.sub)[0].pagu : 0) + (JSON.parse(e.sub).length >= 2 ? JSON.parse(e.sub)[1].pagu : 0) + (JSON.parse(e.sub).length === 3 ? JSON.parse(e.sub)[2].pagu : 0))} */}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontSize: 9, textAlign: 'left', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8, fontWeight: 'semibold' }]}>
                                    <Text style={{ paddingLeft: 3, fontFamily: 'Raleway', }}>Uang Sejumlah : </Text>
                                    <Text style={{ textTransform: 'capitalize', marginLeft: 3, width: 400, fontStyle: 'italic', }}>{sayit_v2((JSON.parse(e.sub)[0].sts_spm === true ? JSON.parse(e.sub)[0].pagu : 0) + (JSON.parse(e.sub)[1].sts_spm === true ? JSON.parse(e.sub)[1].pagu : 0) + (JSON.parse(e.sub)[2].sts_spm === true ? JSON.parse(e.sub)[2].pagu : 0))}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', fontSize: 9, marginTop: 5 }}>
                                    <View style={{ flexDirection: 'column', width: '35%', alignContent: 'flex-start', paddingLeft: 3, fontSize: 9 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>Lembar 1</Text>
                                            <Text>: </Text>
                                            <Text>Bank Yang di Tunjuk</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>Lembar 2</Text>
                                            <Text>: </Text>
                                            <Text>Arsip DPMK</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>Lembar 3</Text>
                                            <Text>: </Text>
                                            <Text>Pihak Penerima</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column', width: '65%' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ textAlign: 'center' }}>DEKAI, {moment(e.tgl_sp2d).locale('id').format("DD MMMM YYYY")}</Text>
                                            <Text style={{ textAlign: 'center', fontWeight: 'semibold' }}>{dataKadis.jabatan || "Plt, KEPALA DINAS"}</Text>
                                            <Text style={{ textAlign: 'center', fontWeight: 'semibold' }}>{dataKadis.dinas || "DINAS PEMBERDAYAAN MASAYRAKAT KAMPUNG"}</Text>
                                            <Text style={{ textAlign: 'center', fontWeight: 'semibold', textDecoration: 'underline', marginTop: 60 }}>{dataKadis.nama || "LAZARUS PAHABOL, SE, MM"}</Text>
                                            <Text style={{ textAlign: 'center' }}>{dataKadis.pangkat || "PENATA Tk.I"}</Text>
                                            <Text style={{ textAlign: 'center' }}>{dataKadis.nip || "19740404 200605 1 001"}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Text
                                style={style.pageNumber}
                            // render={({ pageNumber, totalPages }) =>
                            //     `Halaman ${pageNumber} dari ${totalPages}`
                            // }
                            >Halaman 1 dari 1</Text>
                            <Text style={{ fontSize: 5.5, color: brown[900], position: 'absolute', bottom: 20, marginLeft: 30 }}>Oleh: {nama}</Text>
                        </Page>
                    </>
                ))
            }
        </Document >
    );
};

export default Sp2dDoc;
