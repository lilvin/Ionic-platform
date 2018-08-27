<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

    $mysql_host = "localhost:3306";
	$mysql_database = "recipe";
	$mysql_user = "root";
	$mysql_password = "";


if(isset($_GET["n"]) && isset($_GET["un"])&& isset($_GET["ps"])&& isset($_GET["ph"])&& isset($_GET["add"])&& isset($_GET["pin"]) ){
	
	if( !empty($_GET["n"])  && !empty($_GET["un"])&& !empty($_GET["ps"])&& !empty($_GET["ph"])&& !empty($_GET["add"])&& !empty($_GET["pin"])  ){
	
		$conn = new mysqli($mysql_host, $mysql_user, $mysql_password,$mysql_database);

		if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
            } 
		
		$name=$_GET["n"];
		$username=$_GET["un"];
		
		$password=$_GET["ps"];
		$password=md5($password);
		
		$phone=$_GET["ph"];
		$address=$_GET["add"];
		$pincode=$_GET["pin"];
		
		// To protect MySQL injection for Security purpose
		$name = stripslashes($name);
		$username = stripslashes($username);
		$password = stripslashes($password);
		$phone = stripslashes($phone);
		$address = stripslashes($address);
		$pincode = stripslashes($pincode);
		
		$name = mysql_real_escape_string($name);
		$username = mysql_real_escape_string($username);
		$password = mysql_real_escape_string($password);
		$phone = mysql_real_escape_string($phone);
		$address = mysql_real_escape_string($address);
		$pincode = mysql_real_escape_string($pincode);
		
		$check="SELECT * FROM users WHERE u_id = '$username'";
		$rs = mysqli_query($conn,$check);
		$data = mysqli_fetch_array($rs, MYSQLI_NUM);
		
		// check if the user already exists.
		if($data[0] > 1) {
			$outp='{"result":{"created": "0" , "exists": "1" }';
		}
		else{	
			$sql = "INSERT INTO users VALUES ('$name', '$username', '$password', '$phone','$address' ,'$pincode',1 )";		
			if ($conn->query($sql) === TRUE) {
				$outp='{"result":{"created": "1", "exists": 0" }';
			} 
		}
		
		// created= 1 means the account is created.
		// exists =1 means the account already exists.
		
		echo $outp;
		
		$conn->close();	
	}
}
?>