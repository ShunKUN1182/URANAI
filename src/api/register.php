<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

require_once __DIR__ . "/db.php";

$data = json_decode(file_get_contents("php://input"),true);

$name = $data["name"] ?? "";
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if ($name === "" || $email === "" || $password === "") {
  echo json_encode([
    "success" => false,
    "message" => "入力されていない項目があります"
  ]);
  exit;
}

$hashedPassword = password_hash($password,PASSWORD_DEFAULT);

$userId = "@user_" . bin2hex(random_bytes(4));

try {
  $sql = "
        INSERT INTO users (
            email,
            user_id,
            user_name,
            password
        )
        VALUES (
            :email,
            :user_id,
            :user_name,
            :password
        )
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":email" => $email,
        ":user_id" => $userId,
        ":user_name" => $name,
        ":password" => $hashedPassword
    ]);
    echo json_encode([
      "success" => true,
      "message" => "新規登録しました"
    ]);
} catch (PDOException $error) {
  echo json_encode([
      "success" => false,
      "message" => "新規登録に失敗しました"
  ]);
}