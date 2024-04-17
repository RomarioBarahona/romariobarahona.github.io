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

// Retrieve form data
$SSN = $_POST['SSN'];
$dob = $_POST['dob'];
$Fname = $_POST['Fname'];
$minit = $_POST['minit'];
$Lname = $_POST['Lname'];
$address = $_POST['address'];

// Prepare SQL statement
$sql = "INSERT INTO Employee (SSN, dob, Fname, minit, Lname, address)
        VALUES ('$SSN', '$dob', '$Fname', '$minit', '$Lname', '$address')";

if ($conn->query($sql) === TRUE) {
    header("Location: dbms-portal.php");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
