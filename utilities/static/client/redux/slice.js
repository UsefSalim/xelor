import { createSlice } from '@reduxjs/toolkit';

const ModelNamesSlice = createSlice({
  name: 'ModelName',
  initialState: {},
  reducers: {
    getModelName: (state = this.initialState, action) => {
      const ModelName = action.payload;
      return {
        ...state,
        ModelName,
      };
    },
    allModelNames: () => {},
    addModelName: () => {},
    deleteModelName: () => {},
    updateModelName: () => {},
  },
});
export const {
  getModelName,
  addModelName,
  allModelNames,
  deleteModelName,
  updateModelName,
} = ModelNamesSlice.actions;

export default ModelNamesSlice.reducer;
