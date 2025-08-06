# Ondes
## Contents
- [About](#about)
- [Program Note](#program-note)
- [Local Setup Instructions](#local-setup-instructions)
- [License](#license)

## About

An interactive composition / electronic instrument / multiplayer game, built for networked ensemble. 

### Frameworks Used
* [React](https://react.dev/)
* [Socket.IO](https://socket.io/)
* [Tone.js](https://tonejs.github.io/)
  
## Program Note
Ondes was my attempt at making music that was equally accessible to everyone. Playable on any combination of devices, from anywhere with internet access, and without a score, it removes the usual requirements for instruments and musical knowledge.

To further level the playing field, I employed an array of unfamiliar, often mysterious interfaces, labels, and sounds. The inaccessibility of the music becomes another equalizer, confounding musicians and non-musicians alike.

The title, “Ondes”, means “waves” in French and comes from the Ondes Martenot, an early electronic instrument used extensively by Olivier Messiaen, from whom the aesthetic of the music draws inspiration.

As the piece is put into motion, it relies on the sending and receiving of invisible “ondes” (radio waves) through the air.

I don’t understand this technology, and as far as I’m concerned, no one does.

<p align="center">#</p>

I would like to thank my mentors Felix Huang and Alfredo Santa Ana for providing me with valuable technical and intellectual support before and during the development process, as well as my brother Andy for being this project’s first hardcore player.

## Local Setup Instructions

Note: this is a simplified tutorial for the tech people. For full instructions see [LOWTECH.md](LOWTECH.md).

Currently, this project is not being hosted on a public server. Therefore, if you really must play it, here are the steps to set up a server on your own computer. 

### Server Prerequisites
- MacOS (no guarantee it will work on anything else)
- Node.js (I have v20.18.0)
- Git (obviously)
  
### Server Setup
1. Clone the repo. If you have no idea what that means, see [LOWTECH.md](LOWTECH.md). 
2. Run `npm install` in both the `backend` and `frontend` directories. 
3. Edit `frontend/.env` template to include your local IP address (`ipconfig getifaddr en0`) and backend port.
   - Example: `REACT_APP_SOCKET_URL = http://10.69.69.420:4000`
5. In `backend`, run `node server/server.js`. 
6. In `frontend`, run `npm start`.

### How to Play
1. Share this link with your friends `http://<my-local-ip>:3000`, or play alone by opening many browser tabs (that's just life) on `localhost:3000`.
   - Works on iPhone and Mac, Safari and Chrome browsers. Keep in mind you have to be connected to the same network. 
2. On the device you want to use as audio output, hit "create new". A four-character code should show up on the screen.
3. On other devices, hit "join room" and enter the code. 

## License
Distributed under the GNU General Public License v3.0. See [LICENSE](https://github.com/realBarry123/ondes/blob/main/LICENSE) for more information
