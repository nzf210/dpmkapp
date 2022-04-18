import React, { useEffect } from "react";
import {
    Page, Text, Image, Document, StyleSheet, View
} from "@react-pdf/renderer";
import Yhk from '../../../public/yhk.png';

import { Font } from '@react-pdf/renderer';
import black from '../../../public/Roboto_Slab/static/RobotoSlab-Black.ttf';
import bold from '../../../public/Roboto_Slab/static/RobotoSlab-Bold.ttf';
import extrabold from '../../../public/Roboto_Slab/static/RobotoSlab-ExtraBold.ttf';
import extralight from '../../../public/Roboto_Slab/static/RobotoSlab-ExtraLight.ttf';
import light from '../../../public/Roboto_Slab/static/RobotoSlab-Light.ttf';
import medium from '../../../public/Roboto_Slab/static/RobotoSlab-Medium.ttf';
import reguler from '../../../public/Roboto_Slab/static/RobotoSlab-Regular.ttf';
import semibold from '../../../public/Roboto_Slab/static/RobotoSlab-SemiBold.ttf';
import thin from '../../../public/Roboto_Slab/static/RobotoSlab-Thin.ttf';
import italic from '../../../public/Roboto_Slab/static/Raleway-ExtraLightItalic.ttf';
import moment from "moment";
import { camelize, currency } from '../Font';

Font.register({
    family: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [
        {
            src: black,
        }, {
            src: bold,
            fontWeight: "bold",
        }, {
            src: extrabold,
            fontWeight: "extrabold",
        }, {
            src: extralight,
            fontWeight: "extralight",
        }, {
            src: light,
            fontWeight: "light",
        }, {
            src: medium,
            fontWeight: "medium",
        }, {
            src: reguler,
            fontWeight: "reguler",
        }, {
            src: semibold,
            fontWeight: "semibold",
        }, {
            src: thin,
            fontWeight: "thin",
        }, {
            src: italic,
            fontWeight: "thin",
            fontStyle: 'italic',
        }
    ],
})

Font.register({
    family: "Raleway",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [
        {
            src: italic,
            fontWeight: "thin",
            fontStyle: 'italic',
        }
    ],
})

