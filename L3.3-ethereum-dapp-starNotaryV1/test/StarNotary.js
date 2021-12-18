const StarNotary = artifacts.require('StarNotary');

contract('StarNotary', (accounts) => {
  it('should return starName as expected', async () => {
    const instance = await StarNotary.deployed();
    assert.equal(await instance.starName.call(), 'Awesome Udacity Star');
  });

  it('should have empty starOwner', async () => {
    const instance = await StarNotary.deployed();
    const zeroAddress = '0x0000000000000000000000000000000000000000';
    assert.equal(await instance.starOwner.call(), zeroAddress);
  });

  it('should claimStar (change starOwner)', async () => {
    const [acc1, acc2] = accounts;
    const instance = await StarNotary.deployed();

    await instance.claimStar({ from: acc1 });
    assert.equal(await instance.starOwner.call(), acc1);

    await instance.claimStar({ from: acc2 });
    assert.equal(await instance.starOwner.call(), acc2);
  });
});
