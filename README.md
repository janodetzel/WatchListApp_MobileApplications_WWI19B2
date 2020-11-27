# README.md

# WatchList App by Jano Detzel

With WatchList-App you can manage films and tv shows in your personal library.

This App was developed and tested using expo for iOS and iPadOS.
Android should work too but cannot verify.

## The what

With WatchList-App you can manage films and tv shows in your personal library.

You can create different WatchLists and check the films and tv shows you have already seen.

The added films or tv shows are clearly displayed next to each other in the form of cards.

On the cards you will find information about the film or tv show such as title, tagline, year of release, a short description and genres. 

You can also see the date on which the card was created.

## The why

Never lose track of your films and tv shows again. 

Organize your watch lists in categories according to your preferences and you will never forget which series you have already watched and which you still want to watch.

## The how

1. Create a new user account

    Open the watchlist app and enter your name to create a new user account. 

2. Create a new WatchList

    You can then create your first WatchList by tapping the pink icon. Now enter the name for the WatchList. 

3. Search for a movie or tv show

    You can now open the search with a tap on the map icon. Search for films or tv shows that you have already watched or still want to watch. Choose the correct result and the film will be added to the watch list in the form of a card.

4. Check the movie or tv show you already watched

    Mark the film or series as read with a tap on the card. The lower edge of the map appears green.

5. Switch users

    You can switch users by pressing on Log out. On the login screen you can see all the existing user accounts. Choose one or simply create a new user. 

    **PS**: The most recent user is displayed first in the list of existing user.

6. Delete a user

    If you want to delete an user simply log out and tap and hold on the username. 
    Now tap on the pink text to delete a user and all WatchLists and cards permanently

## The user wants to...

- [x]  create user account.
- [x]  see all existing user accounts and log in an existing user account.
- [x]  create multiple new WatchLists.
- [x]  delete WatchLists.
- [x]  add multiple movies or tv shows to a WatchList.
- [x]  get data in local languange (language by locale, i18n)
- [x]  check already watched movies or tv shows.
- [x]  delete movies or tv shows from a Watchlist.
- [x]  switch between user accounts.
- [x]  delete user accounts.
- [x]  persist user accounts, WatchLists and cards.

## Project structure

- App.js
    - Login.js

        Create a new user account or log in to an existing one

        - Module *githubUsernameRegex* is used to verify the username input before creating a new user account.
        - List of the 9 most recent users are sorted by last login timestamp. The most recent logged in user appears on the first position.
        - Tap and hold on an existing user reveals the delete button to erase a user from
    - Home.js

        Add and delete WatchLists.

        - If user "Preview" is logged in the greeting text changes.
        - AddCardListInput toggles on buttonpress.
        - Module *KeyboardAwareScrollView* is used to move the scroll view up when the keyboard toggles on AddCardListInput.
        - Log out
        - AddCardListInput.js

            Type the name of the WatchList

        - CardList.js

            Add and delete movies or tv show cards

            - FindMovieOverlay.js

                Find movies or tv shows in database from 
                [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)

                - React Native ActivityIndicator when fetching
                - Resullts rendered in FlatList component.
            - Card.js

                Add and delete movies or tv show cards

                - Fetch data from [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)
                - Module *ReadMore* to render overview text inside read more component.
                - Module *i18n*  to fetch and display data in device language.
                - Moduel *moment* to format timestamps.
    - Utils
        - Zustand.js

            Module *Zustand*: State-management solution. Used to persist state

            Module *Immer*: Immutable state-management solution. 

            - Stores the user in a `  {key, object} ` data structure using ` uuidv4() ` to generate the keys.

## Available Scripts (EXPO)

In the project directory, you can run:

```bash
yarn start 
```

Runs the app in the expo development mode.

Other scripts from *package.json*

```json
"scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
```

## Screens

![README%20md%205fd99d31426d4fd6bffed0cd72d1a41c/Login.png](README%20md%205fd99d31426d4fd6bffed0cd72d1a41c/Login.png)

![README%20md%205fd99d31426d4fd6bffed0cd72d1a41c/Home.png](README%20md%205fd99d31426d4fd6bffed0cd72d1a41c/Home.png)

![README%20md%205fd99d31426d4fd6bffed0cd72d1a41c/FindMovie.png](README%20md%205fd99d31426d4fd6bffed0cd72d1a41c/FindMovie.png)

![README%20md%205fd99d31426d4fd6bffed0cd72d1a41c/MovieChecked.png](README%20md%205fd99d31426d4fd6bffed0cd72d1a41c/MovieChecked.png)

Created By Jano Detzel WWI19B2,

26.11.2020