const SppDoc = ({ dataselectspp }) => {
    useEffect(() => {
        console.log("spd dok", dataselectspp);
    }, []);

    //const borderColor = '#90e5fc';
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: "3px",
                marginTop: "5px",
                marginBottom: "5px"
            }}
        />
    );
    const style = StyleSheet.create({
        header: {
            fontSize: 12, marginBottom: 20, textAlign: "center",
            color: "grey",
            fontFamily: 'Roboto',
            fontWeight: 'extrabold'
        },
        head: {
            backgroundColor: "blue",
            fontFamily: 'Roboto',
            fontWeight: 'extrabold'
        },
        image: {
            height: "50px",
            width: "50px",
            marginTop: "25px",
            marginLeft: "62px",
            position: 'absolute'
        },
        text: {
            textAlign: "center",
            fontSize: "12px",
            marginTop: "-10px",
            marginLeft: "40px"
        },
        text2: {
            textAlign: "center",
            fontSize: "8px",
            marginTop: "20px",
            marginLeft: "40px"
        },
        text3: {
            fontSize: "12px",
            textAlign: "center",
            fontFamily: 'Roboto',
            fontWeight: 'semibold'
        },
        text4: {
            fontSize: "10px"
        },
        pageNumber: { position: "absolute", fontSize: 12, bottom: 30, left: 0, right: 0, textAlign: "center", color: "grey" },
        HMmenimbang: { display: 'flex', position: 'relative' },
        HMmenimbang2: { display: 'flex', position: 'relative', marginTop: 3 },
        menimbang: { fontSize: 12, paddingTop: 10, maxWidth: 160, minWidth: 160, },
        menimbang2: { fontSize: 12, paddingTop: 60, maxWidth: 160, minWidth: 160, },
        titik2: { fontSize: 12, paddingTop: 10, maxWidth: 2, minWidth: 2, position: 'absolute', paddingLeft: 155 },
        titik22: { fontSize: 12, paddingTop: 60, maxWidth: 2, minWidth: 2, position: 'absolute', paddingLeft: 155 },
        isiMenimbang: { fontSize: 12, paddingTop: 10, position: 'absolute', paddingLeft: 165 },
        isiMenimbang2: { fontSize: 12, paddingTop: 60, position: 'absolute', paddingLeft: 165 },
        isiMenimbang22: { fontSize: 12, paddingTop: 90, position: 'absolute', paddingLeft: 165 },
        text5: { fontSize: "12px", textAlign: "center", marginTop: 70, fontWeight: 'ultrabold', fontFamily: 'Roboto', fontWeight: 'semibold' },

    });

    return (
        <Document key="doc-spd">
            {dataselectspp &&
                dataselectspp.map((e, i) => (
                    <>
                        <Page
                            size="A4"
                            key={`doc-spp-1`}
                            style={{
                                paddingTop: "15px",
                                paddingLeft: "50px",
                                paddingBottom: "40px",
                                paddingRight: "35px",
                                fontFamily: 'Roboto',
                                fontWeight: 'light'

                            }}
                        >
                            <Image style={style.image} src={Yhk} fixed />
                            <View fixed>
                                <View>
                                    <Text style={{ marginTop: 8, textAlign: "center", paddingLeft: 10, fontFamily: 'Roboto', fontWeight: 'extrabold' }}   >
                                        PEMERINTAH KABUPATEN YAHUKIMO
                                    </Text>
                                    <Text style={{ paddingTop: 0, textAlign: "center", paddingLeft: 10, fontSize: 12, fontFamily: 'Roboto', fontWeight: 'semibold' }}>
                                        DISTRIK {e.distrik}
                                    </Text>
                                    <Text style={{ paddingTop: 0, textAlign: "center", paddingLeft: 10, fontSize: 12, fontFamily: 'Roboto', fontWeight: 'semibold' }} >
                                        KAMPUNG {e.kampung}
                                    </Text>
                                </View>
                                <ColoredLine color="black" />
                            </View>
                            <View>
                                <Text style={style.text3}>NOMOR: {e.no_spp}</Text>
                                <Text style={{
                                    paddingTop: 10, fontSize: 12, textAlign: 'center', fontFamily: 'Roboto', fontWeight: 'semibold'
                                }}>SURAT PERMOHONAN PENERBITAN SURAT PENCAIRAN DANA</Text>
                                <Text style={style.text3}>TAHUN ANGGARAN 2022</Text>
                                <View style={style.HMmenimbang}>
                                    <Text style={style.menimbang}>Menimbang</Text>
                                    <Text style={style.titik2}>:</Text>
                                    <Text style={style.isiMenimbang}>
                                        Baik untuk melaksanakan anggaran sub kegiatan tahun anggaran 2022 berdasarkan anggaran pendapatan dan belanja kampung yang telah ditetapkan, perlu menerbitkan surat pencairan dengan menerbitkan Surat Permohonan Penerbitan Surat Pencairan Dana (SP2SPD) Tahun Anggaran 2022
                                    </Text>
                                </View>
                                <View style={style.HMmenimbang2}>
                                    <Text style={style.menimbang2}>Mengingat</Text>
                                    <Text style={style.titik22}>:</Text>
                                    <Text style={style.isiMenimbang2}>1. Peraturan Bupati Nomor 28 Tahun 2022 Tanggal 07 April 2022, Tentang Tambahan Penghasilan Aparat Kampung;</Text>
                                    <Text style={style.isiMenimbang22}>2. Surat Keputusan Bupati Yahukimo Nomor 38 Tahun 2022 Tanggal 28 Januari 2022 Tentang Alokasi Dana Desa Tahun 2022</Text>
                                </View>
                            </View>
                            <Text style={style.text5}>YANG BERMOHON :</Text>
                            <View style={{ fontSize: 12 }}>
                                <View >
                                    <Text style={{ paddingLeft: 50, width: 260, paddingTop: 10 }} >1. Nama Kampung</Text>
                                    <Text style={{ paddingTop: -15, paddingLeft: 260, fontSize: 12, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingLeft: 270, fontSize: 12, paddingTop: -30 }}>{e.kampung}</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 49, width: 260, }}>2. Nama Distrik</Text>
                                    <Text style={{ paddingTop: -15, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -30, paddingLeft: 270, }}>{e.distrik}</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 49, width: 260, }}>3. Nama Kepala Kampung</Text>
                                    <Text style={{ paddingTop: -15, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -30, paddingLeft: 270, fontWeight: 'bold' }}>{e.nama_kepala}</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 49, width: 260, }}>4. Nama Bendahara Kampung</Text>
                                    <Text style={{ paddingTop: -15, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -30, paddingLeft: 270, fontWeight: 'bold' }}>{e.nama}</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 50, width: 260 }}>5. Jumlah Permohonan Dana Rp.</Text>
                                    <Text style={{ paddingTop: -15, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -32, paddingLeft: 270, fontWeight: 'bold' }}>Rp {currency(e.pagu)},-</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 50, width: 260, }}>6. Untuk Kebutuhan</Text>
                                    <Text style={{ paddingTop: -15, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -32, paddingLeft: 270, }}>{e.tahap}</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 50, width: 260, fontWeight: 'bold' }}>7. Ikhtisar Permohonan Dana</Text>
                                </View>
                                <View >
                                    <Text style={{ paddingLeft: 70, width: 260, }}>a. Jumlah Pagu ADD </Text>
                                    <Text style={{ paddingTop: -17, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -32, paddingLeft: 270, }}>Rp 134.000.000</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 70, width: 260, }}>b. Akumulasi Sebelumnya </Text>
                                    <Text style={{ paddingTop: -17, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -32, paddingLeft: 270, }}>Rp 0.00</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 70, width: 260, }}>c. Sisa Dana yang belum dicairkan </Text>
                                    <Text style={{ paddingTop: -17, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -32, paddingLeft: 270, }}>Rp 134.400.00</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 70, width: 260, }}>d. Jumlah dana yang diminta saat ini </Text>
                                    <Text style={{ paddingTop: -32, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -47, paddingLeft: 270, }}>Rp {currency(e.pagu)},-</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 70, width: 260, }}>e. Sisa Jumlah Dana ADD yang belum di Cairkan </Text>
                                    <Text style={{ paddingTop: -32, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -47, paddingLeft: 270, }}>Rp 134.400.00</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ paddingLeft: 50, width: 260, }}>8. Ketentuan - Ketentuan Lainnya</Text>
                                    <Text style={{ paddingTop: -15, paddingLeft: 260, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -30, paddingLeft: 270, fontWeight: 'semibold' }}>{e.opt1}</Text>
                                </View>
                                <View style={{ marginTop: -10 }}>
                                    <View style={{ width: 260, alignSelf: 'flex-end' }}>
                                        <Text style={{ textAlign: 'center' }}>Ditetapkan di {camelize(e.kampung)}</Text>
                                        <Text style={{ textAlign: 'center', marginTop: -3 }}>Pada Tanggal {moment(e.tgl_spp).locale('id').format("DD MMMM YYYY")}</Text>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Kepala Kampung</Text>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 50, fontSize: 13, textDecoration: 'underline' }}>{e.nama_kepala}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text
                                style={style.pageNumber}
                            // render={({ pageNumber, totalPages }) =>
                            //     `Halaman ${pageNumber} dari ${totalPages}`
                            // }
                            >Halaman 1 dari 2</Text>
                        </Page>
                        <Page size="A4" orientation="landscape"
                            key={`doc-spp-2`}
                            style={{
                                paddingTop: "15px",
                                paddingLeft: "50px",
                                paddingBottom: "40px",
                                paddingRight: "35px",
                                fontFamily: 'Roboto',
                                fontWeight: 'light'
                            }}>
                            <Image style={style.image} src={Yhk} fixed />
                            <View fixed>
                                <View>
                                    <Text style={{ marginTop: 8, textAlign: "center", paddingLeft: 10, fontFamily: 'Roboto', fontWeight: 'extrabold' }}   >
                                        PEMERINTAH KABUPATEN YAHUKIMO
                                    </Text>
                                    <Text style={{ paddingTop: 0, textAlign: "center", paddingLeft: 10, fontSize: 12, fontFamily: 'Roboto', fontWeight: 'semibold' }}>
                                        DISTRIK {e.distrik}
                                    </Text>
                                    <Text style={{ paddingTop: 0, textAlign: "center", paddingLeft: 10, fontSize: 12, fontFamily: 'Roboto', fontWeight: 'semibold' }} >
                                        KAMPUNG {e.kampung}
                                    </Text>
                                </View>
                                <ColoredLine color="black" />
                            </View>
                            <View style={{ fontSize: 12 }}>
                                <Text>Lampiran</Text><Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                <Text style={{ paddingTop: -31, paddingLeft: 135, }}> SURAT PERMOHONAN PENERBITAN SURAT PENCAIRAN DANA KAMPUNG </Text>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ width: 130, }}>Nomor SP2SPD</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>{e.no_spp}</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Tanggal</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>{moment(e.tgl_spp).locale('id').format("DD MMMM YYYY")}</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Kampung</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>{e.kampung}</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Distrik</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>{e.distrik}</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Periode</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>{e.thp_cair}</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Tahun Anggaran</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>2022</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Nomor Perkada</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>...............</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: -20, fontSize: 10 }}>
                                <View style={{
                                    width: '100%', border: '2px', borderColor: 'black', borderStyle: 'solid',
                                    alignSelf: 'center', alignItems: 'center', flexDirection: 'row'
                                }}>
                                    <View style={{ width: "6%" }}>
                                        <View >
                                            <Text style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold' }}>No Urut</Text>
                                            <View style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                                <Text style={{ textAlign: 'center', width: 45, fontWeight: 'semibold' }}>1</Text>
                                                <Text style={{ color: 'white' }}>1</Text>
                                                <Text style={{ color: 'white' }}>1</Text>
                                                <Text style={{ color: 'white' }}>1</Text>
                                                <Text style={{ color: 'white' }}>1</Text>
                                                <Text style={{ color: 'white' }}>1</Text>
                                                <Text style={{ color: 'white' }}>1</Text>
                                                <Text style={{ marginTop: 2, fontWeight: 'semibold', color: 'white' }}>1</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: "35%" }}>
                                        <Text style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold' }}>Program / Kegiatan dan Sub Kegiatan</Text>
                                        <View style={{ border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                            <Text style={{ fontWeight: 'semibold' }} >5.1.01.01 Penyelenggaraan Belanja SILTAP, Tunjangan dan Operasional Pemerintahan Desa</Text>
                                            <Text>- Penyediaan Penghasilan Tetap dan Tunjangan Kepala Desa</Text>
                                            <Text>- Penyediaan Penghasilan Tetap dan Tunjangan Perangkat Desa</Text>
                                            <Text>- Penyediaan Tunjangan BPD</Text>
                                            <Text style={{ marginTop: 2, fontWeight: 'semibold' }}>Sub Total</Text>
                                        </View>
                                    </View>
                                    <View >
                                        <View >
                                            <Text style={{ textAlign: 'center', width: 85, border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold' }}>Pagu Anggaran</Text>
                                            <View style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83 }}>Rp 18.000.000,-</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, }}>Rp 53.400.000,-</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, }}>Rp 63.300.000,-</Text>
                                                <Text style={{ width: 83, textAlign: 'right', marginTop: 2, fontWeight: 'semibold' }}>Rp 134.400.000,-</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View >
                                        <View >
                                            <Text style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold', letterSpacing: -0.5 }}>Akumulasi Pengajuan Sebelumnya</Text>
                                            <View style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'white' }}>-</Text>
                                                <Text style={{ color: 'white' }}>-</Text>
                                                <Text style={{ textAlign: 'center', alignItems: 'center', width: 150, alignContent: 'center' }}>-</Text>
                                                <Text style={{ color: 'white' }}>-</Text>
                                                <Text style={{ textAlign: 'center', alignItems: 'center', width: 150, }}>-</Text>
                                                <Text style={{ color: 'white' }}>-</Text>
                                                <Text style={{ textAlign: 'center', alignItems: 'center', width: 150, }}>-</Text>
                                                <Text style={{ width: 150, textAlign: 'bold', marginTop: 2, fontWeight: 'semibold' }}>-</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View >
                                        <View >
                                            <Text style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold', letterSpacing: -0.5 }}>Jumlah Pengajuan Saat ini</Text>
                                            <View style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 120, }}>Rp 4.500.000,-</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 120, }}>Rp 13.350.000,-</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 120, }}>Rp 15.750.000,-</Text>
                                                <Text style={{ width: 120, textAlign: 'right', marginTop: 2, fontWeight: 'semibold' }}>Rp {currency(e.pagu)},-</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View >
                                        <View >
                                            <Text style={{ textAlign: 'center', width: 85, border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold' }}>Sisa Anggaran</Text>
                                            <View style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, }}>Rp 13.500.000,-</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, }}>Rp 40.050.000,-</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, }}>Rp 47.250.000,-</Text>
                                                <Text style={{ width: 83, marginTop: 2, fontWeight: 'semibold' }}>Rp 100.800.000,-</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Text>
                                        <Text>Jumlah Permohonan Dana:</Text>
                                        <Text style={{ fontWeight: 'semibold' }}>Rp {currency(e.pagu)}</Text>
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontWeight: "thin", fontStyle: 'italic' }}>(Terbilang: Tiga Puluh Tiga Juta Enam Ratus Ribu Rupiah)</Text>
                                </View>
                                <View style={{ marginTop: -10 }}>
                                    <View style={{ width: 260, alignSelf: 'flex-end' }}>
                                        <Text style={{ textAlign: 'center' }}>Ditetapkan di {camelize(e.kampung)}</Text>
                                        <Text style={{ textAlign: 'center', marginTop: -3 }}>Pada Tanggal {moment(e.tgl_spp).locale('id').format("DD MMMM YYYY")}</Text>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Kepala Kampung</Text>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 50, fontSize: 13, textDecoration: 'underline' }}>{e.nama_kepala}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text
                                style={style.pageNumber}
                            // render={({ pageNumber, totalPages }) =>
                            //     `Halaman ${pageNumber} dari ${totalPages}`
                            // }
                            >Halaman 2 dari 2</Text>
                        </Page>
                    </>
                ))
            }
        </Document >
    );
};

export default SppDoc;
