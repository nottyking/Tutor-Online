var React = require( 'react' );
var Editor = require( 'wysiwyg-editor-react' );
var createReactClass = require('create-react-class');

var Example = createReactClass( {
  getInitialState: function () {
    return {
      text: '<b>WYSIWYG Editor</b> For <a href="http://www.reactjs.com">ReactJS</a>.'
    }
  },
  onTextUpdate: function ( val ) {
    this.state.text = val;
    this.forceUpdate();
  },
  render: function () {
    return (
      <div>
        <Editor />
        {this.state.text}
      </div>
    )
  }
} );

module.exports = Example;
