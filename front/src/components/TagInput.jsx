/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const addTag = (props) => {
  let allTags = props.allTags.data;
  // Solicita lista de Tags al servidor y los convierte en un dropdown element
  return (
    <div>
      <div>
        <h1 className='titHome'>TAGS MANAGEMENT</h1>
        <div id='searchBar'>
          <form onSubmit={props.handleSubmit}>
            <div className='halfGrid'>
              <div className='halfGrid'>
                <input id='addTagInput' placeholder='    New tags' onChange={props.handleChange} name='tagInput' type='text' value={props.tagInput} />
                <input className='ActionsBotonesNaranja' id='addTagBton' type='submit' value='Add Tag' />
              </div>
              <input id='filterTag' onChange={props.handleSearch} placeholder='   Filter tags 🔎' name='tagSearch' type='text' value={props.searchTagInput} />
            </div>
          </form>
        </div>
        <div style={{ width: '300px', marginLeft: '2%' }}>
          <table >
            <thead>
              <tr>
                <th ><h1 style={{ borderBottom: '2px solid black' }}>TAGS</h1></th>
              </tr>
            </thead>
            {/* <td> */}
            <tbody>
              {allTags && allTags.filter(word => word.tag.toLowerCase().includes(props.stateSearchTag)).map((tag, i) => {
                return (
                  // <div>
                  <tr key={i++} >
                    {/* <div style={{ clear: 'both' }} className='cell'> */}
                    <td>
                      <p style={{ fontSize: '30px' }} key={i} name={tag.id}>{tag.tag}</p>
                    </td>
                    {/* </div> */}
                  </tr>
                  // </div>
                );
              })}
            </tbody>
            {/* </td> */}
          </table>
        </div>
      </div>
    </div >
  );
};

export default addTag;
