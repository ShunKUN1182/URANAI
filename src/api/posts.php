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
    $data = json_decode(file_get_contents("php://input"), true) ?? [];
    $limit = min(max((int)($data["limit"] ?? 5), 1), 20);
    $offset = max((int)($data["offset"] ?? 0), 0);

    $sql = "
        SELECT
            user_fortunes.id,
            user_fortunes.created_at,
            users.user_id,
            users.user_name,
            users.icon AS user_icon,
            characters.name AS character_name,
            characters.image AS character_image,
            fortunes.name AS fortune_name,
            fortunes.message AS fortune_message,
            fortunes.image AS fortune_image
        FROM user_fortunes
        INNER JOIN users ON users.id = user_fortunes.user_id
        INNER JOIN characters ON characters.id = user_fortunes.character_id
        INNER JOIN fortunes ON fortunes.id = user_fortunes.fortune_id
        ORDER BY user_fortunes.created_at DESC, user_fortunes.id DESC
        LIMIT :limit OFFSET :offset
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":limit", $limit, PDO::PARAM_INT);
    $stmt->bindValue(":offset", $offset, PDO::PARAM_INT);
    $stmt->execute();
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "posts" => $posts,
        "has_more" => count($posts) === $limit
    ]);
} catch (Exception $error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "投稿の取得に失敗しました"
    ]);
}
