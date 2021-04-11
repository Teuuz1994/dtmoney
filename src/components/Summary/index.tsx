import ImageIncome from "../../assets/income.svg";
import ImageOutcome from "../../assets/outcome.svg";
import ImageTotal from "../../assets/total.svg";

import { useTransactions } from "../../hooks/Transactions";

import { Container } from "./styles";

function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acum, transaction) => {
      if (transaction.type === "deposit") {
        acum.deposits += transaction.amount;
        acum.total += transaction.amount;
      }

      if (transaction.type === "withdraw") {
        acum.withdraws += transaction.amount;
        acum.total -= transaction.amount;
      }

      return acum;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={ImageIncome} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={ImageOutcome} alt="Saídas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={ImageTotal} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}

export default Summary;
