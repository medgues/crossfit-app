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

export type Member = {
  id: string;
  value: string;
  label: string;
};
type TeamMembers = Member[];
export type TeamType = {
  id?: string;
  name: string;
  members: TeamMembers;
  createdAt?: any;
  updatedAt?: any;
  E1?: string;
  E2?: string;
};

export type TeamsState = {
  teamsList: TeamType[];
  total: number;
  page: number;
  offset: number;
  nextPageCursor: any;
  lastPageCursor: any;
};

const teamsList: TeamType[] = [];

const initialState: TeamsState = {
  teamsList,
  total: 0,
  page: 1,
  offset: 5,
  nextPageCursor: null,
  lastPageCursor: null,
};

const TeamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    SetTeams: (state, action) => {
      state.teamsList = action.payload.teams;
      state.page = action.payload.page || state.page;
      state.total = action.payload.total || state.total;
      state.offset = action.payload.offset || state.offset;
      state.nextPageCursor =
        action.payload.nextPageCursor || state.nextPageCursor;
      state.lastPageCursor =
        action.payload.lastPageCursor || state.lastPageCursor;
    },
    AddTeam: (state, action) => {
      state.teamsList = [
        action.payload.newTeam,
        ...(state.teamsList.length === 10
          ? state.teamsList.slice(0, state.teamsList.length - 1)
          : state.teamsList),
      ];
      state.total = action.payload.total;
    },
    ResetTeams: () => initialState,
  },
});

export const { SetTeams, ResetTeams, AddTeam } = TeamsSlice.actions;

export const ReqFetchTeamFirstPatch =
  (offset: number) => async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      let fetchedTotal: number;
      const collectionRef = collection(db, "teams");
      const teamNumberRef = doc(db, "teamsNumber", "NqyF3womle7Vhwd5EsKX");

      getDoc(teamNumberRef).then((snap) => (fetchedTotal = snap.data()?.total));

      const paginatedQuery = query(
        collectionRef,
        orderBy("createdAt", "desc"),
        limit(offset)
      );

      getDocs(paginatedQuery)
        .then((snapshot) => {
          const teamsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TeamType[];

          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          const firstDoc = snapshot.docs[0];
          const nextPageCursor = lastDoc ? lastDoc.data().createdAt : null;
          const lastPageCursor = firstDoc ? firstDoc.data().createdAt : null;

          dispatch(
            SetTeams({
              teams: teamsData,
              nextPageCursor,
              lastPageCursor,
              total: fetchedTotal,
            })
          );
          resolve(teamsData);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export const ReqTeamsNextPatch =
  (cursor: QueryDocumentSnapshot<DocumentData>, offset: number, page: number) =>
  async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      const paginatedQuery = query(
        collection(db, "teams"),
        orderBy("createdAt", "desc"),
        startAfter(cursor),
        limit(offset)
      );

      getDocs(paginatedQuery)
        .then((snapshot) => {
          const teamsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TeamType[];

          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          const firstDoc = snapshot.docs[0];
          const nextPageCursor = lastDoc ? lastDoc.data().createdAt : null;
          const lastPageCursor = firstDoc ? firstDoc.data().createdAt : null;

          dispatch(
            SetTeams({
              teams: teamsData,
              page,
              nextPageCursor,
              lastPageCursor,
            })
          );
          resolve(teamsData);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export const ReqTeamsLastPatch =
  (cursor: QueryDocumentSnapshot<DocumentData>, offset: number, page: number) =>
  async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      const paginatedQuery = query(
        collection(db, "teams"),
        orderBy("createdAt", "desc"),
        endBefore(cursor),
        limitToLast(offset)
      );

      getDocs(paginatedQuery)
        .then((snapshot) => {
          const teamsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TeamType[];

          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          const firstDoc = snapshot.docs[0];
          const nextPageCursor = lastDoc ? lastDoc.data().createdAt : null;
          const lastPageCursor = firstDoc ? firstDoc.data().createdAt : null;

          dispatch(
            SetTeams({
              teams: teamsData,
              page,
              nextPageCursor,
              lastPageCursor,
            })
          );
          resolve(teamsData);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export const ReqAddTeam =
  (team: TeamType) => async (dispatch: Dispatch, getState: any) =>
    new Promise((resolve, reject) => {
      const teamNumberRef = doc(db, "teamsNumber", "NqyF3womle7Vhwd5EsKX");
      const total = getState().teams.total;

      addDoc(collection(db, "teams"), {
        createdAt: serverTimestamp(),
        ...team,
      })
        .then((docRef) => {
          updateDoc(teamNumberRef, { total: total + 1 });
          const newTeam = {
            id: docRef.id,
            ...team,
          };
          dispatch(AddTeam({ newTeam, total: total + 1 }));
          resolve(newTeam);
        })
        .catch((error) => {
          reject(error);
        });
    });

export const ReqDeleteTeam =
  (teamId: string) => async (dispatch: Dispatch, getState: any) =>
    new Promise((resolve, reject) => {
      const teamRef = doc(db, "teams", teamId);
      const { page, offset } = getState().teams;

      deleteDoc(teamRef)
        .then(() => {
          const teamsRef = collection(db, "teams");
          const teamNumberRef = doc(db, "teamsNumber", "teams_counter");
          const { total, lastPageCursor } = getState().teams;

          updateDoc(teamNumberRef, { total: total - 1 });

          getDocs(
            query(
              teamsRef,
              orderBy("createdAt", "desc"),
              limit(offset),
              startAt(lastPageCursor)
            )
          )
            .then((querySnapshot) => {
              const teamsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as TeamType[];

              dispatch(
                SetTeams({
                  teams: teamsData,
                  total: total - 1,
                  page,
                  offset,
                })
              );
              resolve({
                teams: teamsData,
                total: total - 1,
                page,
                offset,
              });
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

export const ReqUpdateTeam =
  (teamId: string, updatedData: Partial<TeamType>) =>
  async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      const teamRef = doc(db, "teams", teamId);

      updateDoc(teamRef, { updatedAt: serverTimestamp(), ...updatedData })
        .then(() => {
          getDocs(collection(db, "teams"))
            .then((querySnapshot) => {
              const teamsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as TeamType[];
              dispatch(SetTeams({ teams: teamsData }));
              resolve(teamsData);
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

export const ReqFetchSearchTeams =
  (searchTerm: string) => async (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      const teamsRef = collection(db, "teams");
      const q = query(
        teamsRef,
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff")
      );

      getDocs(q)
        .then((querySnapshot) => {
          const teams = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          dispatch(SetTeams({ teams }));
          resolve(teams);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export const ReqFetchSearchChallengersForTeams =
  (searchTerm: string) => async () =>
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

          resolve(challengers);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });

export default TeamsSlice.reducer;
