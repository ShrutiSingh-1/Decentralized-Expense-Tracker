import Main from "../components/main/Main";
import PerformanceGraph from "../components/performance/PerformanceGraph";
import TopExpense from "../components/top-performers/TopExpense";
import TopIncome from "../components/top-performers/TopIncome";
import Transactions from "../components/transactions/Transactions";

export default function HomePage() {
  return (
    <div>
      <h1 className="d-flex justify-content-center">
        <i>Expense Tracker</i>
      </h1>
      <Main />
      <Transactions />
      <PerformanceGraph />
      <TopIncome />
      <TopExpense />
    </div>
  );
}
