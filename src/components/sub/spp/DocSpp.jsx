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
        pageNumber: {
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "grey"
        }
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
                            <Text style={style.text3}>SURAT PENYATAAN</Text>
                            <Text style={{ fontSize: 12, paddingTop: 3 }}>
                                Yang Bertandatangan di Bawah ini:
                            </Text>
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
                        </View>
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
