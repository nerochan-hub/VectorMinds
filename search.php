<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

//$conn = new mysqli("localhost", "root", "", "internship_db");

$conn = new mysqli("sql111.infinityfree.com", "if0_40370183", "FT45tbTk2bX", "if0_40370183_XXX");

if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}

if (isset($_GET['q'])) {
    $q = $conn->real_escape_string($_GET['q']);
    $sql = "SELECT * FROM internships 
            WHERE role LIKE '%$q%' 
            OR company LIKE '%$q%' 
            OR location LIKE '%$q%'";
    $result = $conn->query($sql);

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} else {
    echo json_encode(["error" => "No search term provided"]);
}
?>