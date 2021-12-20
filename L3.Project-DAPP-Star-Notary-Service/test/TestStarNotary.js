const StarNotary = artifacts.require('StarNotary');

contract('StarNotary', ([owner, user1, user2]) => {
  it('can Create a Star', async () => {
    const tokenId = 1;
    const instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, { from: owner });
    assert.equal(
      await instance.tokenIdToStarInfo.call(tokenId),
      'Awesome Star!'
    );
  });

  it('lets user1 put up their star for sale', async () => {
    const instance = await StarNotary.deployed();
    const starId = 2;
    const starPrice = web3.utils.toWei('.01', 'ether');
    await instance.createStar('awesome star', starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    assert.equal(await instance.starsForSale.call(starId), starPrice);
  });

  it('lets user1 get the funds after the sale', async () => {
    const instance = await StarNotary.deployed();
    const starId = 3;
    const starPrice = web3.utils.toWei('.01', 'ether');
    const balance = web3.utils.toWei('.05', 'ether');
    await instance.createStar('awesome star', starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    const balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, { from: user2, value: balance });
    const balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    const value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    const value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
  });

  it('lets user2 buy a star, if it is put up for sale', async () => {
    const instance = await StarNotary.deployed();
    const starId = 4;
    const starPrice = web3.utils.toWei('.01', 'ether');
    const balance = web3.utils.toWei('.05', 'ether');
    await instance.createStar('awesome star', starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    const balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, { from: user2, value: balance });
    assert.equal(await instance.ownerOf.call(starId), user2);
  });

  it('lets user2 buy a star and decreases its balance in ether', async () => {
    const instance = await StarNotary.deployed();
    const starId = 5;
    const starPrice = web3.utils.toWei('.01', 'ether');
    const balance = web3.utils.toWei('.05', 'ether');
    await instance.createStar('awesome star', starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });

    const balanceOfUser2BeforeBuying = await web3.eth.getBalance(user2);

    const tx3 = await instance.buyStar(starId, {
      from: user2,
      value: balance,
      // gasPrice: 0, // caused error "transaction underpriced" on Rinkeby
    });
    const gasUsed = web3.utils.toBN(tx3.receipt.gasUsed);
    const gasPrice = web3.utils.toBN(await web3.eth.getGasPrice());
    const gasUsedInWei = gasUsed.mul(gasPrice);

    const balanceOfUser2AfterBuying = await web3.eth.getBalance(user2);
    const value = web3.utils
      .toBN(balanceOfUser2BeforeBuying)
      .sub(web3.utils.toBN(balanceOfUser2AfterBuying))
      .sub(gasUsedInWei)
      .toString();
    assert.equal(value, starPrice);
  });

  // Implement Task 2 Add supporting unit tests

  it('can add the star name and star symbol properly', async () => {
    // 1. create a Star with different tokenId
    // 2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    const instance = await StarNotary.deployed();
    assert.equal(await instance.name.call(), 'HStar Token');
    assert.equal(await instance.symbol.call(), 'HST');
  });

  it('lets 2 users exchange stars', async () => {
    // 1. create 2 Stars with different tokenId
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    // 3. Verify that the owners changed
    const instance = await StarNotary.deployed();

    const starId1 = 6;
    await instance.createStar('Awesome star 1', starId1, { from: user1 });
    assert.equal(await instance.ownerOf(starId1, { from: user1 }), user1);

    const starId2 = 7;
    await instance.createStar('Awesome star 2', starId2, { from: user2 });
    assert.equal(await instance.ownerOf(starId2, { from: user1 }), user2);

    await instance.exchangeStars(starId1, starId2, { from: user1 });
    assert.equal(await instance.ownerOf(starId1, { from: user1 }), user2);
    assert.equal(await instance.ownerOf(starId2, { from: user1 }), user1);
  });

  it('lets a user transfer a star', async () => {
    // 1. create a Star with different tokenId
    // 2. use the transferStar function implemented in the Smart Contract
    // 3. Verify the star owner changed.
    const starId = 8;
    const instance = await StarNotary.deployed();
    await instance.createStar('Awesome star 8', starId, { from: user1 });
    await instance.transferStar(user2, starId, { from: user1 });
    assert.equal(await instance.ownerOf(starId, { from: user1 }), user2);
  });

  it('lookUptokenIdToStarInfo test', async () => {
    // 1. create a Star with different tokenId
    // 2. Call your method lookUptokenIdToStarInfo
    // 3. Verify if you Star name is the same
    const starId = 9;
    const instance = await StarNotary.deployed();
    await instance.createStar('Awesome star 9', starId, { from: user1 });
    assert.equal(
      await instance.lookUptokenIdToStarInfo(starId, { from: user1 }),
      'Awesome star 9'
    );
  });
});
