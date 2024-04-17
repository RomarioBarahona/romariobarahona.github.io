<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Dependents</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>

<body>
    <div class="container mt-5">
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

        // Retrieve employee's name
        $sql_employee = "SELECT Fname, Lname FROM Employee WHERE SSN = '$SSN'";
        $result_employee = $conn->query($sql_employee);

        if ($result_employee->num_rows > 0) {
            $row_employee = $result_employee->fetch_assoc();
            echo "<h1>Dependents of " . $row_employee["Fname"] . " " . $row_employee["Lname"] . "</h1>";

            // Retrieve dependents associated with the employee
            $sql_dependents = "SELECT name, relationship FROM Dependents WHERE dependentOf = '$SSN'";
            $result_dependents = $conn->query($sql_dependents);

            if ($result_dependents->num_rows > 0) {
                echo "<table class='table'><thead><tr><th>Name</th><th>Relationship</th></tr></thead><tbody>";
                // Output data of each row
                while ($row_dependents = $result_dependents->fetch_assoc()) {
                    echo "<tr><td>" . $row_dependents["name"] . "</td><td>" . $row_dependents["relationship"] . "</td></tr>";
                }
                echo "</tbody></table>";
            } else {
                echo "No dependents found for this employee.";
            }
        } else {
            echo "Employee not found.";
        }

        $conn->close();
        ?>
    </div>
</body>

</html>