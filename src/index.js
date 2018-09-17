const marked = require('marked');
const Prism = require('prismjs');

const HTML2JSON = require('./html2json');

function encodeHTMLContent (str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function encodeHTMLCodeContent (str) {
  return encodeHTMLContent(str).replace(/\t/g, '    ').replace(/\r?\n/g, '\n');
}

const renderer = new marked.Renderer();

// 小程序不支持 pre
renderer.code = (code, language) => {
  const lang = Prism.languages[language] ? Prism.languages[language] : Prism.languages['javascript'];
  code = code.replace(/\r\n(?!<\/code>)/g, '<p>\n<\/p>');

  return `<code class="mpvue-code-wrap">${Prism.highlight(code, lang)}</code>`;
};

// 支持 task-lists: https://blog.github.com/2014-04-28-task-lists-in-all-markdown-documents/
renderer.listitem = (text) => {
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text
      .replace(/^\s*\[ \]\s*/, '<i class="mpvue-checkbox-icon empty"></i> ')
      .replace(/^\s*\[x\]\s*/, '<i class="mpvue-checkbox-icon checked"></i> ');
    
    return `<li class="task-list-item">${text}</li>`;
  } else {
    return `<li>${text}</li>`;
  }
};

module.exports = function MpvueMarkdownParser(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  // 如果markdown中有html片段，会产生一些转义： https://github.com/markedjs/marked/issues/779
  const htmlText = marked(text).replace(/&lt;(?!<)/g, '<').replace(/&gt;(?!<)/g, '>').replace(/&quot;/g, '');
  
  return HTML2JSON(htmlText);
};
