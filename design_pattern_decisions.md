# Design pattern decisions

The following design patterns were implemented in [Item.sol](https://github.com/AbhinavXT/BlockBuy/blob/main/contracts/Item.sol) and [Market.sol](https://github.com/AbhinavXT/BlockBuy/blob/main/contracts/Market.sol) contracts :

## Inter-Contract Execution

-   The **Item** contract intracts with [OpenZepplin ERC721URIStorage](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol) for \_safeMint(), \_setTokenURI() and setApprovalForAll() functions for creating ERC-721 tokens.
-   The **Market** contract intracts with **Item** contract to transfer ERC-721 tokens from the seller to the buyer through the marketplace contract.

## Inheritance and Interfaces

-   The **Item** contract inherites [OpenZepplin Counters library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol) for tracking the tokenId of minted item.
-   The **Item** contract inherites [Base64 library](https://github.com/AbhinavXT/BlockBuy/blob/main/contracts/libraries/Base64.sol) to encode the tokenURI of the minted item.
-   The **Market** contract inherites [OpenZepplin Counters library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol) for tracking the itemId of the created marketplace item.
