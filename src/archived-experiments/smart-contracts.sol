
// "SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";

contract SellTokens {
    IUniswapV2Router02 usi =
        IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);

    function sellDai(uint256 daiQty, address cryptoToken)
        public
        payable
        returns (uint256)
    {
        //address cryptoToken = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;//0x00D811B7d33cECCFcb7435F14cCC274a31CE7F5d//multiDaiKovan;

        uint256 ethAmountDerivable =
            getEstimatedTokenForETH(daiQty, cryptoToken)[0];

        uint256 deadline = now + 300; // using 'now' for convenience, for mainnet pass deadline from frontend!

        usi.swapExactTokensForETH(
            daiQty,
            ethAmountDerivable,
            getPathForTokenToETH(cryptoToken),
            address(this),
            deadline
        );

        return ethAmountDerivable;
    }

    function getEstimatedTokenForETH(uint256 daiQty, address crypto)
        public
        view
        returns (uint256[] memory)
    {
        return usi.getAmountsIn(daiQty, getPathForTokenToETH(crypto));
    }

    function getPathForTokenToETH(address crypto)
        private
        view
        returns (address[] memory)
    {
        address[] memory path = new address[](2);
        path[0] = crypto;
        path[1] = usi.WETH();

        return path;
    }
}
