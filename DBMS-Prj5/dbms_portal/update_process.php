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

// Check if data was posted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $SSN = $_POST['SSN'];
    $dob = $_POST['dob'];
    $Fname = $_POST['Fname'];
    $minit = $_POST['minit'];
    $Lname = $_POST['Lname'];
    $address = $_POST['address'];

    $stmt = $conn->prepare("UPDATE Employee SET dob = ?, Fname = ?, minit = ?, Lname = ?, address = ? WHERE SSN = ?");
    $stmt->bind_param("ssssss", $dob, $Fname, $minit, $Lname, $address, $SSN);

    // Execute the statement
    if ($stmt->execute()) {
        header("Location: dbms-portal.php");
        exit();
    } else {
        echo "Error updating record: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "No data submitted.";
}

// Close connection
$conn->close();
