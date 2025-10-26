// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MembershipRegistry
 * @notice Records server memberships (called by cross-chain bridge)
 * @dev This contract receives membership updates from other chains via Nexus
 */
contract MembershipRegistry is Ownable {

    // Struct to track membership
    struct Membership {
        bool active;
        uint256 joinedAt;
        uint256 stakedAmount;
        uint256 sourceChainId;
    }

    // Mapping: user => serverId => Membership
    mapping(address => mapping(string => Membership)) public memberships;

    // Mapping: serverId => member count
    mapping(string => uint256) public serverMemberCount;

    // Authorized bridge addresses (Nexus gateway)
    mapping(address => bool) public authorizedBridges;

    // Events
    event MemberAdded(
        address indexed user,
        string serverId,
        uint256 stakedAmount,
        uint256 sourceChainId,
        uint256 timestamp
    );

    event MemberRemoved(
        address indexed user,
        string serverId,
        uint256 timestamp
    );

    event BridgeAuthorized(address indexed bridge, bool status);

    modifier onlyBridge() {
        require(authorizedBridges[msg.sender], "Not authorized bridge");
        _;
    }

    constructor() Ownable(msg.sender) {
        // Owner is initially the only authorized bridge (for testing)
        authorizedBridges[msg.sender] = true;
    }

    /**
     * @notice Add a member (called by bridge/gateway)
     * @param user The user address
     * @param serverId The server ID
     * @param stakedAmount Amount staked on source chain
     * @param sourceChainId The chain where stake originated
     */
    function addMember(
        address user,
        string memory serverId,
        uint256 stakedAmount,
        uint256 sourceChainId
    ) external onlyBridge {
        require(!memberships[user][serverId].active, "Already a member");

        memberships[user][serverId] = Membership({
            active: true,
            joinedAt: block.timestamp,
            stakedAmount: stakedAmount,
            sourceChainId: sourceChainId
        });

        serverMemberCount[serverId]++;

        emit MemberAdded(
            user,
            serverId,
            stakedAmount,
            sourceChainId,
            block.timestamp
        );
    }

    /**
     * @notice Remove a member (called by bridge/gateway)
     * @param user The user address
     * @param serverId The server ID
     */
    function removeMember(
        address user,
        string memory serverId
    ) external onlyBridge {
        require(memberships[user][serverId].active, "Not a member");

        memberships[user][serverId].active = false;
        serverMemberCount[serverId]--;

        emit MemberRemoved(user, serverId, block.timestamp);
    }

    /**
     * @notice Check if user is a member
     * @param user The user address
     * @param serverId The server ID
     * @return True if user is an active member
     */
    function isMember(
        address user,
        string memory serverId
    ) external view returns (bool) {
        return memberships[user][serverId].active;
    }

    /**
     * @notice Get membership details
     * @param user The user address
     * @param serverId The server ID
     * @return Membership struct
     */
    function getMembership(
        address user,
        string memory serverId
    ) external view returns (Membership memory) {
        return memberships[user][serverId];
    }

    /**
     * @notice Authorize a bridge address (owner only)
     * @param bridge The bridge address
     * @param status Authorization status
     */
    function authorizeBridge(address bridge, bool status) external onlyOwner {
        authorizedBridges[bridge] = status;
        emit BridgeAuthorized(bridge, status);
    }
}
