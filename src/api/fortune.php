<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/db.php";

try {
  $sql = "SELECT id, name, image FROM characters ORDER BY RAND() LIMIT 1";
  $stmt = $pdo->prepare($sql);

  $stmt->execute();

  $character = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$character) {
    throw new Exception("キャラクターが見つかりません");
  }

  $sql = "SELECT id, name, message FROM fortunes WHERE character_id = :character_id ORDER BY RAND() LIMIT 1";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    ":character_id" => $character["id"]
  ]);

  $fortune = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$fortune) {
    throw new Exception("このキャラクターには運勢がありません");
  }

  echo json_encode([
    "success" => true,
    "character" => $character,
    "fortune" => $fortune,
  ]);

} catch (Exception $error) {
  http_response_code(500);

  echo json_encode([
    "succcess" => "false",
    // "message" => "占い結果の取得に失敗しました",
    "message" => $error->getMessage()
  ]);
}

?>