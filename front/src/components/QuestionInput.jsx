/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const QuestionInput = (props) => {
  // Solicita lista de Tags al servidor y los convierte en un dropdown element
  return (
    <div>
      {console.log('aca estan las props', props)}
      <div>
        <h1 className='titHome'>ADD A NEW QUESTION</h1>
        <div id='responsiveNewQuestion'>
          <h6 className='subTitles'>Select question tags: </h6>
          <div id='tagsDisplay'>
            <form onSubmit={props.submiTag} className='addTag'>
              { props.user }
              <select name='dropdown' className='selectTag'>
                {
                  props.tags.map(function (tag) {
                    return <option value={tag.tag} key={tag.id}>{tag.tag}</option>;
                  })
                }
              </select>
              <br />
              <br />
              <input type='submit' value='ADD TAG' id='addTagBtn' />
            </form>
            <div id='tagContainer'>
              <h5 style={{ marginLeft: '10px', color: '#DE411B' }} id='boxTitle'>TAGS SELECTED - Click to delete</h5>
              {/* <br />
                <label style={{ color: 'red' }}>{props.alert}</label>
                <br /> */
              }
              <div>
                {
                  props.selectedTags.map(function (tagName, i) {
                    return <h6 style={{ cursor: 'pointer', float: 'left', marginLeft: '15px', border: '1px solid black', padding: '7px', borderRadius: '8px', marginBottom: '10px' }} onClick={props.delete} name={i} key={i}>{tagName}</h6>;
                  })
                }
              </div>
              <br />
            </div>
          </div>
          <form name='question' onSubmit={props.submitQuestion}>
            <h6 className='subTitles'>Question content: </h6>
            <div >
              <textarea type='textbox' name='question' className='questionTextbox' />
            </div>
            <br />
            <br />
            <div style={{ padding: '0px 15%' }}><button className='btn boton btn-lg btnQuest' type='submit' > CREATE QUESTION</button></div>
            <div style={{ margin: '0px 15%' }}><Link to='/questions'><button className='btn boton btn-lg btnQuest' type='submit' > VIEW ALL </button></Link></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionInput;
