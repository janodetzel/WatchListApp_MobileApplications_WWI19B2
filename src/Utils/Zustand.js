import "react-native-get-random-values";

import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";
export const useStore = create(
  persist(
    (set, get) => ({
      loggedIn: null,
      users: {},

      deleteEverything: () => set({}, true), // clears the entire store, actions included

      addUser: (userName) =>
        set((state) =>
          produce(state, (draft) => {
            const userUUID = uuidv4();
            draft.users[userUUID] = {
              name: userName,
              cardLists: {},
            };
            draft.loggedIn = userUUID;
          })
        ),
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
