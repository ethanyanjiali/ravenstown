pragma solidity ^0.4.17;

contract Raven {
    address contractCreator;
    uint messageMaxLength;
    uint currentSequence;
    mapping(bytes32 => uint32) replyCount; 

    function Raven() public {
        contractCreator = msg.sender;
        messageMaxLength = 280;
    }

    event Message(
        string text, 
        address indexed sender, 
        bytes32 indexed topic, 
        bytes32 indexed replyTo,
        uint timestamp,
        uint sequence
    );

    function setMessageMaxLength(uint newLength) public returns (bool success) {
        assert(contractCreator == msg.sender);
        messageMaxLength = newLength;
        return true;
    }
    
    function sendMessage(string text, bytes32 topic, bytes32 replyTo) public {
        require(bytes(text).length <= messageMaxLength && bytes(text).length > 0);
        if (replyTo != "0x0") {
            assert(replyCount[replyTo] < replyCount[replyTo] + 1);
            replyCount[replyTo] = replyCount[replyTo] + 1;
        }
        assert(currentSequence < currentSequence + 1);
        currentSequence = currentSequence + 1;
        return Message(text, msg.sender, topic, replyTo, now, currentSequence);
    }

    function getMessageMaxLength() constant public returns(uint length) {
        return messageMaxLength;
    }

    function getReplyCount(bytes32 txHash) constant public returns(uint count) {
        return replyCount[txHash]; 
    }
}