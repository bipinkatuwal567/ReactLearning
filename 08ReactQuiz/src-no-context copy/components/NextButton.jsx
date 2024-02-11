import React from "react";

export default function NextButton({ dispatch, answer, index, questionsLength }) {
  if (answer === null) return;
  
  if(index < questionsLength - 1){
    return (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextAnswer" })}
        >
          Next
        </button>
      );
  }

  if(index === questionsLength - 1){
    return(
        <button className="btn btn-ui" 
        onClick={() => dispatch({type: 'finished'})}>
            Finish
        </button>
    )
  }
}
