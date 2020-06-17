import React, { Component } from "react";
import Header from "./components/header/Header.js";
import { formatNumber } from "./helpers/formatHelpers.js";
import ProgressBarSalary from "./components/progressBarSalary/ProgressBarSalary.js";
import css from "./index.css";
import cssP from "./components/progressBarSalary/progressbar.module.css";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: "",
      liquidSalary: [0, 0, 0, 0, 0],
    };
  }

  handleInputSalary = (newText) => {
    this.setState({
      fullSalary: newText,
    });

    const INSS_TABLE = [
      {
        id: 1,
        minValue: 0,
        maxValue: 1045,
        difference: 1045 - 0,
        discountPercentage: 0.075,
        discountValue: -1,
      },
      {
        id: 2,
        minValue: 1045.01,
        maxValue: 2089.6,
        difference: 2089.6 - 1045,
        discountPercentage: 0.09,
      },
      {
        id: 3,
        minValue: 2089.61,
        maxValue: 3134.4,
        difference: 3134.4 - 2089.6,
        discountPercentage: 0.12,
      },
      {
        id: 4,
        minValue: 3134.41,
        maxValue: 6101.06,
        difference: 6101.06 - 3134.4,
        discountPercentage: 0.14,
      },
    ];

    function round(value) {
      return +value.toFixed(2);
    }

    function calculateDiscountINSS(baseINSS) {
      let discountINSS = 0;

      if (baseINSS > 6101.07) {
        return 713.1;
      }

      for (var i = 0; i < INSS_TABLE.length; i++) {
        var currentItem = INSS_TABLE[i];
        let discountValue = 0;

        if (baseINSS > currentItem.maxValue) {
          // prettier-ignore
          discountValue = 
            round(currentItem.difference * currentItem.discountPercentage);

          discountINSS += discountValue;
        } else {
          // prettier-ignore
          discountValue = 
            round((baseINSS - currentItem.minValue) * currentItem.discountPercentage);

          discountINSS += discountValue;
          break;
        }
      }

      discountINSS = round(discountINSS);

      return discountINSS;
    }

    function calculateDiscountIRPF(baseIRPF) {
      let discountIRPF =
        baseIRPF < 1903.98
          ? 0
          : baseIRPF < 2826.65
          ? round(baseIRPF * 0.075) - 142.8
          : baseIRPF < 3751.05
          ? round(baseIRPF * 0.15) - 354.8
          : baseIRPF < 4664.68
          ? round(baseIRPF * 0.225) - 636.13
          : round(baseIRPF * 0.275) - 869.36;

      discountIRPF = round(discountIRPF);

      return discountIRPF;
    }

    const calculateSalaryFrom = (newText) => {
      const baseINSS = newText;
      const discountINSS = calculateDiscountINSS(baseINSS);

      const baseIRPF = baseINSS - discountINSS;
      const discountIRPF = calculateDiscountIRPF(baseIRPF);

      const netSalary = baseINSS - discountINSS - discountIRPF;
      const liquidSalary = [
        netSalary,
        baseINSS,
        discountINSS,
        baseIRPF,
        discountIRPF,
      ];
      return liquidSalary;
    };

    this.setState({
      liquidSalary: calculateSalaryFrom(newText),
    });
  };

  render() {
    const { fullSalary, liquidSalary } = this.state;

    return (
      <div>
        <h1>React Salário</h1>
        <Header
          fullSalary={fullSalary}
          onChangeSalary={this.handleInputSalary}
        />
        <div className={css.flexRow}>
          <ProgressBarSalary liquidSalary={liquidSalary} />
          <span className={cssP.liquidBorder}>
            Salário líquido:
            <strong style={{ color: "#16a085" }}>
              R$ {formatNumber(liquidSalary[0])}
            </strong>
          </span>
          <span>
            Base INSS:
            <strong>R$ {formatNumber(liquidSalary[1])}</strong>
          </span>
          <span className={cssP.inssBorder}>
            Desconto INSS:
            <strong>R$ {formatNumber(liquidSalary[2])}</strong>
          </span>
          <span>
            Base IRPF:
            <strong>R$ {formatNumber(liquidSalary[3])}</strong>
          </span>
          <span className={cssP.irpfBorder}>
            Desconto IRPF:
            <strong>R$ {formatNumber(liquidSalary[4])}</strong>
          </span>
          {/* {showUsers ? <div>Users</div> : <div>Nada a ser mostrado</div>} */}
        </div>
      </div>
    );
  }
}
