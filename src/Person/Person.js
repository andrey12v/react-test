import React from 'react';
import './Person.css';

const Person = (props) => {

  return(
    <div className="Person" >
      <p onClick={props.click}> I am {props.name} and I am {props.age} My hobbie is <b>{props.children}</b></p>
      <input type="text" onChange={props.changed} value={props.name}  />
    </div>
  )
}
export default Person;
