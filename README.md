# Hash cracking in peer-to-peer architecture
## Installation
```bash
npm install
npm run dev
```
The `npm run dev` watches entrypoints and creates files in `/build`.
If you would like to add new entrypoint to watch and build just edit:
```js
entry: {
  server: path.resolve(__dirname, '../src/server/main.ts'),
  p2p: path.resolve(__dirname, peer)
}
```
in `/config/webpack.config.js` by adding another line. 

For example:
```js
entry: {
  server: path.resolve(__dirname, '../src/server/main.ts'),
  p2p: path.resolve(__dirname, '../src/p2p/main.ts'),
  something: path.resolve(__dirname, '../src/something.ts'
}
```
will watch file `/src/something.ts` and compile it to `/build/something.js`.
## How to launch something?
In `/build` there should be files you are looking for.
If you want to start your application just type `node <name_of_file.js>` and thats it.
