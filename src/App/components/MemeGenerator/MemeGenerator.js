import React from 'react';
import MemeTextBox from './MemeTextBox';
import TemplateButton from './TemplateButton';
import Canvas from './Canvas';
import axios from 'axios';
require('../../style/generator.css')

/* Component that handles the meme generator */
class MemeGenerator extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: ""
    };
  }

  handleInput = (text) => {
    this.setState(() => ({
      searchTerm: text
    }));
  }

  checkMatch = (meme) => {
    let regexp = new RegExp(this.state.searchTerm,'gi');
    return (this.state.searchTerm === "" || meme.name.match(regexp) != null);
  }

  /*
   * TODO: Calls the /upload endpoint and stores meme in database.
   */
  uploadMeme = (event) => {
    /*look into what this does*/
    event.preventDefault();
    let myImg = {
      /*assign the properties of each meme to a variable*/
      template_id: this.props.currentMeme.id,
      photoURL: this.props.currentMeme.url,
      memeTexts: this.props.memeText,
      user: "asdfghjkl;" /*this username doesn't really matter*/
    };
    console.log(this.props.memeText); /*log the inputted labels*/
    axios.post('/upload', myImg) /*upload template, photo and meme inputted text via axios*/
      .then(response => {
        if (response.status === 200){
          /*response status === 200 means that everything's good */
          window.location.href = "/gallery"; /* if everything is okay, show the resulting meme in the gallery */
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  createTextBoxes = () => {
    /* 
        TODO: create a list of text boxes for the user to enter text into
            Props: currentMeme, an object containing fields about the current meme.
                                Use the box_count field for this function.
                   handleMemeText, a function that updates 
                   the state in MemeGeneratorWrapper when we 
                   update the text
    */
    let textBoxList = []; /* assign textBoxList as an empty list */
    if (this.props.currentMeme != null) { /* if this meme is not empty/null */
      for(let i = 0; i < this.props.currentMeme.box_count; i++) { /* for each currentMeme */
        /*push index and the meme's text into MemeGeneratorWrapper */
        textBoxList.push(<MemeTextBox index={i} handleMemeText={this.props.handleMemeText}/>)
      }
    }
    return textBoxList;
  }

  render() {
    let imgObj = this.props.memeArray ? this.props.currentMeme : null;
    return (
      <div className='meme-gen'>
        {/* align left  */}
        <h2 className="title">Meme Generator</h2>

        <div className='left-col'>
          <div className='img-preview'>
            <Canvas imgObj={imgObj} />
          </div>
        </div>
        
        <div className='right-col'>
          <div className='textboxes'>
            {this.createTextBoxes()}
          </div>
          <div className='template-search'>
            <div className='buttons-section'>
              <button type="submit" onClick={this.uploadMeme}> Submit Meme </button>
              <button type="submit" onClick={this.props.downloadMeme}>Download Meme</button>
            </div>
            <input id='search' type='text' onChange={e => this.handleInput(e.target.value)}></input>
            <div id='catalogue'>
              <p style={{
                fontWeight: this.props.isBold ? 'bold' : 'normal'
              }}>{this.props.displayName}</p>
              <div id='meme-templates'>
                {
                  this.props.memeArray &&
                  this.props.memeArray.filter(this.checkMatch).map((meme) => (
                    <TemplateButton
                      key={meme.id}
                      meme={meme}
                      reselectMeme={() => this.props.reselectMeme(meme)}
                      changeText={() => this.props.changeText(meme)}
                      resetText={this.props.resetText}/>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}
export default MemeGenerator;