import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Quiz extends Component {
    
    constructor(props){
      super(props);
      this.state= {quizs : [] }

    }
    componentDidMount() {
      fetch('/quiz/').then(res=>console.log(res.data));
     // .then(quizs => {this.setState({ 
       // quizs  }); });
    
    }
    renderProducts() {
      return this.state.quizs.map(quiz => {
          return (
            <div > 
              <h2>{quiz.titre}</h2>  
              <p>-{quiz.matiere}-{quiz.description}</p>
                   <hr />  </div>
       );  })
    }

  
   
    render() { 
    return (
    
   <div className="container">
   
     {this.renderProducts() }
     </div>
    )
    }
}

export default Quiz;
