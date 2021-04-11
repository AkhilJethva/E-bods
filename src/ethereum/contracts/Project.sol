pragma solidity >=0.7.4;

// to Do
    // 1 -> make Admin,Approvers contract Updatable
    
contract Admins {
    address[] public adminsArray;
    mapping(address => bool) public adminsMap;
    mapping(address => uint) public adminAt;


    constructor() public {
        adminsArray.push(msg.sender);
        adminsMap[msg.sender]= true;
    }
    
    function getAdmins() public view  restricted returns(address[] memory){
        return adminsArray;
    }
    
    function addAdmin(address add) public restricted {
        adminsArray.push(add);
        adminsMap[add]= true;
        adminAt[add] = adminsArray.length;
    }

    function isAdmin(address add) public view returns (bool) {
        return  adminsMap[add];
    }
    
    function removeAdmin(address add) public restricted {
        require(adminsArray.length != 0);
        
        uint index = adminAt[add];
        uint AI = index-1;
        
        require( index != 0 );
        
        if(AI != (adminsArray.length -1) )
        {
            adminAt[adminsArray[adminsArray.length -1]] = index;
            adminsArray[AI] = adminsArray[adminsArray.length -1];
        }
        
        delete adminsArray[adminsArray.length -1];
        adminsArray.pop();
        adminAt[add] = 0;
        
    }
    
    modifier restricted(){
        require(adminsMap[msg.sender]);
        _;
    }
}




contract Approvers {
    address[] public approversArray;
    mapping(address => bool) public approversMap;
    mapping(address => uint) public approverAt;
    Admins adminContractAddress;
    
    constructor(Admins adminContract) public {
        adminContractAddress = adminContract;
    }

    function getAprrovers() public restricted  view returns(address[] memory){
        
        return approversArray;
    }
    
    function isApprover(address add) public view returns (bool) {
        return  approversMap[add];
    }
    
    function addApprover( address approverAddress) public restricted{
        
        approversArray.push(approverAddress);
        approversMap[approverAddress]= true;
        approverAt[approverAddress] = approversArray.length;
    }

    function removeApprover(address add) public restricted {
        require(approversArray.length != 0);
        
        uint index = approverAt[add];
        uint AI = index-1;
        
        require( index != 0 );
        
        if(AI != (approversArray.length -1) )
        {
            approverAt[approversArray[approversArray.length -1]] = index;
            approversArray[AI] = approversArray[approversArray.length -1];
        }
        
        delete approversArray[approversArray.length -1];
        approversArray.pop();
        approverAt[add] = 0;
        
    }
    
    modifier restricted(){
        require(adminContractAddress.isAdmin(msg.sender));
        _;
    }
}


contract Hospitals{
    
    address[]  public  deployedHospitals;
    mapping(address => uint) hospitalAt;
    
    Admins adminContractAddress;
    Approvers approversContractAddress;
    mapping(address => string) hospitalsName;
    constructor(Admins adminContract, Approvers approversContract) public {
        adminContractAddress = adminContract;
        approversContractAddress = approversContract;
    }
    
    // function createHospitalContract(address accountAddress) public  restricted {
    //     address newHospitalContract = address(new Hospital(accountAddress));
    //     deployedHospitals.push(newHospitalContract);
    //     hospitalAt[newHospitalContract] = deployedHospitals.length;
    // }
    function createHospitalContract(address accountAddress, string memory name, string memory email, string memory location, uint ph) public  restricted returns (address ) {
        address newHospitalContract = address( new Hospital(adminContractAddress, approversContractAddress,accountAddress , name , email , location , ph ));
        deployedHospitals.push(newHospitalContract);
        hospitalAt[newHospitalContract] = deployedHospitals.length;
        hospitalsName[newHospitalContract] = name;
        return newHospitalContract;
    }
    function getDeployedHospitals() public  view  returns (address[] memory){
        return deployedHospitals;
    }
    
    function getNameByAddress(address add) public view returns (string memory) {
        return  hospitalsName[add];
    }
    
    
    function removeHospital(address hospitalContarctAddress) public restricted{
        
        require(deployedHospitals.length != 0);
        
        uint index = hospitalAt[hospitalContarctAddress];
        uint AI = index-1;
        
        require( index != 0 );
        
        if(AI != (deployedHospitals.length -1) )
        {
            hospitalAt[deployedHospitals[deployedHospitals.length -1]] = index;
            deployedHospitals[AI] = deployedHospitals[deployedHospitals.length -1];
        }
        
        delete deployedHospitals[deployedHospitals.length -1];
        deployedHospitals.pop();
        hospitalAt[hospitalContarctAddress] = 0;
        
    }
    
    modifier restricted(){
        require(adminContractAddress.isAdmin(msg.sender));
        _;
    }
}


