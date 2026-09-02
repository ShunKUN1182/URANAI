<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/db.php";

try {
  $sql = "SELECT id, name, image FROM characters";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $characters = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode([
    "success" => true,
    "characters" => $characters,
  ]);
} catch (Exception $error) {
  http_response_code(500);
  echo json_encode([
    "succcess" => "false",
    "message" => $error->getMessage()
  ]);
}
