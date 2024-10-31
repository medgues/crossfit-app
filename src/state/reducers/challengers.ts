/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import {
  where,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  limit,
  orderBy,
  updateDoc,
  startAt,
  serverTimestamp,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  getDoc,
  endBefore,
  limitToLast,
} from "firebase/firestore/lite";
// eslint-disable-next-line no-shadow

export type ChallengersType = {
  id?: string;
  name: string;
  avatar: string;
  nationality: string;
  category: string;
  division: string;
  heatNo: string;
  E1?: string;
  E2?: string;
  E3?: string;
  E4?: string;
  E5?: string;
  E6?: string;
};

export type ChallengersState = {
  challengersList: ChallengersType[];
  total: number;
  page: number;
  offset: number;
  nextPageCursor: any;
  lastPageCursor: any;
};
const challengersList: ChallengersType[] = [];

const initialState: ChallengersState = {
  challengersList,
  total: 0,
  page: 1,
  offset: 5,
  nextPageCursor: null,
  lastPageCursor: null,
};

const ChallengersSlice = createSlice({
  name: "challengers",
  initialState,
  reducers: {
    SetChallengers: (state, action) => {
      console.log("action.payload", action.payload);
      state.challengersList = action.payload.challengers;
      state.page = action.payload.page || state.page;
      state.total = action.payload.total || state.total;
      state.offset = action.payload.offset || state.offset;
      state.nextPageCursor =
        action.payload.nextPageCursor || state.nextPageCursor;
      state.lastPageCursor =
        action.payload.lastPageCursor || state.lastPageCursor;
    },
    AddChallenger: (state, action) => {
      state.challengersList = [
        action.payload.newChallenger,
        ...(state.challengersList.length === 5
          ? state.challengersList.slice(0, state.challengersList.length - 1)
          : state.challengersList),
      ];
      state.total = action.payload.total;
    },
    setTotal: (state, action) => {
      console.log("payloyad", action.payload.total);
      state.total = action.payload.total;
    },

    ResetChallengers: () => initialState,
  },
});

export const { SetChallengers, ResetChallengers, AddChallenger, setTotal } =
  ChallengersSlice.actions;

