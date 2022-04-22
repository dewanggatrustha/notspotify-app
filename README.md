# NotSpotify Web App

## About
<br>
<p align="center">
  <a href="https://notspotify-app.vercel.app">
    <img src="https://user-images.githubusercontent.com/57487611/164754448-809a21bc-28ff-4412-9df5-df827f6dd014.svg" width="60%">
  </a>
</p>
<br>
NotSpotify is a a web application that uses the Spotify Developer API. This Application and repo was created during Generasi GIGIH 2.0 Program help by <a href="https://www.anakbangsabisa.org/">Yayasan Anak Bangsa Bisa</a> and GoTo Group's.

### Features
  - Login with Spotify account
  - Display User Profile (Images and Name)
  - Create new playlist with selected track's
  - Search your favorite tracks
  - Track details
  - List owned playlist in the SideBar

### Stacks
  - Create-react-app, React, Typescript
  - Styling: Chakra UI, FontAwesome Icons
  - State management: Redux
  - Testing: Jest, Testing-Library, MSW
  - Linter: ESLint
  - Deployment: Vercel

### Production
> https://notspotify-app.vercel.app

<br>
## How to run on local

- Clone the repo project

    ```bash
    git clone https://github.com/dewanggatrustha/notspotify-app.git
    ```

- Go to the project folder

    ```bash
    cd notspotify-app
    ```

- Install required dependencies

    ```bash
    npm install
    ```

- Setup environment variables

    Create file with name `.env.local` and add the following content:

    ```env
    REACT_APP_SPOTIFY_CLIENT_ID = {Add your own client ID here}
    ```

- Run the server

    ```bash
    npm start
    ```

- Open <http://localhost:3000> with your browser to see the result.

## How to use this app
Currently NotSpotify App only can run  on desktop because my styling not responsive😿. Before you use this app, make sure you already have a <a href="https://www.spotify.com/">Spotify</a> Account to create the API.
<br><br>

### Log in to the app
1. So the first to do click the "Get Started" Button

<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/57487611/164757020-589d98f7-19c0-4a94-9c22-3b6a2cc74f33.png" width="80%">
    </td>
  </tr>
</table>

2. After you click the button, you will get the Spotify Authentication page prompt to connect the account to the NotSpotify App. Don't forget to click "Agree" button.

<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/57487611/164757479-6a24766a-138b-4eb9-b974-05bfe6866e41.png" width="80%">
    </td>
  </tr>
</table>

3. AFter you success to connect your Spotify Account, you will be redirected to the Create Playlist page and finally you can use the App YEAY!🥳

<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/57487611/164757611-35c20aef-e14f-4e2c-b25e-129074e30c8b.png" width="80%">
    </td>
  </tr>
</table>
