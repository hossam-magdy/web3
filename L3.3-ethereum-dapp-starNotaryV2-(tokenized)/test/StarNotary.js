const StarNotary = artifacts.require('StarNotary');

contract('StarNotary', (accounts) => {
  const [account1, account2] = accounts;

  it('can create a Star', async () => {
    const tokenId = 1;
    const instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star', tokenId, { from: account1 });
    assert.equal(
      await instance.tokenIdToStarInfo.call(tokenId),
      'Awesome Star'
    );
  });

  it('push up Star for sale', async () => {
    const tokenId = 2;
    const instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star', tokenId, { from: account1 });

    const price = web3.utils.toWei('.01', 'ether');
    await instance.putStarUpForSale(tokenId, price, { from: account1 });

    assert.equal(await instance.starsForSale.call(tokenId), price);
  });

  it('lets user2 to buyStar from user1', async () => {
    const tokenId = 4;
    const instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star', tokenId, { from: account1 });

    const price = web3.utils.toWei('.01', 'ether');
    await instance.putStarUpForSale(tokenId, price, { from: account1 });

    await instance.buyStar(tokenId, { from: account2, value: price });

    assert.equal(await instance.ownerOf(tokenId, { from: account1 }), account2);
  });

  it('updates balances of user2 after buyStar from user1', async () => {
    const tokenId = 3;
    const instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star', tokenId, { from: account1 });

    const price = web3.utils.toBN(web3.utils.toWei('.01', 'ether'));
    await instance.putStarUpForSale(tokenId, price, { from: account1 });

    const balance1Before = web3.utils.toBN(await web3.eth.getBalance(account1));
    const balance2Before = web3.utils.toBN(await web3.eth.getBalance(account2));

    const value = price.add(web3.utils.toBN(web3.utils.toWei('.01', 'ether'))); // send more than price, assert later that change is returned
    const tx = await instance.buyStar(tokenId, {
      from: account2,
      value: value,
    });
    const gasUsed = web3.utils.toBN(tx.receipt.gasUsed);
    const gasPrice = web3.utils.toBN(await web3.eth.getGasPrice());
    const gasUsedInWei = gasUsed.mul(gasPrice);
    // console.log({ tx, gasUsed, gasPrice, gasUsedInWei });

    const balance1After = web3.utils.toBN(await web3.eth.getBalance(account1));
    const balance2After = web3.utils.toBN(await web3.eth.getBalance(account2));

    assert.equal(
      balance1Before.add(price).toString(),
      balance1After.toString()
    );
    assert.equal(
      balance2Before.sub(price).sub(gasUsedInWei).toString(),
      balance2After.toString()
    );
  });
});
