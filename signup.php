<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    
    $conn = new mysqli("localhost", "root", "", "vector_minds");

    if ($conn->connect_error) {
        die(json_encode(["status" => "error", "message" => "Database connection failed."]));
    }

    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Signup successful!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Signup failed."]);
    }

    $stmt->close();
    $conn->close();
}
?>