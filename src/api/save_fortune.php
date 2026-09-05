<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/db.php";

try {
  $data = json_decode(file_get_contents("php://input"),true);
  $user_id = $data["user_id"];
  $character_id = $data["character_id"];
  $fortune_id = $data["fortune_id"];
  
  $sql = "INSERT INTO user_fortunes (user_id, character_id, fortune_id) VALUES (:user_id, :character_id, :fortune_id)";

  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    ":user_id" => $user_id,
    ":character_id" => $character_id,
    ":fortune_id" => $fortune_id,
  ]);

  echo json_encode([
    "success" => true,
    "message" => "占い結果を保存しました"
  ]);
} catch (Exception $error) {
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "message" => $error->getMessage()
  ]);
}