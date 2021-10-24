# nuxt-muscle-app

## doyouhave-muscleについて

筋トレ管理アプリです。

何か形にしたくて作りましたが、心が折れてGoogleログインまでしか実装していません。今後時間があれば完成させたいと思います。

## 現在の機能

Googleログイン

メールアドレスログイン

のみ😭

## tabian卒業要件について

✅Nuxt.jsでページ・コンポーネントを作成できること

✅emit を使えること

✅v-model を理解していること

✅v-bind="boundedVar" を使えること

✅<slot name="my-slot" v-bind="boundedVar"> と <template #my-slot="boundedVar"> を使えること

🔲watch を使えること ←このアプリでは使用していませんが、OptionalAPI・CompositionAPIどちらでも使用可能です。

✅emit('input') を使えること

✅Nuxt.jsのstoreでモジュールを作成できること

✅基本的なTypeScriptの読み書きができること

🔲const value: any のように、any 型を使わないで書けること ← このアプリでは使用していませんがanyを使用せずにかけます。

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
