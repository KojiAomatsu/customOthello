import React from 'react';
import ReactDOM from 'react-dom';

// コンポーネント名の頭文字は大文字にする
var HelloReact = React.createClass({
  render: function () {
    return (
      <div>
        Hello React!!
      </div>
    );
  }
});

ReactDOM.render(
  <HelloReact />,
  document.querySelector(".content")
);
