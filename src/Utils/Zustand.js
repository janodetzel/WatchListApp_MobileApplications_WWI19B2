import "react-native-get-random-values";

import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create((set, get) => ({
  currUserKey: null,
  users: {
    "656e4534-3231-4f55-b483-558eb5999bf2": {
      "name": "Preview",
      "cardLists": {
        "462e4fb7-5e72-45fa-8c69-7c3a75e56196": {
          "title": "Action",
          "cards": {
            "1372d318-7d8b-497d-9c0d-09dff82df879": {
              "details": {
                "id": 550
              }
            },
            "1372d318-7d8b-497d-9c0d-09dff82df878": {
              "details": {
                "id": 40807
              }
            },
            "1372d318-7d8b-497d-9c0d-09dff82df867": {
              "details": {
                "id": 740985
              }
            },
            "1372d318-7d8b-497d-9c0d-09dff82df667": {
              "details": {
                "id": 332340
              }
            },
            "1372d318-7d8b-497d-9c0d-09dff82df447": {
              "details": {
                "id": 207
              }
            },
          }
        },
        "462e4fb7-5e72-45fa-8c69-7c3a75e56198": {
          "title": "Drama",
          "cards": {
            "1372d318-7d8b-497d-9c0d-093ff82df447": {
              "details": {
                "id": 105
              }
            },
            "1372d318-7d8b-497d-9c0d-092ff82df447": {
              "details": {
                "id": 27205
              }
            },
            "1372d318-7d8b-497d-9c0d-091ff82df447": {
              "details": {
                "id": 87516
              }
            },
            "1372d318-7d8b-497d-9c0d-095ff82df447": {
              "details": {
                "id": 59440
              }
            },
            "1372d318-7d8b-497d-9c0d-096ff82df447": {
              "details": {
                "id": 155
              }
            },
          }
        }
      }
    }
  },

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
  })
  ),
  logOut: () => set((state) => (state.currUserKey = null)),

}));

export const usePersistedStore = create(
  persist(
    (set, get) => ({}),
    {
      name: "MovieStorage", // unique name
      storage: AsyncStorage,
    }
  )
);