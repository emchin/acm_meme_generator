import React from 'react';

class MemeTextBox extends React.Component {
  render() {
  	return (
      <div className='memetext'>
      	<h2>Text Box {this.props.index + 1} </h2>
      	<textarea onChange={e => this.props.handleMemeText(this.props.index,e.target.value)}></textarea>
      </div>
    );
  }
}

export default MemeTextBox;