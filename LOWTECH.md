# Low-Tech Local Host Setup Instructions
Disclaimer: this is for MacOS. I have never used a Windows or Linux operating system in my life unfortunately so sorry. 

## What We're Doing
This is a web app that will be hosted on a local server like your computer. That means it will run on your browser, but it won't be accessible from anywhere in the world. Instead, it will use your local network (like Wi-fi) so devices can communicate with each other. 

## Install Prerequisites
1. Node.js: this thing basically powers the frontend and backend of this app. Install it at https://nodejs.org/en/download.
2. Git: this will let you take code from Github and put it on your computer. Install it at https://git-scm.com/downloads/mac.

## Git Clone
Go to the **Finder** and locate where you want this code to be (e.g. Desktop). 

Right-click the folder, go to **Services -> New Terminal at Folder**. 

Paste this in the terminal, and hit enter. 
```bash
git clone https://github.com/realBarry123/ondes
```
Then run this
```bash
cd ondes
```

## App Setup
We'll create two terminal tabs for this, one for frontend and one for backend. 

Go to your terminal and hit **⌘ + T**. This creates another tab. You can switch between the tabs on the top of the window, much like a browser. 

In one tab, run:
```bash
cd frontend
```

In the other, run: 
```bash
cd backend
```

Then in both tabs, run: 
```bash
npm install
```

## Setting Up the Server Address
In the **Finder**, go to `ondes/frontend` and find the file `.env`
- If you don't see it, hit **⌘ + Shift + .** and it should show up (these files are hidden by the system by default.

Open it with a text editor of your choice and it should look like this:
```env
REACT_APP_SOCKET_URL=http://<my-local-ip>:<port-number>
```
Replace `<my-local-ip>` with your local IP address. This will change each time you connect to your network. To find your local IP address, go to any terminal and run: 
```bash
ipconfig getifaddr en0
```
(If that doesn't work, try `en1` instead of `en0`)
Note: try not to share you local IP address with everyone. Just in case. 

As for `<port-number>`, a lot of numbers will work but I will use `4000` for this. 

Once you're done editing, make sure to save the file. 

## Running the App
Go back to your two terminal tabs. 

In the backend tab, run: 
```bash
node server/server.js
```
You should see the text:
```
Server running on port 4000
```
In the frontend tab, run: 
```
npm run start
```
This should open a new browser tab where you will see the big text "Ondes" which has hopefully loaded in the correct font. 

## How to Play
To run this app on the device where your server is running, simply go to `http://localhost:3000` (yes it's 3000 not 4000) in your browser (Chrome or Safari). 

To run on any other device (like your friend's iPhone), use the link `http://<my-local-ip>:3000`. Again, don't share your this with people you don't trust, you never know. 

Note that they will have to be connected to the same Wi-fi network as you are. 

Pick a device to be the host (this device will also serve as audio output). Press "create new" on the home page. 

For all other devices, press "join ensemble" and enter the 4-character code on the screen on the host device. 

### BAM

# FAQ
<details>
  <summary><h4>Q: The 4-character code is not showing up!</h4></summary>
  A: Make sure your server is actually running, and that the `.env` is configured correctly. 
</details>

<details>
  <summary><h4>Q: Why is the instrument with six buttons not making any sound despite the other ones working correctly? </h4></summary>
  A: The point is kind of that you figure out how to play this instrument yourself, but if you're really stuck:
  <details>
    <summary>(spoiler)</summary>
    Try long pressing the button at the bottom. 
  </details>
</details>

<details>
  <summary><h4>Q: Why is the instrument with six buttons getting significantly louder as I play?</h4></summary>
  A: Sorry. No idea. I call this the Ultimate Volume Bug. My best guess is that something is wrong with Tone.js, which is the library I'm using for the sounds. 
</details>
