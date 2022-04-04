import { createSlice } from '@reduxjs/toolkit';


//createSlice func { inisial state, reducer, action creator, action tab secara otomatis  }

const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {
        nama: "",
        kd_lvl1: "",
        kd_lvl2: "",
        kd_kampung: "",
        kd_distrik: ""
    },
    reducers: {
        dataUser: (state, action) => {
            state.nama = action.payload.namauser;
            state.kd_lvl1 = action.payload.kd_lvl1;
            state.kd_lvl2 = action.payload.kd_lvl2;
            state.kd_kampung = action.payload.kd_kampung;
            state.kd_distrik = action.payload.kd_distrik;
        }
    }
});

export const { dataUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;