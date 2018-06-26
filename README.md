![npm-version](https://img.shields.io/npm/v/mpvue-markdown-parser.svg) ![license](https://img.shields.io/npm/l/mpvue-markdown-parser.svg)

## mpvue-markdown-parser
A markdown parser for [mpvue](https://github.com/Meituan-Dianping/mpvue).

## Preview screenshots
**Basic render:**

![image](https://user-images.githubusercontent.com/7871813/41890957-a8bf550e-7944-11e8-95c5-188e480d93ed.png)

**Code highlight and list:**

![image](https://user-images.githubusercontent.com/7871813/41891003-db5ed8f4-7944-11e8-8409-2a5bedd736e1.png)

**Table and tasks lists:**

![image](https://user-images.githubusercontent.com/7871813/41891028-f7d1896e-7944-11e8-8d86-c05a427c8c05.png)

## Features
1. Easy to use
2. Supports code highlight, [tasks list](https://blog.github.com/2014-04-28-task-lists-in-all-markdown-documents/), etc.
3. Powered by native component(`rich-text`)
4. Better Performance

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

## Who to use
* [mpvue-jithub](https://github.com/dwqs/mp-jithub)

## LICENSE
MIT