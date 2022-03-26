import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getKamdis = createAsyncThunk("getkamdis/getKamdis", async () => {
    const response = await axios.get('/mkamdis');
    return response.data;
});

const mkamdisEntity = createEntityAdapter({
    selectId: (kamdis) => kamdis.id
})

const filterSlice = createSlice({
    name: "filter",
    initialState: mkamdisEntity.getInitialState(),
    extraReducers: {
        [getKamdis.fulfilled]: (state, action) => {
            mkamdisEntity.setAll(state, action.payload);
        }
    }

});

export const mkamdisSelector = mkamdisEntity.getSelectors(state => state.filter);
export default filterSlice.reducer;