/**
 * 源代码：https://github.com/Jxck/html2json
 * 针对小程序的 rich-text 组件作了一下一些改动
 */
const HTMLParser = require('./htmlparser');

function q(v) {
  return `"${v}"`;
}

function removeDOCTYPE(html) {
  return html
    .replace(/<\?xml.*\?>\n/, '')
    .replace(/<!doctype.*\>\n/, '')
    .replace(/<!DOCTYPE.*\>\n/, '');
}

// rich-text 组件不支持的 html 实体
const notSupportsHTMLEntities = ['&middot;'];
// rich-text 组件不支持的 html 标签
const notSupportsHTMLTags = [];

module.exports = function HTML2JSON(html) {
  html = removeDOCTYPE(html);

  const bufArray = [];
  const results = {
    name: 'div',
    type: 'node',
    attrs: {
      class: 'mpvue-markdown-body'
    },
    children: [],
  };

  HTMLParser(html, {
    start: (tag, attrs, unary) => {
      // 元素节点
      const node = {
        name: tag,
        type: 'node'
      };
      if (attrs.length !== 0) {
        node.attrs = attrs.reduce(function(pre, attr) {
          let value = attr.value;
          const name = attr.name;

          // has multi attibutes
          // make it array of attribute
          if (value.match(/ /)) {
            value = value.split(' ');
          }
          
          // 所有属性值转为字符串
          if (typeof value !== 'string') {
            value = typeof value.join === 'function' ? value.join(' ') : String(value);
          }

          // if attr already exists
          // merge it
          if (pre[name]) {
            if (Array.isArray(pre[name])) {
              // already array, push to last
              pre[name].push(value);
            } else {
              // single value, make it array
              pre[name] = [pre[name], value];
            }
          } else {
            // not exist, put it
            pre[name] = value;
          }

          return pre;
        }, {});
      }
      
      // 添加特定的 class
      if (node.attrs) {
        let cls = node.attrs['class'];
        if (typeof cls === 'string') {
          cls = `mpvue-markdown-${tag} ${node.attrs['class']}`;
        } else {
          cls = cls ? `mpvue-markdown-${tag} ${node.attrs['class'].join(' ')}` : `mpvue-markdown-${tag}`;
        }
        node.attrs['class'] = cls;
      } else {
        node.attrs = {
          'class': `mpvue-markdown-${tag}`
        };
      }

      if (unary) {
        // if this tag dosen't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        const parent = bufArray[0] || results;
        if (parent.children === undefined) {
          parent.children = [];
        }
        parent.children.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: (tag) => {
      // merge into parent tag
      const node = bufArray.shift();

      if (node.name !== tag) {
        console.error('invalid state: mismatch end tag');
      };

      if (bufArray.length === 0) {
        results.children.push(node);
      } else {
        const parent = bufArray[0];
        if (parent.children === undefined) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    },
    chars: function(text) {
      // 文本节点
      const node = {
        // 不支持的 html 实体转为空字符串
        text: notSupportsHTMLEntities.includes(text.trim()) ? ' ' : text,
        type: 'text'
      };
      if (bufArray.length === 0) {
        results.children.push(node);
      } else {
        const parent = bufArray[0];
        if (parent.children === undefined) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    }
    // comment: function(text) {
    //   // comment 节点
    //   const node = {
    //     node: 'comment',
    //     text: text,
    //   };
    //   const parent = bufArray[0];
    //   if (parent.child === undefined) {
    //     parent.child = [];
    //   }
    //   parent.child.push(node);
    // },
  });
  return [].concat(results);
};
