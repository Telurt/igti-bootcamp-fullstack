import React, { Component } from "react";

export default class Header extends Component {
  handleInputChange = (event) => {
    console.log(event.target.value);
    const newText = event.target.value;

    this.props.onChangeSalary(newText);
  };

  render() {
    const { fullSalary } = this.props;
    return (
      <div>
        <p>Salário bruto: </p>
        <input
          type="number"
          value={fullSalary}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
