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
import { currency, PdfWithQrCode } from '../Font';
import { brown } from "@mui/material/colors";
import dataKadis from '../../../public/data/kadis.json';



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

const Sp2dDoc = ({ dataselectspp, nama }) => {
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
                            style={{ paddingTop: "15px", paddingLeft: "50px", paddingBottom: "40px", paddingRight: "35px", fontFamily: 'Roboto', fontWeight: 'light' }}
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
                                        <Text style={[{ width: "100%", textAlign: 'center', height: 3, fontWeight: 'semibold', fontSize: 11, paddingTop: 8 }]}>ADD</Text>
                                    </View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontSize: 10 }]}>
                                    <View style={[style.row, { flexDirection: 'column', width: '50%', maxWidth: '50%', borderLeft: 0.8, borderBottom: 0.8 }]}>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 79, minWidth: 79 }]}>Nomor SP2SPD</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{e.no_spp}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 79, minWidth: 79 }]}>Tanggal SP2SPD</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{moment(e.tgl_spp).locale('id').format("DD MMMM YYYY")}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 79, minWidth: 79 }]}>Nomor SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{e.no_spm}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 79, minWidth: 79 }]}>Tanggal SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{moment(e.tgl_spm).locale('id').format("DD MMMM YYYY")}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 79, minWidth: 79 }]}>Kampung</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{e.kampung}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 79, minWidth: 79 }]}>Distrik</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={[{ width: 167, minWidth: 167 }]}>{e.distrik}</Text>
                                        </View>
                                    </View>
                                    <View style={[style.row, { flexDirection: 'column', width: '50%', maxWidth: '50%', border: 0.8, borderTop: 0 }]}>
                                        <View style={[{ width: '100%', flexDirection: 'row' }]}>
                                            <Text style={[{ paddingLeft: 3, width: 83 }]}>Dari</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3 }}>DINAS PEMBERDAYAAN MASYARAKAT KAMPUNG</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 83 }]}>Nomor SP2D</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3 }}>{e.no_sp2d}</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 83 }]}>Tanggal SP2D</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3 }}>{moment(e.tgl_sp2d).locale('id').format("DD MMMM YYYY")}</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 83 }]}>Tahun Anggaran</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3 }}>2022</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 83 }]}>Terlampir</Text>
                                            <Text>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3, fontFamily: 'Raleway', fontWeight: 'thin', fontSize: 9, fontStyle: 'italic' }}>1. Surat Permohonan Penerbitan Surat Pengantar Pencairan (SP2SPD)</Text>
                                        </View>
                                        <View style={[style.row]}>
                                            <Text style={[{ paddingLeft: 3, width: 83 }, style.hide]}>xxxxxxxx</Text>
                                            <Text style={style.hide}>:</Text>
                                            <Text style={{ width: 170, paddingLeft: 3, fontFamily: 'Raleway', fontWeight: 'thin', fontSize: 9, fontStyle: 'italic' }}>2. Surat Kelengkapan Berkas Kampung (SKBK)</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[style.row, { fontSize: 11, flexDirection: 'column', borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8, paddingTop: 7, paddingBottom: 7 }]}>
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
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 90 }]}>Tanggal SKBK</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{moment(e.tgl_spm).locale('id').format("DD MMMM YYYY")}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 90 }]}>Uang Sebesar Rp.</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{currency(e.pagu)}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 90 }]}>Terbilang</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontFamily: 'Raleway', fontWeight: 'semibold' }}>Tiga Puluh Tiga Juta Enam Ratus Ribu Rupiah</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[style.row, { fontSize: 11, flexDirection: 'column', borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8, paddingTop: 7, paddingBottom: 7 }]}>
                                        <Text style={[{ paddingLeft: 3 }]}>Kepada:</Text>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 160 }]}>Nama Kepala Kampung</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{e.nama_kepala}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 160 }]}>Nama Bendahara Kampung</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{e.nama}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 160 }]}>Nama Kampung</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{e.kampung}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 160 }]}>Nama Disstrik</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{e.distrik}</Text>
                                        </View>
                                        <View style={[style.row, { paddingLeft: 3, width: '100%' }]}>
                                            <Text style={[{ paddingRight: 1, width: 160 }]}>Keperluan Untuk</Text>
                                            <Text style={[{ paddingRight: 3 }]}>:</Text>
                                            <Text style={{ fontWeight: 'semibold' }}>{e.thp_advis}</Text>
                                        </View>
                                        <View style={{ position: 'absolute', alignContent: 'flex-end', alignItems: 'flex-end', alignSelf: "flex-end", paddingTop: 8, paddingRight: 3 }}>
                                            <PdfWithQrCode ssf_id={`${e.thp_advis}DISTRIK${e.distrik}KAMPUNG${e.kampung}@${e.nama_kepala}/${e.nama}$${e.no_rek}>${e.pagu} `} />
                                        </View>
                                    </View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontWeight: 'semibold', fontSize: 11, textAlign: 'center', paddingBottom: 3, paddingTop: 5, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                    <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>No.</Text></View>
                                    <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>Kode Rekening</Text></View>
                                    <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>Uraian</Text></View>
                                    <View style={[{ width: '15%' }]}><Text>Jumlah (Rp)</Text></View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontSize: 11, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                    <View style={[{ width: '100%', textAlign: 'left', paddingLeft: 3, fontWeight: 'semibold' }]}><Text>5.1.01.01 Penyelenggaraan Belanja SILTAP, Tunjangan dan Operasional Pemerintahan Desa</Text></View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontSize: 11, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                    <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>1</Text></View>
                                    <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>5.1.01.01.01</Text></View>
                                    <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>Penyediaan Penghasilan Tetap dan Tunjangan Kepala Desa</Text></View>
                                    <View style={[{ width: '15%', textAlign: 'right', paddingRight: 3 }]}><Text>4.500.000</Text></View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontSize: 11, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                    <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>2</Text></View>
                                    <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>5.1.01.02.01</Text></View>
                                    <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>Penyediaan Penghasilan Tetap dan Tunjangan Perangkat Desa</Text></View>
                                    <View style={[{ width: '15%', textAlign: 'right', paddingRight: 3 }]}><Text>13.350.000</Text></View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontSize: 11, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                    <View style={[{ width: '10%', borderRight: 0.8, marginTop: -2, marginBottom: -2 }]}><Text>3</Text></View>
                                    <View style={[{ width: '25%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left', paddingLeft: 3 }]}><Text>5.1.01.04.01</Text></View>
                                    <View style={[{ width: '50%', borderRight: 0.8, marginTop: -2, marginBottom: -2, textAlign: 'left ', paddingLeft: 3 }]}><Text>Penyediaan Tunjangan BPD</Text></View>
                                    <View style={[{ width: '15%', textAlign: 'right', paddingRight: 3 }]}><Text>15.750.000</Text></View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontSize: 11, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                    <View style={[{ width: '10%', color: 'white' }]}><Text>No.</Text></View>
                                    <View style={[{ width: '25%', color: 'white' }]}><Text>Kode Rekening</Text></View>
                                    <View style={[{ width: '50%', textAlign: 'right', fontWeight: 'semibold' }]}><Text>Jumlah</Text></View>
                                    <View style={[{ width: '15%', fontWeight: 'semibold', textAlign: 'right', paddingRight: 3 }]}><Text>33.600.000</Text></View>
                                </View>
                                <View style={[{ flexDirection: 'row', fontSize: 11, textAlign: 'center', paddingBottom: 2, paddingTop: 2, borderLeft: 0.8, borderBottom: 0.8, borderRight: 0.8 }]}>
                                    <View><Text style={{ paddingLeft: 3, fontFamily: 'Raleway', fontWeight: 'semibold' }}>Uang Sejumlah : Tiga Puluh Tiga Juta Enam Ratus Ribu Rupiah</Text></View>
                                </View>
                                <View style={{ flexDirection: 'row', fontSize: 11, marginTop: 10 }}>
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
                                            <Text style={{ textAlign: 'center', fontWeight: 'semibold' }}>{dataKadis.jabatan || "data kadis tidak temukan"}</Text>
                                            <Text style={{ textAlign: 'center', fontWeight: 'semibold' }}>DINAS PEMBERDAYAAN MASAYRAKAT KAMPUNG</Text>
                                            <Text style={{ textAlign: 'center', fontWeight: 'semibold', textDecoration: 'underline', marginTop: 60 }}>{dataKadis.nama || "data kadis tidak temukan"}</Text>
                                            <Text style={{ textAlign: 'center' }}>{dataKadis.pangkat || "data kadis tidak temukan"}</Text>
                                            <Text style={{ textAlign: 'center' }}>{dataKadis.nip || "data kadis tidak temukan"}</Text>
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
