pragma solidity ^0.7.4;

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
    
    constructor(Admins adminContract) public {
        adminContractAddress = adminContract;
    }
    
    function createHospitalContract(address accountAddress) public  restricted {
        address newHospitalContract = address(new Hospital(accountAddress));
        deployedHospitals.push(newHospitalContract);
        hospitalAt[newHospitalContract] = deployedHospitals.length;
    }
    
    function getDeployedHospitals() public  view  returns(address[] memory){
        return deployedHospitals;
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











contract DonationSyatem{
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
    
    function createUserContact() public {
        address newUserContract = address (new User(msg.sender , adminContractAddress , approversContractAddress , hospitalsContractAddress));
        delpoyedUsers.push(newUserContract);
        // getUserContract[email] = newUserContract;
        
    }
    
    function getDeployedUsers() public view  returns(address[] memory){
        return delpoyedUsers;
    }
    
}


contract Hospital{
    
    address accountAddress;
    
    string public name;
    string public location;
    string public email;
    uint public phone;
    
    
    address[] public requestsArray;
    mapping(address=>bool) public requestStatus;
    
    
    constructor(address accAddress) public {
        accountAddress = accAddress;
    }
    
    
    function addRequest(address requestAddress) public {
        requestStatus[requestAddress] = false;
    }
    
    function changeStatustoTrue(address requestAddress) public {
        requestStatus[requestAddress] = true;
    }
    
}







contract User{
    address public userAddress;
    address[] public requestsArray;
    
    
    string public name;
    string public email;
    uint private aadhaar;
    uint private phone;
    bool isActive;
    

    mapping(address => bool) public isRequestActive;
    
    Admins adminContractAddress;
    Approvers approversContractAddress;
    Hospitals hospitalsContractAddress;
    
    constructor(address userAdd,  Admins adminContract, Approvers approversContract ,  Hospitals hospitalsContract/*, string userName, string mail, uint aadh, uint ph*/) public{
        
        adminContractAddress = adminContract;
        approversContractAddress = approversContract;
        hospitalsContractAddress = hospitalsContract;
        userAddress = userAdd;
        
        // name = userName;
        // email = mail;
        // aadhaar = aadh;
        // phone = ph;
    }
    
    
    
    function createRequest() public{
        require(msg.sender == userAddress);
        address newRequest =  address (new Request(msg.sender , adminContractAddress , approversContractAddress , (this)));
        requestsArray.push(newRequest);
        isRequestActive[newRequest] = false;
       
    }
    
    function getRequests() public view  returns(address[] memory){
        return requestsArray;
    }
    
    function updateStatusActive(address add) public{
        isActive = true;
        isRequestActive[add] = true;
    }
    
    function updateStatusDeactive(address add) public {
        isRequestActive[add] = false;
        
        // stil  we need to find better solution for this 
        
        bool flag;
        for(uint i=0 ; i<requestsArray.length ; i++){
            if(isRequestActive[requestsArray[i]] == true){
                flag = true;
                break;
            }
        }
        isActive = flag;
    }
    
}

contract Request{
    
    // Date and time for register , approve and complete
   
    address public userAccountAddress;
    address public hospitalAddress;
    address public approvedBy;
    address public completedBy;
    address[] public doners;
    
    mapping(address => string) public donersName;
    mapping(address => uint) public getDonationAmount;
    
    string public name;
    string public email;
    string category;
    uint private aadhaar;
    uint private phone;
    uint public donationValue;
    
    bool public isApproved;
    bool public isComplete;
    bool public isActive;
    
    Admins adminContractAddress;
    Approvers approversContractAddress;
    User userContractAddress;
    
    constructor(address userAdd,  Admins adminContract, Approvers approversContract, User userContract /*, string userName, string mail, uint aadh, uint ph, uint donation, address HAddress*/) public{
        adminContractAddress = adminContract;
        approversContractAddress = approversContract;
        userContractAddress = userContract;
        userAccountAddress = userAdd;
        
        // name = userName;
        // email = mail;
        // aadhaar = aadh;
        // phone = ph;
        // donationValue = donation;
        // hospitalAddress = HAddress;
    }
    
    
    function approveRequest() public restricted {
        
        userContractAddress.updateStatusActive(address(this));
        approvedBy = msg.sender;
        isApproved = true;
        isActive = true;
        
    }
    
    function completeRequest() public restricted {
        userContractAddress.updateStatusDeactive(address(this));
        completedBy = msg.sender;
        isComplete = true;
        isActive = false;
    }
    
    
    function donate(/*string name*/) public payable{
        require(msg.value > 0.00002 ether); // we need to discuss about this
        
        doners.push(msg.sender);
        getDonationAmount[msg.sender]= msg.value;
        // donersName[msg.sender] = name;
    }
     
    function getDoners() public view   returns(address[] memory){
        return doners;
    }
    
    
    modifier restricted(){
        require(adminContractAddress.isAdmin(msg.sender) || approversContractAddress.isApprover(msg.sender) );
        _;
    }
    
}