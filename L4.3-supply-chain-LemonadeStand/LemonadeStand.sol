// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Define a contract 'Lemonade Stand'
contract LemonadeStand {
    // Variable: Owner
    address owner;

    // Variable: SKU count
    uint256 skuCount;

    // Event: 'State' with value 'ForSale'
    enum State {
        ForSale,
        Shipped,
        Sold
    }

    // Struct: Item. name, sku, price, state, seller, buyer
    struct Item {
        string name;
        uint256 sku;
        uint256 price;
        State state;
        address seller;
        address buyer;
    }

    // Define a public mapping 'items' that maps the SKU (a number) to an Item.
    mapping(uint256 => Item) items;

    // Events
    event ForSale(uint256 skuCount);
    event Sold(uint256 sku);
    event Shipped(uint256 sku);

    // Modifier: Only Owner see if msg.sender == owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed");
        _;
    }

    // Define a modifier that verifies the Caller
    modifier verifyCaller(address _address) {
        require(msg.sender == _address, "Caller is not verified");
        _;
    }

    // Define a modifier that checks if the paid amount is sufficient to cover the price
    modifier paidEnough(uint256 _price) {
        require(msg.value >= _price, "Not enough value paid");
        _;
    }

    // Define a modifier that checks if an item.state of a sku is ForSale
    modifier forSale(uint256 _sku) {
        require(items[_sku].state == State.ForSale, "Not for sale");
        _;
    }

    // Define a modifier that checks if an item.state of a sku is Sold
    modifier sold(uint256 _sku) {
        require(items[_sku].state == State.Sold, "Not sold");
        _;
    }

    modifier shipped(uint256 _sku) {
        require(items[_sku].state == State.Shipped, "Not shipped");
        _;
    }

    constructor() payable {
        owner = msg.sender;
        skuCount = 0;
    }

    function addItem(string memory _name, uint256 _price) public onlyOwner {
        // Increment sku
        skuCount = skuCount + 1;

        // Emit the appropriate event
        emit ForSale(skuCount);

        // Add the new item into inventory and mark it for sale
        items[skuCount] = Item({
            name: _name,
            sku: skuCount,
            price: _price,
            state: State.ForSale,
            seller: msg.sender,
            buyer: address(0)
        });
    }

    function buyItem(uint256 sku)
        public
        payable
        forSale(sku)
        paidEnough(items[sku].price)
    {
        address buyer = msg.sender;
        uint256 price = items[sku].price;

        // Update Buyer
        items[sku].buyer = buyer;

        // Update State
        items[sku].state = State.Sold;

        // Transfer money to seller
        payable(items[sku].seller).transfer(price);

        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }

        // Emit the appropriate event
        emit Sold(sku);
    }

    function shipItem(uint256 sku) public sold(sku) {
        items[sku].state = State.Shipped;
        emit Shipped(sku);
    }

    function fetchItem(uint256 _sku)
        public
        view
        returns (
            string memory name,
            uint256 sku,
            uint256 price,
            string memory stateIs,
            address seller,
            address buyer
        )
    {
        uint16 state;
        name = items[_sku].name;
        sku = items[_sku].sku;
        price = items[_sku].price;
        state = uint16(items[_sku].state);
        if (state == uint16(State.ForSale)) {
            stateIs = "For Sale";
        } else if (state == uint16(State.Shipped)) {
            stateIs = "Shipped";
        } else if (state == uint16(State.Sold)) {
            stateIs = "Sold";
        }

        seller = items[_sku].seller;
        buyer = items[_sku].buyer;
    }
}
