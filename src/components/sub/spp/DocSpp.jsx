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

const SppDoc = ({ dataselectspp }) => {
    useEffect(() => {
        console.log("spd dok", dataselectspp);
    }, []);

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
            fontSize: 12,
            marginBottom: 20,
            textAlign: "center",
            color: "grey"
        },
        head: {
            backgroundColor: "blue"
        },
        image: {
            height: "50px",
            width: "50px",
            marginTop: "0px",
            marginLeft: "15px"
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
            textAlign: "center"
        },
        text4: {
            fontSize: "10px"
        },
        pageNumber: { position: "absolute", fontSize: 12, bottom: 30, left: 0, right: 0, textAlign: "center", color: "grey" },
        HMmenimbang: { display: 'flex', position: 'relative' },
        HMmenimbang2: { display: 'flex', position: 'relative' },
        menimbang: { fontSize: 12, paddingTop: 10, maxWidth: 160, minWidth: 160, },
        menimbang2: { fontSize: 12, paddingTop: 60, maxWidth: 160, minWidth: 160, },
        titik2: { fontSize: 12, paddingTop: 10, maxWidth: 2, minWidth: 2, position: 'absolute', paddingLeft: 155 },
        titik22: { fontSize: 12, paddingTop: 60, maxWidth: 2, minWidth: 2, position: 'absolute', paddingLeft: 155 },
        isiMenimbang: { fontSize: 12, paddingTop: 10, position: 'absolute', paddingLeft: 165 },
        isiMenimbang2: { fontSize: 12, paddingTop: 60, position: 'absolute', paddingLeft: 165 },
        isiMenimbang22: { fontSize: 12, paddingTop: 90, position: 'absolute', paddingLeft: 165 },
        text5: { fontSize: "12px", textAlign: "center", marginTop: 50, fontWeight: 'ultrabold' }
    });

    return (
        <Document key="doc-spd">
            {dataselectspp &&
                dataselectspp.map((e, i) => (
                    <Page
                        size="A4"
                        key={`doc-spd-${i}`}
                        style={{
                            paddingTop: "15px",
                            paddingLeft: "50px",
                            paddingBottom: "40px",
                            paddingRight: "35px"
                        }}
                    >
                        <Image style={style.image} src={Yhk} fixed />
                        <View fixed>
                            <View>
                                <Text
                                    style={{
                                        marginTop: -45,
                                        textAlign: "center",
                                        paddingLeft: 10
                                    }}
                                >
                                    PEMERINTAH KABUPATEN YAHUKIMO
                                </Text>
                                <Text
                                    style={{
                                        paddingTop: 0,
                                        textAlign: "center",
                                        paddingLeft: 10,
                                        fontSize: 12
                                    }}
                                >
                                    DISTRIK {dataselectspp.distrik}
                                </Text>
                                <Text
                                    style={{
                                        paddingTop: 0,
                                        textAlign: "center",
                                        paddingLeft: 10,
                                        fontSize: 12
                                    }}
                                >
                                    KAMPUNG {dataselectspp.kampung}
                                </Text>
                            </View>
                            <ColoredLine color="black" />
                        </View>
                        <View>
                            <Text style={style.text3}>NOMOR ......./SP2SPD/ADD1/IBIROMA/2022</Text>
                            <Text style={{ paddingTop: 10, fontSize: 12, textAlign: 'center' }}>SURAT PERMOHONAN PENERBITAN SURAT PENCAIRAN DANA</Text>
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
                        <Text style={{ backgroundColor: 'red', paddingLeft: 50, width: 260, fontSize: 12 }} >1. Nama Kampung</Text><Text>:</Text><Text>{e.nama}</Text>
                        <Text style={{ backgroundColor: 'red', paddingLeft: 50, width: 260, fontSize: 12 }}>2. Nama Distrik</Text>
                        <Text>3. Nama Kepala Kampung</Text>
                        <Text>4. Nama Bendahara Kampung</Text>
                        <Text>5. Jumlah Permohonan Dana Rp.</Text>
                        <Text>6. Untuk Kebutuhan</Text>
                        <Text>7. Ikhtisar Permohonan Dana</Text>
                        <Text>a. Jumlah Pagu ADD</Text>
                        <Text>b. Akumulasi Sebelumnya</Text>
                        <Text>c. Sisa Dana yang belum dicairkan</Text>
                        <Text>d. Jumlah dana yang diminta saat ini</Text>
                        <Text>e. Sisa Jumlah Dana ADD yang belum di Cairkan </Text>
                        <Text>8. Ketentuan - Ketentuan Lainnya</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                marginTop: 3,
                                marginLeft: 45
                            }}
                        >
                            <Text style={{ paddingRight: 120 }}>Nama</Text>
                            <Text style={{ paddingRight: 0 }}>:</Text>
                            <Text>Nama Bendahara</Text>
                        </Text>
                        <Text Style={{ fontSize: 12 }}>Jabatan</Text>
                        <Text Style={{ fontSize: 12 }}>:</Text>
                        <Text Style={{ fontSize: 12 }}>Bendahara</Text>
                        <Text Style={{ fontSize: 12 }}>Nama</Text>
                        <Text Style={{ fontSize: 12 }}>:</Text>
                        <Text Style={{ fontSize: 12 }}>Nama Kepala</Text>
                        <Text Style={{ fontSize: 12 }}>Jabatan</Text>
                        <Text Style={{ fontSize: 12 }}>:</Text>
                        <Text Style={{ fontSize: 12 }}>Kepala Kampung</Text>

                        <View>
                            <Text style={{ fontSize: "10px" }}>Menimbang : </Text>
                            <Text style={{ fontSize: "10px" }}>
                                Mengingat :
                                <Text>
                                    1.Peraturan
                                    ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                </Text>
                                <Text>
                                    1.Peraturan
                                    ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                </Text>
                            </Text>
                        </View>
                        <Text style={style.text3}>MEMUTUSKAN :</Text>
                        <View>
                            <Text style={style.text4}>
                                1. Ditujukan Kepada Kampung : {e.kampung}
                            </Text>
                            <Text style={style.text4}>
                                2. Nama Bendahara Pengeluaran : {e.nama}
                            </Text>
                            <Text style={style.text4}>
                                3. Jumlah Penyediaan Dana : Rp. {e.pagu}
                                <Text>(Terbilang .................................. )</Text>
                            </Text>
                            <Text style={style.text4}>
                                4. Untuk Kebutuhan : Bulan ...........
                            </Text>
                            <Text style={style.text4}>
                                5. Ikhtisar Penyediaan Dana
                                <Text>
                                    a. Jumlah Dana ....... : Rp {e.pagu}
                                    <Text>Terbilang ........... </Text>
                                </Text>
                                <Text>b. Akumulasi SPD Sebelumnya : </Text>
                                <Text>
                                    c. Sisa Dana yang belum di-SPD-kan Saat ini : Rp {e.pagu}
                                    <Text>(Terbilang ...................)</Text>
                                    <Spp />
                                </Text>
                                <Text>
                                    Sisa Jumlah Dana APBK KAMPUNG : Rp 0,00
                                    <Text>(Nol Rupiah)</Text>
                                </Text>
                            </Text>
                            <Text style={style.text4}>
                                6.Ketentuan - ketentuan lain : {e.thp_advis}
                            </Text>
                        </View>
                        <Text
                            style={style.pageNumber}
                            render={({ pageNumber, totalPages }) =>
                                `Halaman ${pageNumber} dari ${totalPages}`
                            }
                        ></Text>
                    </Page>
                ))}
        </Document>
    );
};

export default SppDoc;

const Spp = () => {
    return (
        <div className="bg-blue-700">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam error aliquam recusandae, beatae eum sequi nulla officia ad quia impedit.</p>
        </div>
    )
}