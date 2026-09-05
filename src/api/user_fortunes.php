<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "POSTメソッドでリクエストしてください"
    ]);
    exit;
}

require_once __DIR__ . "/db.php";

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data["user_id"] ?? null;

    if (!is_numeric($userId) || (int)$userId <= 0) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "ユーザーIDが正しくありません"
        ]);
        exit;
    }

    $sql = "
        SELECT
            user_fortunes.id,
            user_fortunes.created_at,
            characters.id AS character_id,
            characters.name AS character_name,
            characters.image AS character_image,
            fortunes.id AS fortune_id,
            fortunes.name AS fortune_name,
            fortunes.message AS fortune_message,
            fortunes.image AS fortune_image
        FROM user_fortunes
        INNER JOIN characters ON characters.id = user_fortunes.character_id
        INNER JOIN fortunes ON fortunes.id = user_fortunes.fortune_id
        WHERE user_fortunes.user_id = :user_id
        ORDER BY user_fortunes.created_at DESC, user_fortunes.id DESC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([":user_id" => (int)$userId]);

    echo json_encode([
        "success" => true,
        "fortunes" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);
} catch (Exception $error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "占い履歴の取得に失敗しました"
    ]);
}
