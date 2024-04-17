<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Employee</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>

<body>
    <div class="container mt-5">
        <h1>Update Employee</h1>
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

        // Retrieve employee SSN from query parameter
        $SSN = $_GET['SSN'];

        // Retrieve employee details from database
        $sql = "SELECT * FROM Employee WHERE SSN = '$SSN'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
        ?>
            <form method="POST" action="update_process.php">
                <input type="hidden" name="SSN" value="<?php echo $row['SSN']; ?>">
                <div class="mb-3">
                    <label for="dob" class="form-label">Date of Birth</label>
                    <input type="date" class="form-control" id="dob" name="dob" value="<?php echo $row['dob']; ?>">
                </div>
                <div class="mb-3">
                    <label for="Fname" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="Fname" name="Fname" value="<?php echo $row['Fname']; ?>">
                </div>
                <div class="mb-3">
                    <label for="minit" class="form-label">Middle Initial</label>
                    <input type="text" class="form-control" id="minit" name="minit" value="<?php echo $row['minit']; ?>">
                </div>
                <div class="mb-3">
                    <label for="Lname" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="Lname" name="Lname" value="<?php echo $row['Lname']; ?>">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" name="address" value="<?php echo $row['address']; ?>">
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        <?php
        } else {
            echo "Employee not found.";
        }

        $conn->close();
        ?>
    </div>
</body>

</html>