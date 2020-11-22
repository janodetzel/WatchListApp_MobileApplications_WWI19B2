import "react-native-get-random-values";

import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";
export const useStore = create(
  persist(
    (set, get) => ({
      currUser: [],
      users: new Map(),

      getUserByName: (userName) =>
        [...get().users].find(([key, value]) => value.name == userName),

      getUserByKey: (key) => get().users.get(key),



      addUser: (userName) => {
        set((state) =>
          produce(state, (draft) => {
            const userExists = get().getUserByName(userName);
            console.log("USER EXISTS?", userExists)
            if (!userExists) {
              console.log("CREATE NEW USER")
              draft.users.set(uuidv4(), {
                name: userName,
                cardLists: new Map(),
              });
            }
          })
        );
      },


      // logIn: userName => set(state => (state.currUser = get().getUserByName(userName))),

      logIn: userName => set(state => produce(state, draft => {
        draft.currUser = get().getUserByName(userName)
      })),
      logOut: () => set(state => state.currUser = []),

      clean: () =>
        set((state) => {
          state.currUser = [];
          state.users = new Map();
          AsyncStorage.clear();
        }),
    }),
    {
      name: "MovieStorage", // unique name
      storage: AsyncStorage,
    }
  )
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
