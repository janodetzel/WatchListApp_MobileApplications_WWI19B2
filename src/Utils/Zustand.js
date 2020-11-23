import "react-native-get-random-values";

import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";
export const useStore = create((set, get) => ({
  currUserKey: null,
  users: new Map(),

  getUserByName: (userName) =>
    [...get().users].find(([key, value]) => value.name == userName),


  addUser: (userName) => {
    set((state) =>
      produce(state, (draft) => {
        const userExists = draft.getUserByName(userName);
        if (!userExists) {
          draft.users.set(uuidv4(), {
            timestamp: new Date(),
            name: userName,
            cardLists: new Map(),
          });
        }
      })
    );
  },


  addCardList: cardListTitle => set(state => produce(state, (draft) => {
    draft.users.get(draft.currUserKey).cardLists.set(uuidv4(), {
      title: cardListTitle,
      cards: []
    })
  })),

  deleteCardList: cardListKey => set(state => produce(state, (draft) => {
    draft.users.get(draft.currUserKey).cardLists.delete(cardListKey)
  })),



  addCard: (movieId, cardListKey) => set(state => produce(state, (draft) => {
    console.log("ADDCARD", draft.users.get(draft.currUserKey).cardLists.get(cardListKey))
    draft.users.get(draft.currUserKey).cardLists.get(cardListKey).cards.push(movieId)
  })),

  deleteCard: (movieId, cardListKey) => set(state => produce(state, (draft) => {
    console.log("DELETECARD", draft.users.get(draft.currUserKey).cardLists.get(cardListKey))
    const index = draft.users.get(draft.currUserKey).cardLists.get(cardListKey).cards.findIndex(movie => movie === movieId)
    if (index !== -1) draft.users.get(draft.currUserKey).cardLists.get(cardListKey).cards.splice(index, 1)
  })),

  logIn: (userName) =>
    set((state) =>
      produce(state, (draft) => {
        draft.currUserKey = get().getUserByName(userName)[0];
        // Update timestamp on log in
        draft.users.get(draft.currUserKey).timestamp = new Date();
      })
    ),
  logOut: () => set((state) => (state.currUserKey = null)),
  clean: () =>
    set((state) => {
      (state.currUserKey = null), (state.users = new Map());
    }),
}));

export const usePersistedStore = create(
  persist((set, get) => ({}), {
    name: "MovieStorage", // unique name
    storage: AsyncStorage,
  })
);

// const usersPreview = [
//     {
//       name: "Preview",
//       cardLists: [
//         {
//           title: "Action",
//           cards: [27205, 155, 670, 64688, 339403, 59440],
//         },
//         {
//           title: "Drama",
//           cards: [550, 1422, 157336, 13, 641],
//         },
//         {
//           title: "Comedy",
//           cards: [207, 105, 546554, 14160, 40807, 740985],
//         },
//       ],
//     },
//   ],
