import { createSlice } from '@reduxjs/toolkit';


//createSlice func { inisial state, reducer, action creator, action tab secara otomatis  }

const penggunaSlice = createSlice({
    name: "pengguna",
    initialState: {
        nama: "xxxx",
        username: "xxxx",
        password: "xxx",
        nohp: "xxx",
        email: "xxx",
        kd_lvl1: "xxx",
        kd_lvl2: "xx",
        kd_kampung: "xxx",
        kd_distrik: "xxxx"
    },
    reducers: {
        tambahPengguna: (state, action) => {
            state.nama = action.payload.nama;
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.nohp = action.payload.nohp;
            state.email = action.payload.email;
            state.kd_lvl1 = action.payload.kd_lvl1;
            state.kd_lvl2 = action.payload.kd_lvl2;
            state.kd_kampung = action.payload.kd_kampung;
            state.kd_distrik = action.payload.kd_distrik;
        }
    }
});

export const { tambahPengguna } = penggunaSlice.actions;
export default penggunaSlice.reducer;