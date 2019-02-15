# Hash cracking in peer-to-peer architecture
## Description
This repository contains implementation of PoC (Proof of Concept) peer-to-peer network for simplified hash cracking. 

It consist of few processes and utility script for generating file for cracking. Main process manages communication between peers and connection between other two processes (worker process and server process). Depending on in which state the peer is (at the moment, the best overview of those states is to read the code in `state` module) behaviour of the peer changes and adapts to other peers in the network.

Worker process is only for finding plaintext of given hash (and method). Currently it supports MD5, SHA1, SHA256 but it can be easily changed to support even more algorithms.

Server process connects to main process and fetches information about current state of hash cracking. It also provides web interface for viewing all the information.
## Installation
```bash
npm install
npm run dev
```
The `npm run dev` watches entrypoints and creates files in `/build`.
If you would like to add new entrypoint to watch and build just edit:
```js
entry: {
  server: path.resolve(__dirname, '../src/Server.ts')
}
```
in `/config/webpack.config.js` by adding another line. 

For example:
```js
entry: {
  server: path.resolve(__dirname, '../src/server/main.ts'),
  something: path.resolve(__dirname, '../src/something.ts'
}
```
will watch file `/src/something.ts` and compile it to `/build/something.js`.

### Docker
The project uses Docker for setting up example network. You will need to create your own Docker machine with shared folder pointing to directory of the project (convenient for live code updates).

To start the network:
```
docker-compose up
```
If you want to change number of peers you will need to tweak the `docker-compose.yml` file.
The `package.json` file is also worth checking because of default definitions of npm shortcut commands.
## How to launch something?
In `/build` there should be files you are looking for.
If you want to start your application just type `node <name_of_file.js>` and thats it.

## Issues and limitations
Current implementation of this project is limited only to the local network - all of the peers must be inside of the same network. There is also problem with changing length of words to check the hashes against to. Right now, it is hardcoded inside of the `WorkerState.ts`.
