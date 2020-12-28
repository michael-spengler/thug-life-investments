# Thug Life Investments

## Scenario:

1. Deposit Ether to aave.com (v2)
2. Ensure it is available as collateral
3. Borrow USDC (choose variable interest rate)
4. Swap USDC to Ether
5. Add the new Ether to aave.com also using this as collateral

```
if (transactionFeesForNextRound > 10 % of the transaction amount || health factor (see aave.com) < 1.14) {
  sleep some minutes and check again
} else {
  Repeat steps 3 - 6
}
```

Background: With this you can increase your Ether holdings over time as long as prices go up.

## Assumptions

1. If many actors apply this or a similar investment pattern, the interest rates might rise until a point where the algorithm would stop
2. At a certain price people might just stop selling so that no trading pair would be found
3. People with huge capital supply have probably applied such patterns in derivates based investments - reinvesting the price gains from a long derivate to buy more of the shares.

I'm still not 100 % sure whether or not there is a risk that this approach would accumulate too much money in a monopoly or oligopoly style. At the same time it is probably good to let promising investment patterns evolve transparently so that anyone has the chance to apply such patterns.
