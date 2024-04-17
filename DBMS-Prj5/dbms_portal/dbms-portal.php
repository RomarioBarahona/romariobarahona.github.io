<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Employee List</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>
<body>
<div class="container">
    <h1 class="mt-5">Welcome Admin</h1>
    <h2 class="mt-3">Employee List</h2>
    
    <!-- Name lookup form -->
    <form method="GET" class="mt-3 mb-3">
        <div class="row">
            <div class="col-md-6">
                <input type="text" name="search_name" class="form-control" placeholder="Enter first name">
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary">Search</button>
            </div>
        </div>
    </form>

    <table class="table table-striped mt-3">
        <thead>
            <tr>
                <th>SSN</th>
                <th>Date of Birth</th>
                <th>First Name</th>
                <th>Middle Initial</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $db_host = 'sql5.freesqldatabase.com';
            $db_username = 'sql5699632';  
            $db_password = 'pZbapRBlz6';     
            $db_name = 'sql5699632';      
            $records_per_page = 50;

            // Create connection
            $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Get current page number from URL parameter
            $page = isset($_GET['page']) && is_numeric($_GET['page']) ? $_GET['page'] : 1;
            $offset = ($page - 1) * $records_per_page;

            // Search by name if name is provided
            $search_name = isset($_GET['search_name']) ? $_GET['search_name'] : '';
            $where_condition = !empty($search_name) ? " WHERE Fname LIKE '%$search_name%'" : '';

            $sql = "SELECT SSN, dob, Fname, minit, Lname, address FROM Employee $where_condition LIMIT $offset, $records_per_page";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                // Output data of each row
                while($row = $result->fetch_assoc()) {
                    echo "<tr>
                            <td>" . $row["SSN"] . "</td>
                            <td>" . $row["dob"] . "</td>
                            <td>" . $row["Fname"] . "</td>
                            <td>" . $row["minit"] . "</td>
                            <td>" . $row["Lname"] . "</td>
                            <td>" . $row["address"] . "</td>
                            <td>
                                <div class='btn-group'>
                                    <button type='button' class='btn btn-secondary dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
                                        Actions
                                    </button>
                                    <ul class='dropdown-menu'>
                                        <li><a class='dropdown-item' href='update_employee.php?SSN=" . $row["SSN"] . "'>Update</a></li>
                                        <li><a class='dropdown-item' href='view_dependents.php?SSN=" . $row["SSN"] . "'>View Dependents</a></li>
                                        <li><form method='POST' action='delete_employee.php' onsubmit='return confirm(\"Are you sure you want to delete this employee?\");'>
                                            <input type='hidden' name='SSN' value='" . $row["SSN"] . "'>
                                            <button type='submit' class='dropdown-item'>Delete</button>
                                        </form></li>
                                    </ul>
                                </div>
                            </td>
                          </tr>";
                }
            } else {
                echo "<tr><td colspan='7'>No employees found</td></tr>";
            }
            $conn->close();
            ?>
        </tbody>
    </table>
    
    <?php
    // Previous page button
    if ($page > 1) {
        echo "<a href='?page=".($page - 1)."' class='btn btn-primary'>Previous</a>";
    }
    // Next page button
    $conn = new mysqli($db_host, $db_username, $db_password, $db_name);
    $count_sql = "SELECT COUNT(*) AS total FROM Employee $where_condition";
    $count_result = $conn->query($count_sql);
    $row = $count_result->fetch_assoc();
    $total_pages = ceil($row["total"] / $records_per_page);
    if ($page < $total_pages) {
        echo "<a href='?page=".($page + 1)."' class='btn btn-primary'>Next</a>";
    }
    ?>

    <!-- Insert form -->
    <h2 class="mt-5">Add New Employee</h2>
    <form method="POST" action="insert_employee.php" class="mt-3">
        <div class="row">
            <div class="col-md-2">
                <input type="text" name="SSN" class="form-control" placeholder="SSN">
            </div>
            <div class="col-md-2">
                <input type="date" name="dob" class="form-control" placeholder="Date of Birth">
            </div>
            <div class="col-md-2">
                <input type="text" name="Fname" class="form-control" placeholder="First Name">
            </div>
            <div class="col-md-1">
                <input type="text" name="minit" class="form-control" placeholder="Middle Initial">
            </div>
            <div class="col-md-2">
                <input type="text" name="Lname" class="form-control" placeholder="Last Name">
            </div>
            <div class="col-md-3">
                <input type="text" name="address" class="form-control" placeholder="Address">
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary">Add Employee</button>
            </div>
        </div>
    </form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
