![npm-version](https://img.shields.io/npm/v/mpvue-markdown-parser.svg) ![license](https://img.shields.io/npm/l/mpvue-markdown-parser.svg)

## mpvue-markdown-parser
A markdown parser for [mpvue](https://github.com/Meituan-Dianping/mpvue).

## Preview screenshots
![image](https://user-images.githubusercontent.com/7871813/41889248-1d536e54-793c-11e8-9614-ee3dd9dd3003.png)

![image](https://user-images.githubusercontent.com/7871813/41889242-16a1661a-793c-11e8-9fba-ce7d865a5ea2.png)

![image](https://user-images.githubusercontent.com/7871813/41889252-2509b680-793c-11e8-8d85-2dbff6149e68.png)

## Features
* Easy to use
* Supports code highlight, [tasks list](https://blog.github.com/2014-04-28-task-lists-in-all-markdown-documents/), etc.
* Powered by native component(`rich-text`)
* Better Performance

## Installation

npm:

```
npm i --save mpvue-markdown-parser
```
or yarn

```
yarn add  mpvue-markdown-parser
```
## Get Started

```html
<template>
  <rich-text :nodes="nodes"></rich-text>
</template>

<script>
  import 'prismjs/themes/prism.css';
  import MpvueMarkdownParser from 'mpvue-markdown-parser';
  import 'mpvue-markdown-parser/dist/index.css';

  export default {
    data () {
      return {
        nodes: MpvueMarkdownParser('# your markdown text')
      }
    }
  }
</script>
```

## LICENSE
MIT