contract DonationSystem{
    address[] public delpoyedUsers;
    mapping(string => address) getUserContract;
    
    
    Admins adminContractAddress;
    Approvers approversContractAddress;
    Hospitals hospitalsContractAddress;
    
    constructor(Admins adminContract, Approvers approversContract, Hospitals hospitalsContract) public {
        adminContractAddress = adminContract;
        approversContractAddress = approversContract;
        hospitalsContractAddress = hospitalsContract;
    }
    
    function createUserContact(string memory userName , string memory userEmail , uint aadh , uint ph) public {
        require(getUserContract[userEmail] == address(0));
        address newUserContract = address (new User(msg.sender , adminContractAddress , approversContractAddress , hospitalsContractAddress , userName , userEmail, aadh , ph));
        delpoyedUsers.push(newUserContract);
        getUserContract[userEmail] = newUserContract;
    }
    
    function getDeployedUsers() public view  returns(address[] memory){
        return delpoyedUsers;
    }

    function getUserContractAddress(string memory email) public view returns (address) {
        return  getUserContract[email];
    }
    
}


contract Hospital{
    
    address public ownerAddress;
    
    string public hospitalName;
    string public hospitalLocation;
    string public hospitalEmail;
    uint public hospitalPhone;
    bool public  testing = false;
    
    
    address[] public requestsArray;
    mapping(address=>bool) public requestStatus;
    
    Admins adminContractAddress;
    Approvers approversContractAddress;
    
    
    constructor(Admins adminContract, Approvers approversContract, address accAddress, string memory name, string memory email, string memory location, uint ph) public {
        ownerAddress = accAddress;
        hospitalName = name;
        hospitalPhone = ph;
        hospitalEmail = email;
        hospitalLocation = location;
        adminContractAddress = adminContract;
        approversContractAddress = approversContract;
    }
    
    
    function addRequest(address requestAddress) public   {
        requestStatus[requestAddress] = false;
        requestsArray.push(requestAddress);
        testing = true;
    }
    
    function changeStatustoTrue(address requestAddress)  public   {
        requestStatus[requestAddress] = true;
    }
    
    function getAllRequests() public  view  returns(address[] memory){
        return requestsArray;
    }
    
    function getrequestStatus(address add) public view returns (bool) {
        return  requestStatus[add];
    }
    
    function getCurrentBalance() public view returns (uint) {
        return  address(this).balance;
    }
    
    function transferBalanceToOwner() public restricted  {
        
        payable(ownerAddress).transfer(address(this).balance);
        
    }
    
    fallback() external payable  { }
    
    modifier restricted(){
        require(adminContractAddress.isAdmin(msg.sender) || approversContractAddress.isApprover(msg.sender)  || msg.sender == ownerAddress );
        _;
    }
    
    
}



contract User{
    address public userAddress;
    address[] public requestsArray;
    address public lastAddedRequest;
    
    string public name;
    string public email;
    uint private aadhaar;
    uint private phone;
    bool isActive;
    
    mapping(address => bool) public isRequestActive;
    
    address[] public activeRequets;
    mapping(address => uint) public activeRequestAt;
    
    Admins adminContractAddress;
    Approvers approversContractAddress;
    Hospitals hospitalsContractAddress;
    
    constructor(address userAdd,  Admins adminContract, Approvers approversContract ,  Hospitals hospitalsContract, string memory  userName, string memory userEmail, uint  aadh, uint ph) public{
        
        adminContractAddress = adminContract;
        approversContractAddress = approversContract;
        hospitalsContractAddress = hospitalsContract;
        userAddress = userAdd;
        
        name = userName;
        email = userEmail;
        aadhaar = aadh;
        phone = ph;
    }
    
    
    
    // function createRequest(string memory userName , string memory userEmail , uint aadh, uint ph, uint donation, address HAddress ) public{
    //     require(msg.sender == userAddress);
    //     address newRequest =  address (new Request(msg.sender , adminContractAddress , approversContractAddress , (this) , userName, userEmail, aadh, ph, donation, HAddress));
    //     requestsArray.push(newRequest);
    //     isRequestActive[newRequest] = false;

    // }
    function createRequest(/*Hospital  HAddress ,*/  address hOwner, uint donation , string memory title , string memory timestamp) public returns (address){
        require(msg.sender == userAddress);
        address newRequest =  address (new Request(msg.sender , adminContractAddress , approversContractAddress , (this) , title ,name , email , aadhaar, phone , donation, /*HAddress*/  hOwner));
        requestsArray.push(newRequest);
        isRequestActive[newRequest] = false;
        lastAddedRequest = newRequest;
        return newRequest;
    }
    
    function getRequests() public view  returns(address[] memory){
        return requestsArray;
    }

    function getActiveRequests() public view  returns(address[] memory){
        return activeRequets;
    }
    
    function getLastAddedRequest() public view  returns(address){
        return lastAddedRequest;
    }
    
    function updateStatusActive(address add) public{
        isActive = true;
        isRequestActive[add] = true;
        
        activeRequets.push(add);
        activeRequestAt[add] = activeRequets.length;
    }
    
    function updateStatusDeactive(address add) public {
        isRequestActive[add] = false;
        
        require(activeRequets.length != 0);
        
        uint index = activeRequestAt[add];
        uint AI = index-1;
        
        
        
        require( index != 0 );
        
        if(AI != (activeRequets.length -1) )
        {
            activeRequestAt[activeRequets[activeRequets.length -1]] = index;
            activeRequets[AI] = activeRequets[activeRequets.length -1];
        }
        
        delete activeRequets[activeRequets.length -1];
        activeRequets.pop();
        activeRequestAt[add] = 0;
        
        
        if(activeRequets.length == 0){
            isActive = false;
        }
        else{
            isActive = true;
        }
    }
    
}