export const ReqFetchChallengerFirstPatch =
  (offset: number) => async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      let fetchedTotal: number;
      const collectionRef = collection(db, "challengers");
      const challengerNumberRef = doc(
        db,
        "challengersNumber",
        "rGU4ZCnESWqcZxQSdXtT"
      );
      getDoc(challengerNumberRef).then(
        (snap) => (fetchedTotal = snap.data()?.total)
      );
      const paginatedQuery = query(
        collectionRef,
        orderBy("createdAt", "desc"),
        limit(offset)
      );

      getDocs(paginatedQuery)
        .then((snapshot) => {
          const challengersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as ChallengersType[];
          console.log("total", fetchedTotal);

          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          const firtDoc = snapshot.docs[0];
          const nextPageCursor = lastDoc ? lastDoc.data().createdAt : null;
          const lastPageCursor = firtDoc ? firtDoc.data().createdAt : null;
          console.log("challengersData", challengersData);
          dispatch(
            SetChallengers({
              challengers: challengersData,
              nextPageCursor,
              lastPageCursor,
              total: fetchedTotal,
            })
          );
          resolve(challengersData);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export const ReqChallengersNextPatch =
  (cursor: QueryDocumentSnapshot<DocumentData>, offset: number, page: number) =>
  async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      const paginatedQuery = query(
        collection(db, "challengers"),
        orderBy("createdAt", "desc"),
        startAfter(cursor),
        limit(offset)
      );
      console.log("nextpage", paginatedQuery);
      getDocs(paginatedQuery)
        .then((snapshot) => {
          const challengersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as ChallengersType[];
          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          const firtDoc = snapshot.docs[0];
          const nextPageCursor = lastDoc ? lastDoc.data().createdAt : null;
          const lastPageCursor = firtDoc ? firtDoc.data().createdAt : null;
          dispatch(
            SetChallengers({
              challengers: challengersData,
              page,
              nextPageCursor,
              lastPageCursor,
            })
          );

          resolve(challengersData);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export const ReqChallengerLastPatch =
  (cursor: QueryDocumentSnapshot<DocumentData>, offset: number, page: number) =>
  async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      const paginatedQuery = query(
        collection(db, "challengers"),
        orderBy("createdAt", "desc"),
        endBefore(cursor),
        limitToLast(offset)
      );

      getDocs(paginatedQuery)
        .then((snapshot) => {
          const challengersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as ChallengersType[];
          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          const firtDoc = snapshot.docs[0];
          const nextPageCursor = lastDoc ? lastDoc.data().createdAt : null;
          const lastPageCursor = firtDoc ? firtDoc.data().createdAt : null;
          dispatch(
            SetChallengers({
              challengers: challengersData,
              page,
              nextPageCursor,
              lastPageCursor,
            })
          );
          resolve(challengersData);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export const ReqAddChallenger =
  (challenger: ChallengersType) => async (dispatch: Dispatch, getState: any) =>
    new Promise((resolve, reject) => {
      const challengerNumberRef = doc(
        db,
        "challengersNumber",
        "rGU4ZCnESWqcZxQSdXtT"
      );
      const total = getState().challengers.total;
      addDoc(collection(db, "challengers"), {
        createdAt: serverTimestamp(),
        ...challenger,
      })
        .then((docRef) => {
          updateDoc(challengerNumberRef, { total: total + 1 });
          console.log("Document written with ID: ", docRef.id);
          const newChallenger = {
            id: docRef.id,
            ...challenger,
          };
          dispatch(AddChallenger({ newChallenger, total: total + 1 }));
          resolve(newChallenger);
        })
        .catch((error) => {
          reject(error);
        });
    });

export const ReqDeleteChallenger =
  (challengerId: string) => async (dispatch: Dispatch, getState: any) =>
    new Promise((reject) => {
      console.log("reducer delete challengerId", challengerId);

      const challengerRef = doc(db, "challengers", challengerId);
      const { page, offset } = getState().challengers;
      deleteDoc(challengerRef)
        .then(() => {
          new Promise((resolve, reject) => {
            const challengersRef = collection(db, "challengers");
            const challengerNumberRef = doc(
              db,
              "challengersNumber",
              "rGU4ZCnESWqcZxQSdXtT"
            );
            const { total, lastPageCursor } = getState().challengers;

            updateDoc(challengerNumberRef, { total: total - 1 });

            getDocs(
              query(
                challengersRef,
                orderBy("createdAt", "desc"),
                limit(offset),
                startAt(lastPageCursor)
              )
            )
              .then((querySnapshot) => {
                const ChallengersData = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                })) as ChallengersType[];
                console.log("ChallengersData", ChallengersData);
                // Dispatch with pagination info
                dispatch(
                  SetChallengers({
                    challengers: ChallengersData,
                    total: total - 1,
                    page,
                    offset,
                  })
                );

                resolve({
                  challengers: ChallengersData,
                  total,
                  page,
                  offset,
                });
              })
              .catch((error) => {
                console.log({ error });
                reject(error);
              });
          }).catch((error) => {
            console.log({ error });
            reject(error);
          });
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export const ReqUpdateChallenger =
  (challengerId: string, updatedData: Partial<ChallengersType>) =>
  async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      const challengerRef = doc(db, "challengers", challengerId);

      updateDoc(challengerRef, { updatedAt: serverTimestamp(), ...updatedData })
        .then(() => {
          // After successful update, fetch the updated data
          getDocs(collection(db, "challengers"))
            .then((querySnapshot) => {
              const ChallengersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as ChallengersType[];
              dispatch(SetChallengers(ChallengersData));
              resolve(ChallengersData);
            })
            .catch((error) => {
              console.log({ error });
              reject(error);
            });
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export const ReqFetchSearchChallengers =
  (searchTerm: string) => async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      const challengersRef = collection(db, "challengers");
      const q = query(
        challengersRef,
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff")
      );

      getDocs(q)
        .then((querySnapshot) => {
          const challengers = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          dispatch(SetChallengers({ challengers }));
          resolve(challengers);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export default ChallengersSlice.reducer;
