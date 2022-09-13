# Blockchain eCommerce Website - BlockBuy

## Table of Contents:
  - [Deployed Website url](#deployed-website-url)
  - [Project Description](#project-description)
  - [Workflow](#workflow)
  - [Related docs](#related-docs)
  - [Directory structure](#directory-structure)
  - [Clone, Install and Build steps](#clone-install-and-build-steps)
    - [Prerequisites](#prerequisites)
    - [Cloning and installing dependencies](#cloning-and-installing-dependencies)
    - [Testing Contracts](#testing-contracts)
    - [Running the frontend](#running-the-frontend)
    - [Deploying and running against a local instance](#deploying-and-running-against-a-local-instance)
    - [Environment variables (not needed for running project locally)](#environment-variables-not-needed-for-running-project-locally)

## Deployed Website url

https://block-buy-ecommerce.vercel.app/

## Project Description

**BlockBuy** is a blockchain based eCommerce Marketplace where the users can trade items in a trustless and secure way. With blockchain-driven technology, you will not need any third-party influence for transactions. You can have accurate, faster, and transparent transactions with a complete record stored for future use.

## Workflow

1. Enter the dApp and connect the wallet to rinkeby network.
2. After entering the dApp the user can:
    1. **Buy Item**
        - Go to the **Explore** page and click on the item which user want to buy.
        - User will be redirected to the **BuyNFT** page which shows the price and other details about the item.
        - Click on the **Buy** button to buy the item.
        - Metamask pops up and asks to confirm the transaction for the price of the item.
        - After the transaction is successfully processed user is redirected to the **Profile** page.
        - The bought item is displayed under the **My Items** section
    2. **Create Item**
        - Go to the **Create** page and enter the name, price and description, then click on the **Submit** button.
        - Metamask pops up and asks to confirm the transaction for the creating the Item on blockchain.
        - After the transaction is successfully processed another transaction will pop up for listing the Item on the Marketplace.
        - After the listing transaction is successful user will be redirected to **Explore** page.
    3. **Sell Item**
        - Go to the **Profile** page and click on the item you want to sell.
        - User will be redirected to the **SellNFT** page where user can enter the price for the item.
        - After entering the desired price, click on the **Sell** button to list the item in the market place.
        - Metamask pops up and asks to confirm the transaction for the listing price.
        - After the transaction is successfully processed user is redirected to the **Explore** page.
        - The item will be listed in the marketplace to be bought for the price entered by the user.

## Related docs

-   [deployed_address.txt](https://github.com/AbhinavXT/BlockBuy-Ecommerce/blob/main/deployed_address.txt)
-   [design_pattern_decisions.md](https://github.com/AbhinavXT/BlockBuy-Ecommerce/blob/main/design_pattern_decisions.md)
-   [avoiding_common_attacks.md](https://github.com/AbhinavXT/BlockBuy-Ecommerce/blob/main/avoiding_common_attacks.md)

## Directory structure

```
BlockBuy
 ┣ client
 ┃ ┣ components
 ┃ ┃ ┣ Footer.jsx
 ┃ ┃ ┣ Hero.jsx
 ┃ ┃ ┣ Info.jsx
 ┃ ┃ ┣ ItemCarousel.jsx
 ┃ ┃ ┣ Layout.jsx
 ┃ ┃ ┗ Navbar.jsx
 ┃ ┣ pages
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ hello.ts
 ┃ ┃ ┣ _app.jsx
 ┃ ┃ ┣ buynft.jsx
 ┃ ┃ ┣ create.jsx
 ┃ ┃ ┣ explore.jsx
 ┃ ┃ ┣ index.jsx
 ┃ ┃ ┣ profile.jsx
 ┃ ┃ ┗ sellnft.jsx
 ┃ ┣ public
 ┃ ┃ ┣ assets
 ┃ ┃ ┃ ┣ phone.png
 ┃ ┃ ┃ ┣ shirt.png
 ┃ ┃ ┃ ┗ shoes.png
 ┃ ┃ ┣ favicon.ico
 ┃ ┃ ┗ vercel.svg
 ┃ ┣ styles
 ┃ ┃ ┗ globals.css
 ┃ ┣ utils
 ┃ ┃ ┣ Item.json
 ┃ ┃ ┣ Market.json
 ┃ ┃ ┗ networks.js
 ┃ ┣ README.md
 ┃ ┣ config.js
 ┃ ┣ next-env.d.ts
 ┃ ┣ next.config.js
 ┃ ┣ package-lock.json
 ┃ ┣ package.json
 ┃ ┣ postcss.config.js
 ┃ ┣ prettier.config.js
 ┃ ┣ tailwind.config.js
 ┃ ┗ tsconfig.json
 ┣ contracts
 ┃ ┣ libraries
 ┃ ┃ ┗ Base64.sol
 ┃ ┣ Item.sol
 ┃ ┗ Market.sol
 ┣ scripts
 ┃ ┗ deploy.js
 ┣ test
 ┃ ┗ test.js
 ┣ README.md
 ┣ avoiding_common_attacks.md
 ┣ deployed_address.txt
 ┣ design_pattern_decisions.md
 ┣ hardhat.config.js
 ┣ package-lock.json
 ┗ package.json
```

## Clone, Install and Build steps

### Prerequisites

1. [Git](https://git-scm.com/)
2. [Node JS](https://nodejs.org/en/) (everything was installed and tested under v15.12.0)
3. A Browser with the [MetaMask extension](https://metamask.io/) installed.
4. Test Ether on the Rinkeby network.

<br>

### Cloning and installing dependencies

1. Clone the project repository on your local machine

```
 git clone https://github.com/AbhinavXT/BlockBuy-Ecommerce.git

 cd BlockBuy-Ecommerce
```

2. Installing dependencies

-   For contracts -
    ```
    npm install
    ```
-   For client -
    ```
    cd client
    npm install
    ```

### Testing Contracts

For testing contracts run command:

```
npx hardhat test
```

### Running the frontend

For running frontend locally run command:

```
cd client
npm run dev
```

### Deploying and running against a local instance

1. For deploying and running the dApp against a local instance run commands:

```
npx hardhat node
```

2. This should create a local network with 19 accounts. Keep it running, and in another terminal run:

```
npx hardhat run scripts/deploy.js --network localhost
```

3. When the deployment is complete, the CLI should print out the addresses of the contracts that were deployed:

```
Market contract deployed to: 'Market contract address'

item contract deployed to: 'Item contract address'
```

1. Copy these addresses and paste them in the [**config.js**](https://github.com/AbhinavXT/BlockBuy-Ecommerce/blob/main/client/config.js) file inside the client floder, in place of current addresses.

```
export const itemMarketAddress = 'Market contract address'

export const itemContractAddress = 'Item contract address'
```

5. For importing account to metamask

    1. Import account using private key from one of the accounts that were logged on running `npx hardhat node`
    2. Create a custom network (if not already there) pointing to http://127.0.0.1:8545 with **chainId 1337**
    3. Switch to this network and connect it to the dApp and reload it.
    4. For better testing of the transfer of tokens and transactions import at least 2 accounts\*\_

6. Now run the frontend locally in another terminal using command:

```
cd client
npm run dev
```

After this you can run and test the dApp locally in your web browser.

### Environment variables 

```
// in root folder
ALCHEMY_MUMBAI_URL =
ACCOUNT_KEY =

// inside client folder
NEXT_PUBLIC_ALCHEMY_MUMBAI_URL = 
NEXT_PUBLIC_INFURA_ID = 
NEXT_PUBLIC_INFURA_KEY = 
```
