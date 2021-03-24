import ImageIncome from "../../assets/income.svg";
import ImageOutcome from "../../assets/outcome.svg";
import ImageTotal from "../../assets/total.svg";

import { Container } from "./styles";

function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={ImageIncome} alt="Entradas" />
        </header>
        <strong>R$1000,00</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={ImageOutcome} alt="Saídas" />
        </header>
        <strong>- R$500,00</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={ImageTotal} alt="Total" />
        </header>
        <strong>R$500,00</strong>
      </div>
    </Container>
  );
}

export default Summary;
