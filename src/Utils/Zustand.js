import "react-native-get-random-values";

import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";
export const useStore = create(
  persist(
    (set, get) => ({
      currUser: { key: null, name: "" },
      users: new Map(),

      getUserByName: (userName) => ([...get().users].find(([key, value]) => value.name == userName)),
      getUserByKey: (key) => (get().users[key]),
      logIn: (userName) =>
        set((state) => produce(state, (draft) => {
          const userUUID = uuidv4();
          const userExists = draft.getUserByName(userName);
          if (!userExists) {
            draft.users.set(userUUID, { name: userName, cardLists: new Map() });
          } else {
            console.log("USER EXISTS", userExists);
            console.log("USER KEY", state.getUserByName(userName)[0]);
          }
        })
        ),
      logOut: () => set(state => state.curruser = { key: null, name: "" }),



      clean: () => set(state => {
        state.currUser = { key: null, name: "" }
        state.users = new Map()
        AsyncStorage.clear()
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
