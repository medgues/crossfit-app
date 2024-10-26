import { createSlice, Dispatch } from "@reduxjs/toolkit";
// eslint-disable-next-line no-shadow

export type ChallengersType = {
  id: string;
  name: string;
  avatar: string;
  nationality: string;
  category: string;
  division: string;
  heatNo: string;
  E1: string;
  E2: string;
  E3: string;
  E4: string;
  E5: string;
  E6: string;
};
const challengers: ChallengersType[] = [];

const initialState = {
  challengers,
  total: 0,
  page: 1,
  offset: 5,
};

const ChallengersSlice = createSlice({
  name: "challengers",
  initialState,
  reducers: {
    SetChallengers: (state, action) => {
      state.challengers = action.payload.challengers;
      // state.page = action.payload.page;
      // state.total = action.payload.total;
      // state.offset = action.payload.offset;
    },
    AddChallenger: (state, action) => {
      state.challengers = [...state.challengers, action.payload.challenger];
      // state.page = action.payload.page;
      // state.total = action.payload.total;
      // state.offset = action.payload.offset;
    },
    ResetChallengers: () => initialState,
  },
});

export const { SetChallengers, ResetChallengers, AddChallenger } =
  ChallengersSlice.actions;
export const ReqAddChallenger =
  (challenger: ChallengersType) => async (dispatch: Dispatch) =>
    dispatch(AddChallenger({ challenger }));
// new Promise((resolve, reject) => {
//   axios
//     .get(API_FETCH_EVENTSLOG, {
//       params: {
//         page,
//         offset,
//       },
//     })
//     .then(({ data }) => {
//       dispatch(SetEvents(data));
//       resolve(data);
//     })
//     .catch((error) => {
//       console.log({
//         error,
//       });
//       reject();
//     });
// });
// export const ReqFetchEvents =
//   (page: number, offset: number) => async (dispatch: Dispatch) =>
//     new Promise((resolve, reject) => {
//       axios
//         .get(API_FETCH_EVENTSLOG, {
//           params: {
//             page,
//             offset,
//           },
//         })
//         .then(({ data }) => {
//           dispatch(SetEvents(data));
//           resolve(data);
//         })
//         .catch((error) => {
//           console.log({
//             error,
//           });
//           reject();
//         });
//     });

// export const ReqFetchSearchAccountResults =
//   (searchTerm: string) => async (dispatch: Dispatch) =>
//     new Promise((resolve, reject) => {
//       axios
//         .get(API_FETCH_EVENTSLOG, {
//           params: {
//             filters: JSON.stringify({
//               archived: false,
//               deleted: false,
//               fullName: searchTerm,
//             }),
//           },
//         })
//         .then(({ data }) => {
//           dispatch(SetEvents(data));
//           resolve(data);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });

export default ChallengersSlice.reducer;
