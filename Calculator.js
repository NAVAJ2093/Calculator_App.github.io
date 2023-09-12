import React, { Component } from 'react';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0', // The current input or result
      operator: null, // The operator (+, -, *, /)
      prevValue: null, // The previous input
    };
  }

  handleDigitClick = (digit) => {
    const { display, operator } = this.state;
    if (operator === '=') {
      // Reset the calculation when clicking a digit after '='
      this.setState({ display: digit, operator: null, prevValue: null });
    } else if (display === '0') {
      this.setState({ display: digit });
    } else {
      this.setState((prevState) => ({
        display: prevState.display + digit,
      }));
    }
  };
  
  handleOperatorClick = (operator) => {
    const { display, prevValue, operator: prevOperator } = this.state;
  
    if (prevValue !== null && prevOperator !== null) {
      this.calculateResult(); // Perform the calculation if both values and an operator are already set
    }
  
    this.setState({
      operator,
      prevValue: parseFloat(display),
      display: '0', // Reset the display to allow input of the second value
    });
  };
  

  calculateResult = () => {
    const { display, prevValue, operator } = this.state;
    let result = 0;
  
    if (operator === '+') {
      result = prevValue + parseFloat(display);
    } else if (operator === '-') {
      result = prevValue - parseFloat(display);
    } else if (operator === '*') {
      result = prevValue * parseFloat(display);
    } else if (operator === '/') {
      const inputValue = parseFloat(display);
      if (inputValue === 0) {
        this.setState({ display: 'Error', operator: null, prevValue: null });
        return;
      }
      result = prevValue / inputValue;
    }
  
    this.setState({ display: result.toString(), prevValue: result, operator: '=' });
  };
  

  handleClear = () => {
    this.setState({ display: '0', operator: null, prevValue: null });
  };

  render() {
    return (
      <div className="container">
      <h1 className="title">Calculator App</h1>
      <div className="calculator">
        <div className="display">{this.state.display}</div>
        <div className="buttons">
          <button onClick={() => this.handleDigitClick('7')}>7</button>
          <button onClick={() => this.handleDigitClick('8')}>8</button>
          <button onClick={() => this.handleDigitClick('9')}>9</button>
          <button onClick={() => this.handleOperatorClick('+')}>+</button>

          <button onClick={() => this.handleDigitClick('4')}>4</button>
          <button onClick={() => this.handleDigitClick('5')}>5</button>
          <button onClick={() => this.handleDigitClick('6')}>6</button>
          <button onClick={() => this.handleOperatorClick('-')}>-</button>

          <button onClick={() => this.handleDigitClick('1')}>1</button>
          <button onClick={() => this.handleDigitClick('2')}>2</button>
          <button onClick={() => this.handleDigitClick('3')}>3</button>
          <button onClick={() => this.handleOperatorClick('*')}>*</button>

          <button onClick={() => this.handleDigitClick('0')}>0</button>
          <button onClick={this.handleClear}>C</button>
          <button onClick={this.calculateResult}>=</button>
          <button onClick={() => this.handleOperatorClick('/')}>/</button>
        </div>
      </div>
    </div>
    );
  }
}

export default Calculator;

