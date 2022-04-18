import React, { useEffect } from "react";
import {
    Page,
    Text,
    Image,
    Document,
    StyleSheet,
    View
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
import { red } from "@material-ui/core/colors";

Font.register({
    family: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [
        { src: black, },
        { src: bold, fontWeight: "bold", },
        { src: extrabold, fontWeight: "extrabold", },
        { src: extralight, fontWeight: "extralight", },
        { src: light, fontWeight: "light", },
        { src: medium, fontWeight: "medium", },
        { src: reguler, fontWeight: "reguler", },
        { src: semibold, fontWeight: "semibold", },
        { src: thin, fontWeight: "thin", },
        { src: italic, fontWeight: "thin", fontStyle: 'italic', }
    ],
})

Font.register({
    family: "Raleway",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [{ src: italic, fontWeight: "thin", fontStyle: 'italic', }],
})

const SpmDoc = ({ dataselectspp }) => {
    useEffect(() => {
        console.log("spd dok", dataselectspp);
    }, []);

    //const borderColor = '#90e5fc';
    const ColoredLine = ({ color }) => (
        <hr
            style={{ color: color, backgroundColor: color, height: "3px", marginTop: "5px", marginBottom: "5px" }}
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
        }, pageNumber: { position: "absolute", fontSize: 12, bottom: 17, left: 0, right: 0, textAlign: "center", color: "grey" },
        image: { height: "50px", width: "50px", marginTop: "25px", marginLeft: "62px", position: 'absolute' },
        view1: { paddingVertical: 0, flexDirection: 'row', width: '100%', maxWidth: '100%' },
        view1r: { paddingLeft: 60, paddingRight: 5, width: 170 },
        view2r: { paddingRight: 5 },
        view3r: { fontWeight: 'semibold' },
        table: { width: '100%', },
        row: { display: 'flex', flexDirection: 'row', borderTop: '1px solid #EEE', paddingTop: 0, paddingBottom: 0, },
        header: { borderTop: 'none', },
        bold: { fontWeight: 'semibold', fontSize: 11, textAlign: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center' },
        // So Declarative and unDRY 👌
        row1: { width: '5%' },
        row2: { width: '19%', textAlign: 'left' },
        row3: { width: '23%', },
        row4: { width: '10%', },
        row5: { width: '7%', },
        row6: { width: '10%', },
        row7: { width: '13%', },
        row8: { width: '20%', },
        hidden: { color: 'white' },
        biru: { color: '#87CEEB' },
        bgbiru: { backgroundColor: '#87CEEB' },
        btsbiru: { width: '67%' },
        boder: { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }

    });

    return (
        <Document key="doc-spm">
            {dataselectspp &&
                dataselectspp.map((e, i) => (
                    <>
                        <Page
                            size="A4"
                            key={`doc-spd-page1`}
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
                            <View style={{ fontSize: 12, marginTop: -3 }}>
                                <Text style={{ textDecoration: 'underline', fontWeight: 'semibold', textAlign: 'center' }}>SURAT PERNYATAN</Text>
                                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>SURAT KELENGKAPAN BERKAS KAMPUNG (SKBK)</Text>
                                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>NOMOR: {e.no_spm}</Text>
                            </View>
                            <View style={{ fontSize: 11.7, }}>
                                <View style={{ marginTop: 2 }}>
                                    <Text>Kami yang bertandatangan dibawah ini Adalah Benar Kepala Kampung dan Bendahara yang berhak Mencairkan {e.persen} Tahun 2022 :</Text>
                                </View>
                                <View style={{ marginTop: 2 }}>
                                    <View style={{ lineHeight: 1.3, flexDirection: 'column' }}>
                                        <View style={style.view1}>
                                            <Text style={style.view1r}>Nama</Text>
                                            <Text style={style.view2r}>:</Text>
                                            <Text style={style.view3r}>{e.nama_kepala}</Text>
                                        </View>
                                        <View style={style.view1}>
                                            <Text style={style.view1r}>Jabatan</Text>
                                            <Text style={style.view2r}>:</Text>
                                            <Text >KEPALA KAMPUNG {e.kampung}</Text>
                                        </View>
                                        <View style={style.view1}>
                                            <Text style={style.view1r} >Nama</Text>
                                            <Text style={style.view2r}>:</Text>
                                            <Text style={style.view3r}>{e.nama}</Text>
                                        </View>
                                        <View style={style.view1}>
                                            <Text style={style.view1r}>Jabatan</Text>
                                            <Text style={style.view2r}>:</Text>
                                            <Text >BENDAHARA KAMPUNG {e.kampung}</Text>
                                        </View>
                                        <View style={style.view1}>
                                            <Text style={style.view1r}>Nama Bank</Text>
                                            <Text style={style.view2r}>:</Text>
                                            <Text >Bank Papua Cabang Dekai</Text>
                                        </View>
                                        <View style={style.view1}>
                                            <Text style={style.view1r}>NO Rekening</Text>
                                            <Text style={style.view2r}>:</Text>
                                            <Text >{e.no_rek}</Text>
                                        </View>
                                        <View style={style.view1}>
                                            <Text style={style.view1r}>Nama Rekening</Text>
                                            <Text style={style.view2r}>:</Text>
                                            <Text >{e.rek}</Text>
                                        </View>
                                        <View style={style.view1}>
                                            <Text style={style.view1r}>Nilai Dana</Text>
                                            <Text style={style.view2r}>:</Text>
                                            <Text >Rp {currency(e.pagu)},-</Text>
                                        </View>
                                        <View style={style.view1}>
                                            <Text style={style.view1r}>Terbilang</Text>
                                            <Text style={style.view2r}>:</Text>
                                            <Text style={{ fontFamily: 'Raleway', fontWeight: "thin", fontStyle: 'italic' }}>Tiga Puluh Tiga Juta Enam Ratus Ribu Rupiah</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ width: 202, }}>Telah Melengkapi Syarat</Text>
                                        <Text style={{ paddingLeft: 0, width: 2, maxWidth: 2 }}>:</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', lineHeight: 1.1, marginTop: 14 }}>
                                        <View style={{ marginTop: -17, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>1.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text style={{ width: '95%' }}>Surat Permohonan Penerbitan Surat Pencairan Dana (SP2SPD) dengan NOMOR {e.no_spp} Tanggal {moment(e.tgl_spp).locale('id').format("DD MMMM YYYY")}</Text>
                                        </View>
                                        <View style={{ marginTop: 0, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>2.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text style={{ width: '95%' }}>Fotocopy Surat Keputusan (SK) Pengangkatan Kepala Kampung dengan Nomor : {e.no_sk_kepala}</Text>
                                        </View>
                                        <View style={{ marginTop: 0, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>3.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text style={{ width: '95%' }}>Kartu Tanda Penduduk (Asli), Melampirkan Fotocopyan KTP kepala Kampung dan Bendahara sebanyak 2 (Dua) Rangkap</Text>
                                        </View>
                                        <View style={{ marginTop: 0, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>4.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text style={{ width: '95%' }}>Surat Pergantian Bendahara (jika dilakukan pergantian) Nomor : {e.no_sk}</Text>
                                        </View>
                                        <View style={{ marginTop: 0, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>5.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text style={{ width: '95%' }}>Pas Photo Ukuran 3 x 4 untuk Kepala Kampung dan Bendahara sebanyak 2 Lembar </Text>
                                        </View>
                                        <View>
                                            <Text><Text style={{ fontWeight: 'semibold' }}>Serta bertanggung jawab penuh atas segala pengeluaran di Rekening dengan Nama dan Nomor Rekening diatas, Apabila dikemudian hari ditemukan ketidaksesuaian antara Nama yang tertera di surat Pengantar pencairan dan Pihak yang melakukan pencairan di Bank, maka Dinas terkait tidak terlibat dan tidak bertanggung jawab atas proses pencairan tersebut.</Text> Serta menyatakan dengan sesungguhnya bahwa, setelah menerima {e.persen} Tahun 2022 akan melaksanakan ketentuan sebagai berikut :</Text>
                                        </View>
                                        <View style={{ marginTop: 0, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>1.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text>Akan segera kembali ke kampung untuk melaksanakan program sesuai Dengan Anggaran Pendapatan dan Belanja Kampung (APBK) yang telah ditetapkan; dan Berdasarkan Surat Perintah Pembayaran (SPP) Tahun 2022. </Text>
                                        </View>
                                        <View style={{ marginTop: 0, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>2.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text>Akan membuat laporan pertanggungjawaban kegiatan dengan menggunakan Aplikasi Sistem Keuangan Desa (SISKEUDES) yang dibuat oleh Badan Pemeriksan Keuangan Pembangunan (BPKP) sesuai dengan Rekomendasi Komisi Pemberantasan Korupsi (KPK);</Text>
                                        </View>
                                        <View style={{ marginTop: 0, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>3.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text>Akan menyetor Pajak sesuai dengan ketentuan, yang tertera pada penerimaan buku Pajak pada Aplikasi Siskeudes</Text>
                                        </View>
                                        <View style={{ marginTop: 0, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>4.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text>Apabila dikemudian hari terjadi penyalahgunaan/penyimpang Dana Desa, maka KAMI siap mempertanggungjawabkan di hadapan hukum. </Text>
                                        </View>
                                        <View style={{ marginTop: 0, flexDirection: 'row', paddingHorizontal: 2, minWidth: 4 }}>
                                            <Text style={{ width: 7, color: 'white' }}>11 </Text>
                                            <Text style={{ width: 7, }}>5.</Text>
                                            <Text style={{ width: 7, color: 'white' }}>111</Text>
                                            <Text>Akan membuat laporan pertanggungjawaban Dana Desa berdasarkan peraturan yang berlaku;</Text>
                                        </View>
                                        <Text>Demikian surat pernyataan ini dibuat, dan akan dipergunakan sebagaimana mestinya. </Text>
                                        <View style={{ width: 720, fontSize: 11, alignItems: 'flex-start', marginTop: 10 }}>
                                            <Text style={{ textAlign: 'right', width: "70%" }}>{camelize(e.kampung)}, {moment(e.tgl_spp).locale('id').format("DD MMMM YYYY")}</Text>
                                            <View style={{ width: 720, alignSelf: 'center', marginLeft: -30, marginBottom: -20 }}>
                                                <View style={{ flexDirection: 'row', width: '80%' }}>
                                                    <View style={{ flexDirection: 'column', minHeight: 80, width: "50%" }}>
                                                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Kepala Kampung</Text>
                                                        <Text style={{ marginTop: 32, marginBottom: -13, marginLeft: 180 }}>Materai 10.000</Text>
                                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline', marginTop: 40 }}>{e.nama_kepala}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'column', minHeight: 80, width: "40%" }}>
                                                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Bendahara Kampung</Text>
                                                        <Text style={{ marginTop: 32, marginBottom: -13, color: 'white' }}>Materai 10.000</Text>
                                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline', marginTop: 40 }}>{e.nama}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
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

                        <Page size="A4"
                            key={`doc-spm-2-page2`}
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
                            <View style={{ fontSize: 12 }}>
                                <Text>Bidang</Text><Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                <Text style={{ paddingTop: -31, paddingLeft: 135, }}>2.1. Penyelenggaraan Pemerintahan Desa</Text>
                                <View style={{ marginTop: -30 }}>
                                    <Text style={{ width: 130, }}>Kegiatan</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>Penghasilan Tetap (SILTAP)</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Waktu Pelaksanaan</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>3 BULAN</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Pendanaa</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, fontWeight: 'semibold' }}>Rp 33.600.000,-</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Sumber</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>Alokasi Dana Desa (ADD) Tahun Anggaran 2022</Text>
                                </View>
                                <View style={{ marginTop: -31 }}>
                                    <Text style={{ width: 130, }}>Rincian</Text>
                                    <Text style={{ paddingTop: -16, paddingLeft: 130, width: 2, maxWidth: 2 }}>:</Text>
                                    <Text style={{ paddingTop: -31, paddingLeft: 135, }}>Honorium Kepala Kampung dan Aparatnya</Text>
                                </View>
                            </View>

                            <View style={[style.table, { marginTop: -25, fontSize: 10.7, border: 0.7 }]}>
                                <View style={[style.row, style.bold, style.header, { backgroundColor: '#a3a3c2', borderBottom: 1, width: '100%' }]}>
                                    <Text style={[style.row1,]}>NO</Text>
                                    <Text style={[style.row2,]}>NAMA</Text>
                                    <Text style={[style.row3,]}>JABATAN</Text>
                                    <Text style={[style.row4,]}> VOL   (BULAN)</Text>
                                    <Text style={[style.row5,]}>SAT</Text>
                                    <Text style={[style.row6,]}>HARGA SATUAN (Rp)</Text>
                                    <Text style={[style.row7,]}>JUMLAH HARGA (Rp)</Text>
                                    <Text style={[style.row8,]}>TANDA TANGAN/ PARAF</Text>
                                </View>
                                <View style={[style.row, style.bold, style.header, { borderBottom: 0.7 }]}>
                                    <Text style={[{ width: '67%' }, style.bgbiru]}>PEMERINTAHAN KAMPUNG</Text>
                                    <Text style={[style.row7, style.bgbiru, { textAlign: 'right', paddingRight: 3 }]}>17.850.000</Text>
                                    <Text style={[style.row8, style.bgbiru, style.biru]}>.....</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, style.boder]}>1</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nama_kepala}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, paddingTop: 0, alignItems: 'center', }]}>Kepala Kampung</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>1.500.000</Text>
                                    <Text style={[style.row7, style.boder]}>4.500.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, style.boder]}>2</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_3}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, alignItems: 'center', }]}>Sekretaris</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>850.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.550.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, style.boder]}>3</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nama}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, alignItems: 'center', }]}>Bendahara</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>800.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.400.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>4</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_4}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, paddingTop: 0, alignItems: 'center', }]}>Kaur Pemerintahan</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>700.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.100.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>5</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_5}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, alignItems: 'center', }]}>Kaur Umum</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>700.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.100.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>6</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_6}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, paddingTop: 0, alignItems: 'center', }]}>Kaur Kesejahteraan Rakyat</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>700.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.100.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>7</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_7}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, paddingTop: 0, alignItems: 'center', }]}>Kaur Pembangunan</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>700.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.100.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, style.bold, style.header, { borderTop: 0.8, borderBottom: 0.8 }]}>
                                    <Text style={[{ width: '67%' }, style.bgbiru]}>BADAN MUSYAWARAH KAMPUNG</Text>
                                    <Text style={[style.row7, style.bgbiru, { textAlign: 'right', paddingRight: 3 }]}>15.750.000</Text>
                                    <Text style={[style.row8, style.bgbiru, style.biru]}>.....</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>1</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_8}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, alignItems: 'center', }]}>Ketua Bamuskam</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>1.500.000</Text>
                                    <Text style={[style.row7, style.boder]}>4.500.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>2</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_9}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, paddingTop: 0, alignItems: 'center', }]}>Wakil Ketua Bamuskam</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>850.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.550.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>3</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_10}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, paddingTop: 0, alignItems: 'center', }]}>Sekretaris Bamuskam</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>800.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.400.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>4</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_11}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, paddingTop: 0, alignItems: 'center', }]}>Ketua Bidang PPK &amp; PK</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>700.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.100.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>5</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_12}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, paddingTop: 0, alignItems: 'center', }]}>Ketua Bidang PK &amp; PMK</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>700.000</Text>
                                    <Text style={[style.row7, style.boder]}>2.100.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, { fontSize: 10, textAlign: 'center', minHeight: 28, maxHeight: 28, alignItems: 'center' }]}>
                                    <Text style={[style.row1, { borderRight: '1px solid #EEE', minHeight: 28, alignItems: 'center', paddingTop: 7 }]}>6</Text>
                                    <Text style={[style.row2, style.boder]}>{e.nm_13}</Text>
                                    <Text style={[style.row3, style.boder, { fontSize: 10, textAlign: 'left', width: 88, alignItems: 'center', }]}>Hansip</Text>
                                    <Text style={[style.row4, style.boder]}>3</Text>
                                    <Text style={[style.row5, style.boder]}>OB</Text>
                                    <Text style={[style.row6, style.boder]}>500.000</Text>
                                    <Text style={[style.row7, style.boder]}>1.500.000</Text>
                                    <Text style={[style.row8, style.boder, { color: 'white' }]}>-</Text>
                                </View>
                                <View style={[style.row, style.bold, style.header, { borderTop: 1 }]}>
                                    <Text style={[{ width: '67%', backgroundColor: 'yellow', textAlign: 'center' }]}>Total</Text>
                                    <Text style={[style.row7, { backgroundColor: 'yellow' }, { textAlign: 'right', paddingRight: 3 }]}>33.600.000</Text>
                                    <Text style={[style.row8, { backgroundColor: 'yellow', color: 'yellow' }]}>.....</Text>
                                </View>

                            </View>
                            <View style={{ width: 720, fontSize: 11, alignItems: 'flex-start', marginTop: 10 }}>
                                <Text style={{ textAlign: 'right', width: "70%" }}>{camelize(e.kampung)}, {moment(e.tgl_spp).locale('id').format("DD MMMM YYYY")}</Text>
                                <View style={{ width: 720, alignSelf: 'center', marginLeft: -30, marginBottom: -20 }}>
                                    <View style={{ flexDirection: 'row', width: '80%' }}>
                                        <View style={{ flexDirection: 'column', minHeight: 80, width: "50%" }}>
                                            <Text style={{ textAlign: 'center' }}>Setuju dibayar:</Text>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Kepala Kampung</Text>
                                            <Text style={{ marginTop: 32, marginBottom: -13, marginLeft: 180 }}>Materai 10.000</Text>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline', marginTop: 40 }}>{e.nama_kepala}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', minHeight: 80, width: "40%" }}>
                                            <Text style={{ textAlign: 'center', color: 'white' }}>Setuju dibayar:</Text>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Bendahara Kampung</Text>
                                            <Text style={{ marginTop: 32, marginBottom: -13, color: 'white' }}>Materai 10.000</Text>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline', marginTop: 40 }}>{e.nama}</Text>
                                        </View>
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

export default SpmDoc;
