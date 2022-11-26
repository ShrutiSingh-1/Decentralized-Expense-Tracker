import { expect } from "chai"
import { ethers } from "hardhat"
import {ExpenseTracker, ExpenseTracker__factory} from "../typechain-types";

describe("ExpenseTracker", function() {
    let expenseTracker: ExpenseTracker;
    let ExpenseTrackerFactory: ExpenseTracker__factory;
    beforeEach(async () => {
        ExpenseTrackerFactory = (await ethers.getContractFactory(
          "ExpenseTracker"
        )) as ExpenseTracker__factory
        expenseTracker = await ExpenseTrackerFactory.deploy()
      })

    it("Adding Expense should increment transaction length", async function() {
        const transactionResponse = await expenseTracker.addExpense(10, "party", 13112022);
        await transactionResponse.wait(1);
        expect(await expenseTracker.getUserTransactionsLen()).to.equal(1);
    })

    it("Adding Income should increment transaction length", async function() {
        const transactionResponse = await expenseTracker.addIncome(10, "salary", 14112022);
        await transactionResponse.wait(1);
        expect(await expenseTracker.getUserTransactionsLen()).to.equal(1);
    })

    it("Adding Income and Expense should increment transaction length", async function() {
        const transactionResponse1 = await expenseTracker.addExpense(10, "party", 13112022);
        await transactionResponse1.wait(1);
        const transactionResponse2 = await expenseTracker.addIncome(10, "salary", 14112022);
        await transactionResponse2.wait(1);
        expect(await expenseTracker.getUserTransactionsLen()).to.equal(2);
    })
    
    it("Adding & Fetching the transaction", async function() {
        const transactionResponse1 = await expenseTracker.addExpense(10, "party", 13112022);
        await transactionResponse1.wait(1);
        const transactionResponse2 = await expenseTracker.addIncome(10, "salary", 14112022);
        await transactionResponse2.wait(1);
        const transactions = await expenseTracker.getUserTransactions();
        expect(Number(transactions[0].t_amount)).to.equal(10);
        expect(transactions[0].t_disc).to.equal("party");
        expect(Number(transactions[0].t_date)).to.equal(13112022);
        expect(transactions[0].t_type).to.equal(1);
        expect(Number(transactions[1].t_amount)).to.equal(10);
        expect(transactions[1].t_disc).to.equal("salary");
        expect(Number(transactions[1].t_date)).to.equal(14112022);
        expect(transactions[1].t_type).to.equal(0);
    })
});