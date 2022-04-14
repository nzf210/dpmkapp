import React, { useEffect } from 'react';
import { Page, Text, Image, Document, StyleSheet, View } from '@react-pdf/renderer';
import Yhk from '../../../public/yhk.png';




const SpdDoc = ({ dataselectspd }) => {
    useEffect(() => {
        console.log('spd dok', dataselectspd)
    }, []);

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: '3px',
                marginTop: '5px',
                marginBottom: '5px'
            }}
        />
    );
    const style = StyleSheet.create({
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: 'center',
            color: 'grey',
        },
        head: {
            backgroundColor: 'blue',
        },
        image: {
            height: '50px',
            width: '50px',
            marginTop: '0px',
            marginLeft: '15px'
        },
        text: {
            textAlign: 'center',
            fontSize: '12px',
            marginTop: '-30px',
            marginLeft: '40px'
        },
        text2: {
            textAlign: 'center',
            fontSize: '8px',
            marginTop: '20px',
            marginLeft: '40px'
        },
        text3: {
            fontSize: '10px', textAlign: 'center',
        },
        text4: {
            fontSize: '10px',

        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
    }
    )

    return (

        <Document key='doc-spd'>
            {dataselectspd &&
                dataselectspd.map((e, i) =>
                    <Page size="A4" key={`doc-spd-${i}`} style={{
                        paddingTop: '15px',
                        paddingLeft: '50px', paddingBottom: '40px', paddingRight: '35px'
                    }}>
                        <Image style={style.image} src={Yhk} fixed />
                        <View fixed>
                            <View>
                                <Text style={style.text}>PEMERINTAH KABUPATEN YAHUKIMO</Text >
                                <Text style={style.text}>DINAS PEMBERDAYAAN MASYARAKAT KAMPUNG</Text >
                                <Text style={style.text2}>Jln. Kurima Komplex Gedung Serbaguna Dekai,Email:bpmkkabyahukimo@gmail.com</Text >
                            </View>
                            <ColoredLine color="black" />
                        </View>
                        <View>
                            <Text style={style.text3}>Nomor {e.no_spd} </Text>
                            <Text style={style.text3}>SURAT PENYEDIAAN DANA ANGGARAN ALOKASI DANA DESA TAHUN 2022 </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: '10px' }}>Menimbang : </Text>
                            <Text style={{ fontSize: '10px' }}>Mengingat  :
                                <Text>1.Peraturan ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Text>
                                <Text>1.Peraturan ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,</Text>
                            </Text>
                        </View>
                        <Text style={style.text3}>MEMUTUSKAN :</Text>
                        <View>
                            <Text style={style.text4}>1. Ditujukan Kepada Kampung    : {e.kampung}</Text>
                            <Text style={style.text4}>2. Nama Bendahara Pengeluaran  : {e.nama}</Text>
                            <Text style={style.text4}>3. Jumlah Penyediaan Dana      : Rp. {e.pagu}
                                <Text>(Terbilang .................................. )</Text>
                            </Text>
                            <Text style={style.text4}>4. Untuk Kebutuhan             : Bulan ...........</Text>
                            <Text style={style.text4}>5. Ikhtisar Penyediaan Dana
                                <Text>a. Jumlah Dana .......     : Rp {e.pagu}
                                    <Text>Terbilang ...........  </Text>
                                </Text>
                                <Text>b. Akumulasi SPD Sebelumnya : </Text>
                                <Text>c. Sisa Dana yang belum di-SPD-kan Saat ini : Rp {e.pagu}
                                    <Text>(Terbilang ...................)</Text>
                                </Text>
                                <Text>Sisa Jumlah Dana APBK KAMPUNG : Rp 0,00
                                    <Text>(Nol Rupiah)</Text>
                                </Text>
                            </Text>
                            <Text style={style.text4}>6.Ketentuan - ketentuan lain : {e.thp_advis}</Text>
                        </View>
                        <Text style={style.pageNumber}
                            render={({ pageNumber, totalPages }) => `Halaman ${pageNumber} dari ${totalPages}`}
                        ></Text>
                    </Page>
                )
            }
        </Document>
    )
}

export default SpdDoc;

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});