<?php

$config = require __DIR__ . "/config.php";

try {
    $pdo = new PDO(
      $config["dsn"], 
      $config["user"], 
      $config["password"],
    );
    echo "DB接続成功";
} catch (PDOException $e) {
    echo "DB接続失敗";
}

?>