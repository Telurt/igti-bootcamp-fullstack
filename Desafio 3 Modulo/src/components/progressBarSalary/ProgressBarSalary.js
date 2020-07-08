import React, { Component } from "react";
import css from "./progressbar.module.css";

export default class ProgressBarSalary extends Component {
  render() {
    const { liquidSalary } = this.props;
    const liquid = liquidSalary[0];
    const INSS = liquidSalary[2];
    const IRPF = liquidSalary[4];

    const somatorio = () => {
      let progress = [0, 0, 0];
      const soma = liquid + INSS + IRPF;
      const liquidP = (liquid / soma) * 100;
      const INSSP = (INSS / soma) * 100;
      const IRPFP = (IRPF / soma) * 100;
      progress = [liquidP, INSSP, IRPFP];
      return progress;
    };

    return (
      <div className={css.motherProgress}>
        <div
          className={css.salarioLiquido}
          style={{ width: `${somatorio()[0]}%` }}
        ></div>
        <div
          className={css.descontoINSS}
          style={{ width: `${somatorio()[1]}%` }}
        ></div>
        <div
          className={css.descontoIRPF}
          style={{ width: `${somatorio()[2]}%` }}
        ></div>
        {/* <span
          className={css.descontoINSS}
          style={{ width: `${somatorio()[0]}%` }}
        ></span>
        <span
          className={css.descontoIRPF}
          style={{ width: `${somatorio()[1]}%` }}
        ></span>
        <span
          className={css.salarioLiquido}
          style={{ width: `${somatorio()[2]}%` }}
        ></span> */}

        {console.log(somatorio()[0])}
        {console.log(somatorio()[1])}
        {console.log(somatorio()[2])}
      </div>
    );
  }
}
