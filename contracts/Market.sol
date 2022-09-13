//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./Item.sol";


/// @title Market
/// @author Abhinav Pathak
/// @dev This contract is used to create a marketplace for the NFTs.
/// @dev Inherits ReentrancyGuard which is deployed on createlMarketItem() and createItemSale() functions
/// @dev Uses Counters library for tracking itemID for the marketplace items created.
/// @dev Uses Counters library for tracking number of items Sold.
contract Market is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemId;
  Counters.Counter private _itemSold;

  address payable owner;
  uint256 listingPrice = 0.001 ether;

  constructor() {
    owner = payable(msg.sender);
  }

  struct nftItem {
    uint256 itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => nftItem) private idToNftItem;

  event nftItemCreated (
    uint256 indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  /// @notice Returns the listing price for listing an item on the marketplace
  /// @dev 0.01 ether is a personal choice and could be something else
  /// @return uint256 The listing price
  function getListingPrice() public view returns(uint256) {
    return listingPrice;
  }

  /// @notice Creates an item on the marketplace
  /// @dev transfers the token from owner to the marketplace contract
  /// @param nftContract Address of the NFT contract
  /// @param tokenId Token ID of the NFT
  /// @param price Price of the NFT decided by the seller
  function createMarketItem(
    address nftContract , 
    uint256 tokenId, 
    uint256 price) 
    public payable nonReentrant {
        
    require(price > 0, "Price must be greater than 0");

    require(msg.value == listingPrice, "Price must be equal to listing price");

    uint256 itemId = _itemId.current();

    idToNftItem[itemId] = nftItem(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      false
    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    _itemId.increment();

    emit nftItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      false
    );
  }

  /// @notice Creates an item sale on the marketplace
  /// @dev Transfers the token from the marketplace contract to the buyer
  /// @dev Transfer eth from the buyer to the seller of the token through the marketplace contract  
  /// @param nftContract Address of the NFT contract
  /// @param itemId ID of the item to be sold
  function createItemSale(
    address nftContract, 
    uint256 itemId
    ) public payable nonReentrant {
    uint256 tokenId = idToNftItem[itemId].tokenId;
    uint256 price = idToNftItem[itemId].price;

    require(msg.value == price, "Please submit the asked price in order to complete the purchase");

    (bool success, ) = idToNftItem[itemId].seller.call{value: msg.value}("");
    require(success, "Transfer failed");

    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

    idToNftItem[itemId].owner = payable(msg.sender);

    idToNftItem[itemId].sold = true;
    _itemSold.increment();

    payable(owner).transfer(listingPrice);
  }

  function resellNftItem(address nftContract, uint256 tokenId, uint256 price) public payable {
    require(idToNftItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    idToNftItem[tokenId].sold = false;
    idToNftItem[tokenId].price = price;
    idToNftItem[tokenId].seller = payable(msg.sender);
    idToNftItem[tokenId].owner = payable(address(this));
    _itemSold.decrement();

    Item(nftContract).transferItem(msg.sender, address(this), tokenId);
  }

  /// @notice Returns the details of all the unsold marketplace items
  /// @return nftItem[] All the unsold marketplace items

  function fetchNftItems() public view returns(nftItem[] memory) {
    uint256 itemCount = _itemId.current();
    uint256 unsoldItemCount = _itemId.current() - _itemSold.current();
    uint256 currentIndex = 0;

    nftItem[] memory items = new nftItem[](unsoldItemCount);
      
    for(uint256 i = 0; i < itemCount; i++) {
      if (idToNftItem[i].owner == address(0)) {
        uint256 currentId = i;
        nftItem storage currentItem = idToNftItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    
    return items;
  }

  /// @notice Returns the details of the unSold marketplace items by ItemId
  /// @param itemId ID of the item to be fetched
  /// @return nftItem The unsold marketplace item
  function fetchNftItemById(uint256 itemId) public view returns(nftItem memory) {
    return idToNftItem[itemId];
  }

  /// @notice Returns the details of the marketplace items owned by the owner
  /// @return nftItem[] All the marketplace items owned by the owner
  function fetchMyNftItems() public view returns(nftItem[] memory) {
    uint totalItemCount = _itemId.current();
    uint itemCount = 0;
    uint currentIndex = 0;
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToNftItem[i].owner == msg.sender) {
          itemCount += 1;
      }
    }
    
    nftItem[] memory items = new nftItem[](itemCount);
    
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToNftItem[i].owner == msg.sender) {
        uint currentId = i;
        nftItem storage currentItem = idToNftItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    
    return items;
  }

  /// @notice Returns only items a user has created 
  /// @return nftItem[] All the items created by the owner
  function fetchNftItemsCreated() public view returns (nftItem[] memory) {
    uint totalItemCount = _itemId.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToNftItem[i].seller == msg.sender) {
        itemCount += 1;
      }
    }

    nftItem[] memory items = new nftItem[](itemCount);
    
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToNftItem[i].seller == msg.sender) {
        uint currentId = i;
        nftItem storage currentItem = idToNftItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  ///@dev receive() and fallback() functions to allow the contract to receive ETH and data  
  receive() external payable {}

  fallback() external payable {}
  
}