<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/db.php";

try {

  $data = json_decode(file_get_contents("php://input"), true);

  $user_id = $data["user_id"];

  $sql = "SELECT character_id FROM user_fortunes WHERE user_id = :user_id";

  $stmt = $pdo->prepare($sql);

  $stmt->execute([
    ":user_id" => $user_id
  ]);

  $characters = $stmt->fetchAll(PDO::FETCH_COLUMN);

  echo json_encode([
    "success" => true,
    "character_ids" => $characters
  ]);
} catch (Exception $error) {

  http_response_code(500);

  echo json_encode([
    "success" => false,
    "message" => $error->getMessage()
  ]);
}
