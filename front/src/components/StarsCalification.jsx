/* eslint-disable no-unused-vars */
import React from 'react';

const pepe = (props) => {
  let array = ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star',
    'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star'];
  for (let i = 0; i < props.score; i++) {
    array[i] = 'fa fa-star checked';
  }
  return (<div>
    <h4><b style={{ fontSize: '32px' }}>{props.pregunta}</b> <br/><br/>{props.score + ' '}
      <span className={array[0]}></span>
      <span className={array[1]}></span>
      <span className={array[2]}></span>
      <span className={array[3]}></span>
      <span className={array[4]}></span>
      <span className={array[5]}></span>
      <span className={array[6]}></span>
      <span className={array[7]}></span>
      <span className={array[8]}></span>
      <span className={array[9]}></span>
    </h4><br/>
    {/* Observation: {props.observation} */}
  </div>);
}
;

export default pepe;
