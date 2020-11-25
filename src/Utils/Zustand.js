import "react-native-get-random-values";

import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";

import previewUser from './previewUser.json'

export const usenotStore = create((set, get) => ({
}));

export const useStore = create(
  persist(
    (set, get) => ({

      currUserKey: null,
      users: { previewUser },

      getUserByName: userName => Object.keys(get().users).find(key => get().users[key].name.toUpperCase() === userName.toUpperCase()),

      addUser: userName => set(state => produce(state, draft => {
        const userExists = draft.getUserByName(userName);
        if (!userExists) {
          draft.users[uuidv4()] = {
            timestamp: new Date(),
            name: userName,
            cardLists: {},
          }
        }
      })),

      deleteUser: userName => set(state => produce(state, draft => {
        const userKey = draft.getUserByName(userName);
        delete draft.users[userKey]
      })),


      addCardList: cardListTitle => set(state => produce(state, draft => {
        draft.users[draft.currUserKey].cardLists[uuidv4()] = {
          title: cardListTitle,
          cards: {},
        }
      })),

      deleteCardList: cardListKey => set(state => produce(state, draft => {
        delete draft.users[draft.currUserKey].cardLists[cardListKey];
      })),

      addCard: (cardDetails, cardListKey) => set(state => produce(state, draft => {
        draft.users[draft.currUserKey].cardLists[cardListKey].cards[uuidv4()] = { details: cardDetails }
      })),

      deleteCard: (cardKey, cardListKey) => set(state => produce(state, draft => {
        delete draft.users[draft.currUserKey].cardLists[cardListKey].cards[cardKey]
      })),

      logIn: userName => set((state) => produce(state, draft => {
        draft.currUserKey = draft.getUserByName(userName);
        // Update timestamp on log in
        draft.users[draft.currUserKey].timestamp = new Date();
      })),

      logOut: () => set((state) => (state.currUserKey = null)),

    }),
    {
      name: "WatchListStorage", // unique name
      storage: AsyncStorage,
    }
  )
);