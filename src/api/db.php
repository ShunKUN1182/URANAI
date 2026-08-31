<?php

$config = require __DIR__ . "/config.php";

try {
    $pdo = new PDO(
        $config["dsn"], 
        $config["user"], 
        $config["password"],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    
    echo json_encode([
        "success" => false,
        "message" => "DB接続に失敗しました"
    ])
}

?>