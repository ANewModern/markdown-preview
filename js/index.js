var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderer = new marked.Renderer();

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

renderer.link = function (href, title, text) {
  return '<a target="_blank" href="' + href + '" title="' + title + '">' + text + '</a>';
};

var placeholder = '# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here\'s some other cool stuff:\n  \nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == \'```\' && lastLine == \'```\') {\n    return multiLineCode;\n  }\n}\n```\n  \nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere\'s also [links](https://www.freecodecamp.com), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let\'s not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n';

var Markdown_Container = function (_React$Component) {
  _inherits(Markdown_Container, _React$Component);

  function Markdown_Container(props) {
    _classCallCheck(this, Markdown_Container);

    var _this = _possibleConstructorReturn(this, (Markdown_Container.__proto__ || Object.getPrototypeOf(Markdown_Container)).call(this, props));

    _this.setInputValue = function (inputValue) {
      _this.setState(function () {
        return { inputValue: inputValue };
      });
    };

    _this.state = {
      inputValue: placeholder
    };
    _this.setInputValue = _this.setInputValue.bind(_this);
    return _this;
  }

  _createClass(Markdown_Container, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'markdown-c' },
        React.createElement(
          'textarea',
          {
            rows: 25,
            columns: 10,
            className: 'markdown-c__textarea',
            onChange: function onChange(inputValue) {
              return _this2.setInputValue(inputValue.target.value);
            },
            placeholder: "Start typing to get results",
            id: "editor"
          },
          placeholder
        ),
        React.createElement(Markdown_Translator, { translatedText: this.state.inputValue })
      );
    }
  }]);

  return Markdown_Container;
}(React.Component);

var Markdown_Translator = function (_React$Component2) {
  _inherits(Markdown_Translator, _React$Component2);

  function Markdown_Translator(props) {
    _classCallCheck(this, Markdown_Translator);

    var _this3 = _possibleConstructorReturn(this, (Markdown_Translator.__proto__ || Object.getPrototypeOf(Markdown_Translator)).call(this, props));

    _this3.getMarkdownText = _this3.getMarkdownText.bind(_this3);
    return _this3;
  }

  _createClass(Markdown_Translator, [{
    key: 'getMarkdownText',
    value: function getMarkdownText(mark) {
      var rawMarkup = marked(mark, { sanitize: true });
      console.log(rawMarkup);
      return { __html: rawMarkup };
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', {
        dangerouslySetInnerHTML: this.getMarkdownText(this.props.translatedText),
        className: 'markdown-c__markdown-translator',
        id: 'preview'
      });
    }
  }]);

  return Markdown_Translator;
}(React.Component);

ReactDOM.render(React.createElement(Markdown_Container, null), document.getElementById("root"));