contract Request{
    // Date and time for register , approve and complete    // keep this comment
    
    address public userAccountAddress;
    Hospital public hospitalAddress;
    address public hospitalOwnerAddress;
    address public approvedBy;
    address public completedBy;
    address[] public doners;
    struct donerInfo{
        string name;
        uint donatedAmount;
    }
    
    // mapping(address => string) public donersName;
    // mapping(address => uint) public getDonationAmount;
    mapping(address => donerInfo) public donerInformation;
    
    string public name;
    string public email;
    string category;
    uint private aadhaar;
    uint private phone;
    uint public donationValue;
    string public title;
    string public discription;
    string public timestamp;
    
    bool public isApproved;
    //bool public isComplete;
    bool public isActive;
    
    Admins adminContractAddress;
    Approvers approversContractAddress;
    User userContractAddress;
    
    constructor(
        address userAdd,
        Admins adminContract,
        Approvers approversContract,
        User userContract,
        string memory title,  

        string memory userName,
        string memory mail,
        uint aadh,
        uint ph,
        uint donation,
        // Hospital  HAddress
        address hOwner
        ) public{
        adminContractAddress = adminContract;
        approversContractAddress = approversContract;
        userContractAddress = userContract;
        userAccountAddress = userAdd;
        hospitalOwnerAddress = hOwner;
        
        name = userName;
        email = mail;
        aadhaar = aadh;
        phone = ph;
        donationValue = donation;
        // hospitalAddress = HAddress;
        
        //----------------------------------------------------------------------------------------------------------------------------
        isApproved =false;
        isActive = false;
        //isComplete = false;
    }
    
    
    function approveRequest() public restricted {
        userContractAddress.updateStatusActive(address(this));
        // hospitalAddress.addRequest(address(this));
        approvedBy = msg.sender;
        isApproved = true;
        isActive = true;
        
    }
    
    function completeRequest() public restricted payable {
        
        userContractAddress.updateStatusDeactive(address(this));
        // hospitalAddress.changeStatustoTrue(address(this));
        payable(address(hospitalOwnerAddress)).transfer(address(this).balance);
        completedBy = msg.sender;
        isActive = false;
        
        
        
        //isComplete = true;
        // address payable  t = address(hospitalAddress);
        // address(hospitalAddress).send(20);
    }
    
    
    function donate(string memory name) public payable{
        
        // this.balance    keep this comment 
    
        require(msg.value > 0.00002 ether); // we need to discuss about this
        doners.push(msg.sender);
        donerInfo memory info;
        info.name = name;
        info.donatedAmount = msg.value;
        donerInformation[msg.sender] = info;
        
        
        // getDonationAmount[msg.sender]= msg.value;
        // donersName[msg.sender] = name;
    }

    function getDoners() public view   returns(address[] memory){
        return doners;
    }
    
    function getDonerInfo(address donerAddress) public view   returns(string memory , uint){
        donerInfo memory info = donerInformation[donerAddress];
        return ( info.name, info.donatedAmount);
    }
    
    function getCurrentBalance() public view returns (uint) {
        return  address(this).balance;
    }
    
    
    
    
    modifier restricted(){
        require(adminContractAddress.isAdmin(msg.sender) || approversContractAddress.isApprover(msg.sender) );
        _;
    }
    
}







