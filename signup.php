<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $json_data = file_get_contents('php://input');
    
    $data = json_decode($json_data, true); 

    if ($data === null) {
        die(json_encode(["status" => "error", "message" => "Invalid JSON data received."]));
    }
    $name = $data['fullname'] ?? ''; 
    $number = $data['number'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $conn = new mysqli("sql111.infinityfree.com", "if0_40370183", "FT45tbTk2bX", "if0_40370183_register");

    if ($conn->connect_error) {
        die(json_encode(["status" => "error", "message" => "Database connection failed."]));
    }

    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO signup (name, number, email, password) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $number, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Signup successful!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Signup failed."]);
    }

    $stmt->close();
    $conn->close();
}
?>