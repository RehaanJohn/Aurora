// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CommunityStaking
 * @notice Simple staking contract for server access
 * @dev This contract locks ERC20 tokens to grant server membership
 */
contract CommunityStaking is ReentrancyGuard, Ownable {

    // Struct to track user stakes
    struct Stake {
        uint256 amount;
        uint256 timestamp;
        string serverId;
        bool active;
    }

    // Mapping from user address to their stakes
    mapping(address => Stake[]) public userStakes;

    // Mapping from serverId to total staked
    mapping(string => uint256) public serverTotalStaked;

    // Mapping from user + serverId to membership status
    mapping(address => mapping(string => bool)) public isMember;

    // Token used for staking (e.g., USDT, USDC)
    IERC20 public stakingToken;

    // Minimum stake amount required (in token's smallest unit)
    uint256 public minStakeAmount;

    // Events
    event Staked(
        address indexed user,
        string serverId,
        uint256 amount,
        uint256 timestamp
    );

    event Unstaked(
        address indexed user,
        string serverId,
        uint256 amount,
        uint256 timestamp
    );

    event MembershipGranted(
        address indexed user,
        string serverId,
        uint256 timestamp
    );

    constructor(address _stakingToken, uint256 _minStakeAmount) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
        minStakeAmount = _minStakeAmount;
    }

    /**
     * @notice Stake tokens to join a server
     * @param serverId The ID of the server to join
     * @param amount The amount of tokens to stake
     */
    function stakeToJoin(
        string memory serverId,
        uint256 amount
    ) external nonReentrant {
        require(amount >= minStakeAmount, "Amount below minimum stake");
        require(!isMember[msg.sender][serverId], "Already a member");
        require(
            stakingToken.balanceOf(msg.sender) >= amount,
            "Insufficient balance"
        );

        // Transfer tokens from user to contract
        require(
            stakingToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        // Record the stake
        userStakes[msg.sender].push(Stake({
            amount: amount,
            timestamp: block.timestamp,
            serverId: serverId,
            active: true
        }));

        // Update server total
        serverTotalStaked[serverId] += amount;

        // Grant membership
        isMember[msg.sender][serverId] = true;

        emit Staked(msg.sender, serverId, amount, block.timestamp);
        emit MembershipGranted(msg.sender, serverId, block.timestamp);
    }

    /**
     * @notice Unstake tokens and leave server
     * @param serverId The ID of the server to leave
     * @param stakeIndex The index of the stake to withdraw
     */
    function unstake(
        string memory serverId,
        uint256 stakeIndex
    ) external nonReentrant {
        require(isMember[msg.sender][serverId], "Not a member");
        require(stakeIndex < userStakes[msg.sender].length, "Invalid stake index");

        Stake storage stake = userStakes[msg.sender][stakeIndex];
        require(stake.active, "Stake already withdrawn");
        require(
            keccak256(bytes(stake.serverId)) == keccak256(bytes(serverId)),
            "Server mismatch"
        );

        uint256 amount = stake.amount;

        // Mark stake as inactive
        stake.active = false;

        // Update server total
        serverTotalStaked[serverId] -= amount;

        // Revoke membership
        isMember[msg.sender][serverId] = false;

        // Transfer tokens back to user
        require(
            stakingToken.transfer(msg.sender, amount),
            "Transfer failed"
        );

        emit Unstaked(msg.sender, serverId, amount, block.timestamp);
    }

    /**
     * @notice Get user's stakes
     * @param user The address to query
     * @return Array of stakes
     */
    function getUserStakes(address user) external view returns (Stake[] memory) {
        return userStakes[user];
    }

    /**
     * @notice Check if user is member of server
     * @param user The address to check
     * @param serverId The server ID
     * @return True if user is a member
     */
    function checkMembership(
        address user,
        string memory serverId
    ) external view returns (bool) {
        return isMember[user][serverId];
    }

    /**
     * @notice Update minimum stake amount (owner only)
     * @param _minStakeAmount New minimum stake amount
     */
    function setMinStakeAmount(uint256 _minStakeAmount) external onlyOwner {
        minStakeAmount = _minStakeAmount;
    }

    /**
     * @notice Update staking token (owner only)
     * @param _stakingToken New staking token address
     */
    function setStakingToken(address _stakingToken) external onlyOwner {
        stakingToken = IERC20(_stakingToken);
    }
}
