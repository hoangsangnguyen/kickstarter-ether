pragma solidity ^0.4.17;

contract UserFactory {
    
    struct User{
        string email;
        string userName;
        bytes32 password;
        address walletAddress;
    }
    
    User[] private users;
    
    function createUser(string email, string userName, string password, address walletAddress) public {
        User memory newUser = User({
            email : email,
            userName : userName,
            password :  keccak256(password),
            walletAddress : walletAddress
        });
        
        users.push(newUser);
    }
    
    function login(string email, string password) constant returns(string userName, address walletAddress) {
        for (uint i = 0; i < users.length; i++) {
            User storage user = users[i];
            if (compareStrings(user.email, email) && comparePassword(user.password, password)) {
                return (user.userName, user.walletAddress);
            }
        }
        
        return ("", 0);
    }
    
    function getTotalBackers() constant returns(uint totalBackers) {
        return users.length;    
    }

    function compareStrings (string a, string b)  private view returns (bool){
       return keccak256(a) == keccak256(b);
    }
    
    function comparePassword (bytes32 a, string b)  private view returns (bool){
       return a == keccak256(b);
    }
  
}


contract CampaignFactory {
    mapping(string => address[]) deployedCampaigns;
    uint public campaignsCount;
    address[] public campaignsAddress;

    function createCampaign(string title, string category, uint minimum, string description, string imageFile, string videoFile,
        uint goal, string investmentDescription) public {
        address newCampaign = new Campaign(msg.sender, title, category, minimum, description, imageFile, videoFile, goal, investmentDescription);
        deployedCampaigns[category].push(newCampaign);
        campaignsAddress.push(newCampaign);
        campaignsCount++;
    }
    
    function getDeployedCampaign(string category) public view returns (address[]) {
        return deployedCampaigns[category];
    }

}

contract Campaign {
    
    struct Request {
        string requestDescription;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
  
    address public mManager;
    string public mTitle;
    string public mDescription;
    string public mImageFile;
    string public mVideoFile;    
    string public mCategory;
    uint public mMinimumContribution;
    uint public mGoal;
    uint public mBacked;
    string public mInvestmentDescription;
    

    Request[] public mRequests;
    
    mapping(address => uint) public mInvestors;
    uint public mInvestorsCount;
    
    modifier restricted(){
        require(msg.sender == mManager);
        _;
    }
    
    modifier isContributor(){
        require(mInvestors[msg.sender] != 0);
        _;
    }
    
    constructor(address creator, string title, string category, uint minimum, string description, string imageFile, string videoFile, uint goal, string investmentDescription) public {
        mManager = creator;
        mTitle = title;
        mCategory = category;
        mMinimumContribution = minimum;
        mDescription = description;
        mImageFile = imageFile;
        mVideoFile = videoFile;
        mGoal = goal;
        mInvestmentDescription = investmentDescription;
  
    }
    
    function contribute() public payable {
        require(msg.value > mMinimumContribution);
        
        if(mInvestors[msg.sender] != 0) {
            mInvestors[msg.sender] += msg.value;
        } else {
            mInvestors[msg.sender] = msg.value;
            mInvestorsCount++;
        }

        mBacked += msg.value;
        
    }
    
    function updateInvestmentDetail (string investmentDescription) public restricted {
        mInvestmentDescription = investmentDescription;
    }
    
    function createRequest(string requestDescription, uint value, address recipient) public payable restricted {
        Request memory newRequest = Request({
           requestDescription : requestDescription,
           value : value,
           recipient : recipient,
           complete : false,
           approvalCount : 0
        });
        
        mRequests.push(newRequest);
        
    }
    
    function approveRequest(uint index) public isContributor{
        Request storage request = mRequests[index];
        
        require(mInvestors[msg.sender] != 0);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
        
        
    }
    
    function finalizeRequest(uint index) public payable restricted {
        Request storage request = mRequests[index];
        
        require(request.approvalCount > (mInvestorsCount/2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }

    function getCampaignInfo() constant public returns (address manager,
                                string title, string description,
                                string videoFile, uint minimumContribution,
                                uint goal, string investmentDescription, uint backed,
                                uint investorCount){
        return (
            mManager,
            mTitle, 
            mDescription,
            mVideoFile,
            mMinimumContribution,
            mGoal,
            mInvestmentDescription,
            mBacked,
            mInvestorsCount
        );
    }
    
    function getRequestsCount() constant public isContributor returns(uint requestCount) {
        return mRequests.length;
    }

    function isFunded() constant public returns(bool) {
        return mBacked >= mGoal;
    }
  
}

