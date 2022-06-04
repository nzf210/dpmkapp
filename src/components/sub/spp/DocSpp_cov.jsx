import React from "react";
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
import { sayit_v2 } from '../Font';
//var CurrencyFormat = require('react-currency-format');
import CurrencyFormat from 'react-currency-format';

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

const DocSpp_cov = ({ dataselectspp }) => {

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
        HMmenimbang: { position: 'relative', flexDirection: 'row', },
        menimbang: { fontSize: 11, minWidth: 80, maxWidth: 80, width: 80 },
        titik: { fontSize: 11, maxWidth: 2, minWidth: 2, paddingLeft: 10 },
        isiMenimbang: { fontSize: 11, paddingLeft: 10, textAlign: 'justify' },
        isiMenimbang2: { fontSize: 11, paddingLeft: 10, textAlign: 'justify', flexDirection: 'row' },
        isiMenimbang22: { fontSize: 11, paddingLeft: 10, textAlign: 'justify', flexDirection: 'row' },
        text5: { fontSize: "12px", textAlign: "center", marginTop: 70, fontFamily: 'Roboto', fontWeight: 'semibold' }, //fontWeight: 'ultrabold',
    });

    return (
        <Document key="docsppreg">
            {dataselectspp &&
                dataselectspp.map((e, i) => (
                    <>
                        <Page
                            size="A4"
                            key={`${i.toString()}sppreg`}
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
                            <View style={{ fontSize: 11 }}>
                                <Text style={style.text3}>NOMOR: {e.no_spp}</Text>
                                <Text style={{
                                    paddingTop: 10, textAlign: 'center', fontFamily: 'Roboto', fontWeight: 'semibold'
                                }}>SURAT PERMOHONAN PENERBITAN SURAT PENCAIRAN DANA</Text>
                                <Text style={style.text3}>TAHUN ANGGARAN 2022</Text>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <View style={style.HMmenimbang}>
                                    <Text style={style.menimbang}>Menimbang</Text>
                                    <Text style={[style.titik, { paddingLeft: 5 }]}>:</Text>
                                    <Text style={[style.isiMenimbang, { maxWidth: 420 }]}>
                                        Baik untuk melaksanakan anggaran sub kegiatan tahun anggaran 2022 berdasarkan
                                        anggaran pendapatan dan belanja kampung yang telah ditetapkan, perlu menerbitkan
                                        surat pencairan dengan menerbitkan Surat Permohonan Penerbitan Surat Pencairan
                                        Dana (SP2SPD) Tahun Anggaran 2022
                                    </Text>
                                </View>
                                <View style={[style.HMmenimbang]}>
                                    <Text style={style.menimbang}>Mengingat</Text>
                                    <Text style={[style.titik, { paddingLeft: 5 }]}>:</Text>
                                    <View style={{ maxWidth: 420, fontSize: 11, paddingLeft: 10 }}>
                                        {/* <View style={{ flexDirection: 'column' }}> */}
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ width: 7 }}>1.</Text>
                                            <Text style={{ maxWidth: 410, marginLeft: 5 }}>Peraturan Menteri Keuangan Republik Indonesia Nomor 190/PMK.07/2021
                                                Tentang Pengelolaan Dana Desa</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ width: 7 }}>2.</Text>
                                            <Text style={{ maxWidth: 410, marginLeft: 5, }}>  Surat Keputusan Bupati Yahukimo Nomor 38 Tahun 2022 Tanggal 28 Januari
                                                2022 Tentang Alokasi Dana Desa Tahun 2022</Text>
                                        </View>
                                        {/* </View> */}
                                    </View>

                                </View>
                            </View>
                            <Text style={[style.text5, { paddingTop: -60 }]}>YANG BERMOHON :</Text>
                            <View style={{ fontSize: 11, flexDirection: 'column', marginLeft: 30, marginTop: -55 }}>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={{ width: 200 }} >1. Nama Kampung</Text>
                                    <Text style={{ width: 2 }}>:</Text>
                                    <Text style={{ paddingLeft: 10 }}>{e.kampung}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: 200 }}  >2. Nama Distrik</Text>
                                    <Text style={{ width: 2 }}>:</Text>
                                    <Text style={{ paddingLeft: 10 }}>{e.distrik}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: 200 }} >3. Nama Kepala Kampung</Text>
                                    <Text style={{ width: 2 }}>:</Text>
                                    <Text style={{ paddingLeft: 10, fontWeight: 'semibold' }}>{e.nama_kepala}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: 200 }} >4. Nama Bendahara Kampung</Text>
                                    <Text style={{ width: 2 }}>:</Text>
                                    <Text style={{ paddingLeft: 10, fontWeight: 'semibold' }}>{e.nama}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: 200 }}  >5. Jumlah Permohonan Dana Rp.</Text>
                                    <Text style={{ width: 2 }}>:</Text>
                                    <Text style={{ paddingLeft: 10, fontWeight: 'semibold' }}><CurrencyFormat value={e.pagu} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: 200 }}  >6. Untuk Kebutuhan</Text>
                                    <Text style={{ width: 2 }}>:</Text>
                                    <Text style={{ paddingLeft: 10, width: 250 }}>{e.thp_advis}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: 200 }} >7. Ikhtisar Permohonan Dana :</Text>
                                </View>
                                <View style={{ paddingLeft: 20 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>a. </Text>
                                        <Text style={{ width: 170 }} >Jumlah Pagu Bantuan Covid_19</Text>
                                        <Text style={{ width: 2 }}>:</Text>
                                        <Text style={{ paddingLeft: 10 }}><CurrencyFormat value={e.pagu} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                    </View>
                                    <Text><Text style={{ color: 'white', transformOriginY: -5 }}>...</Text>.........................................................................................................</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>b. </Text>
                                        <Text style={{ width: 170 }} >Akumulasi Sebelumnya </Text>
                                        <Text style={{ width: 2 }}>:</Text>
                                        <Text style={{ paddingLeft: 10 }}>
                                            <CurrencyFormat value={parseInt(0)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                                        </Text>
                                    </View>
                                    <Text><Text style={{ color: 'white', marginTop: -4, paddingTop: -4 }}>...</Text>.........................................................................................................</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>c. </Text>
                                        <Text style={{ width: 170 }} >Sisa Dana yang belum dicairkan</Text>
                                        <Text style={{ width: 2 }}>:</Text>
                                        <Text style={{ paddingLeft: 10 }}><CurrencyFormat value={parseInt(e.pagu)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                    </View>
                                    <Text><Text style={{ color: 'white', marginTop: -4, paddingTop: -4 }}>...</Text>.........................................................................................................</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>d. </Text>
                                        <Text style={{ width: 170 }} >Jumlah dana yang diminta saat ini </Text>
                                        <Text style={{ width: 2 }}>:</Text>
                                        <Text style={{ paddingLeft: 10, fontWeight: 'semibold' }}><CurrencyFormat value={e.pagu} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                        {/* <Text style={{ paddingTop: -47, paddingLeft: 270, }}>Rp {currency(e.pagu)},-</Text> */}
                                    </View>
                                    <Text><Text style={{ color: 'white', marginTop: -4, paddingTop: -4 }}>...</Text>.........................................................................................................</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>e. </Text>
                                        <Text style={{ width: 170 }}  >Sisa Jumlah Dana
                                            Bantuan Covid_19 yang
                                            belum di Cairkan </Text>
                                        <Text style={{ width: 2 }}>:</Text>
                                        <Text style={{ paddingLeft: 10 }}><CurrencyFormat value={parseInt(e.pagu)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                    </View>
                                    <Text><Text style={{ color: 'white', marginTop: -4, paddingTop: -4 }}>...</Text>.........................................................................................................</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ width: 200 }} >8. Ketentuan - Ketentuan Lainnya</Text>
                                    <Text style={{ width: 2 }}>:</Text>
                                    <Text style={{ paddingLeft: 10, width: 250 }}>{e.thp_advis}</Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ width: 260, alignSelf: 'flex-end' }}>
                                        <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>Ditetapkan di {e.kampung}</Text>
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
                            key={`docsppreg2`}
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
                            <View style={{ fontSize: 11 }}>
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
                                    {/* <Text style={{ paddingTop: -31, paddingLeft: 135, }}>{e.thp_cair}</Text> */}
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>Bulan {moment(e.tgl_spp).locale('id').format("MMMM")}</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Tahun Anggaran</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>2022</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Nomor APBK</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>............... Tahun 2022</Text>
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
                                                {/*<Text style={{ color: 'white' }}>1</Text>
                                                <Text style={{ color: 'white' }}>1</Text>
                                                <Text style={{ color: 'white' }}>1</Text>
                                                <Text style={{ marginTop: 2, fontWeight: 'semibold', color: 'white' }}>1</Text> */}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: "35%" }}>
                                        <Text style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold' }}>Program / Kegiatan dan Sub Kegiatan</Text>
                                        <View style={{ border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                            <Text style={{ fontWeight: 'semibold' }} ><Text style={{ color: 'white' }}>....</Text>5.2.02.04 Penyelenggaraan Desa Siaga Kesehatan</Text>
                                            <Text><Text style={{ color: 'white' }}>....</Text>- Belanja Penyelenggaraan Desa Siaga Kesehatan</Text>
                                            <Text style={{ color: 'white' }}>- Penyediaan Penghasilan Tetap dan Tunjangan Perangkat Desa</Text>
                                            {/* <Text style={{ color: 'white' }}>- Penyediaan Penghasilan Tetap dan Tunjangan Perangkat Desa</Text>
                                            <Text>- Penyediaan Tunjangan BPD</Text>
                                            <Text style={{ marginTop: 2, fontWeight: 'semibold' }}>Sub Total</Text> */}
                                        </View>
                                    </View>
                                    <View >
                                        <View >
                                            <Text style={{ textAlign: 'center', width: 110, border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold' }}>Pagu Anggaran</Text>
                                            <View style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                                {/* <Text style={{ color: 'white' }}>0</Text> */}
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83 }}>
                                                    <CurrencyFormat value={parseInt(e.pagu)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                                                </Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, fontWeight: 'semibold' }}><CurrencyFormat value={parseInt(e.pagu)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />
                                                </Text>
                                                {/* <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, }}>Rp 63.300.000,-</Text>
                                                <Text style={{ width: 83, textAlign: 'right', marginTop: 2, fontWeight: 'semibold' }}>Rp 134.400.000,-</Text> */}
                                            </View>
                                        </View>
                                    </View>
                                    <View >
                                        <View >
                                            <Text style={{ textAlign: 'center', border: '1px', width: 180, borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold', letterSpacing: -0.5 }}>Akumulasi Pengajuan Sebelumnya</Text>
                                            <View style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                                {/* <Text style={{ color: 'white' }}>-</Text> */}
                                                <Text style={{ color: 'white' }}>-</Text>
                                                <Text style={{ textAlign: 'center', alignItems: 'center', width: 150, alignContent: 'center', paddingLeft: 20 }}><CurrencyFormat value={parseInt(0)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                                <Text style={{ color: 'white' }}>-</Text>
                                                <Text style={{ textAlign: 'center', alignItems: 'center', width: 150, paddingLeft: 20, fontWeight: 'semibold' }}><CurrencyFormat value={parseInt(0)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                                {/* <Text style={{ color: 'white' }}>-</Text>
                                                <Text style={{ textAlign: 'center', alignItems: 'center', width: 150, }}><CurrencyFormat value={parseInt(e.opt4)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                                <Text style={{ width: 150, textAlign: 'center', marginTop: 2, fontWeight: 'semibold' }}><CurrencyFormat value={(parseInt(e.thp_select) + parseInt(e.opt3) + parseInt(e.opt4))} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text> */}
                                            </View>
                                        </View>
                                    </View>
                                    <View >
                                        <View >
                                            <Text style={{ textAlign: 'center', border: '1px', borderColor: 'black', width: 155, borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold', letterSpacing: -0.5 }}>Jumlah Pengajuan Saat ini</Text>
                                            <View style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                                {/* <Text style={{ color: 'white' }}>0</Text> */}
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 120, }}><CurrencyFormat value={parseInt(e.pagu)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 120, fontWeight: 'semibold' }}><CurrencyFormat value={parseInt(e.pagu)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                                {/* <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 120, }}>Rp 15.750.000,-</Text>
                                                <Text style={{ width: 120, textAlign: 'right', marginTop: 2, fontWeight: 'semibold' }}><CurrencyFormat value={e.pagu} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text> */}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* <View >
                                        <View >
                                            <Text style={{ textAlign: 'center', width: 85, border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start', fontWeight: 'semibold' }}>Sisa Anggaran</Text>
                                            <View style={{ textAlign: 'center', border: '1px', borderColor: 'black', borderStyle: 'dashed', paddingVertical: 3, alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, }}><CurrencyFormat value={parseInt(18000000 - 4500000 - (parseInt(e.thp_select)))} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, }}><CurrencyFormat value={parseInt(53400000 - 13350000 - (parseInt(e.opt3)))} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                                <Text style={{ color: 'white' }}>0</Text>
                                                <Text style={{ textAlign: 'right', width: 83, }}><CurrencyFormat value={parseInt(63300000 - 15750000 - (parseInt(e.opt4)))} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                                <Text style={{ width: 83, marginTop: 2, fontWeight: 'semibold' }}><CurrencyFormat value={parseInt(134000000 - 33600000 - (parseInt(e.thp_select) + parseInt(e.opt3) + parseInt(e.opt4)))} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                            </View>
                                        </View>
                                    </View> */}
                                <View >
                                    <Text>
                                        <Text>Jumlah Permohonan Dana:</Text>
                                        <Text style={{ fontWeight: 'semibold' }}><CurrencyFormat value={e.pagu} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></Text>
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontWeight: "thin", fontStyle: 'italic', textTransform: 'capitalize' }}>(Terbilang: {sayit_v2(e.pagu)})</Text>
                                    {/* <Text style={{ fontFamily: 'Raleway', fontWeight: "thin", fontStyle: 'italic' }}>(Terbilang: {konvertAngka(e.pagu)} rupiah )</Text> */}
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ width: 260, alignSelf: 'flex-end' }}>
                                        <Text style={{ textAlign: 'center', }}>Ditetapkan di <Text style={{ textTransform: 'capitalize' }}>{e.kampung}</Text> </Text>
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

export default DocSpp_cov;
