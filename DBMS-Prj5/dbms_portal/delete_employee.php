<?php
$db_host = 'sql5.freesqldatabase.com';
$db_username = 'sql5699632';
$db_password = 'pZbapRBlz6';
$db_name = 'sql5699632';

// Create connection
$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve employee SSN from the form
$SSN = $_POST['SSN'];

// Prepare SQL statement to delete the employee
$sql = "DELETE FROM Employee WHERE SSN = '$SSN'";

if ($conn->query($sql) === TRUE) {
    header("Location: dbms-portal.php");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
