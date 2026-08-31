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
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if ($email === "" || $password === "") {
  echo json_encode([
    "success" => false,
    "message" => "メールアドレスとパスワードを入力してください"
  ]);
  exit;
}

try {
  $sql = "
    SELECT id,email,user_id,user_name,password,icon FROM users WHERE email = :email
  ";

  $stmt = $pdo->prepare($sql);

  $stmt->execute([
    ":email" => $email
  ]);

  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$user) {
    echo json_encode([
      "success" => false,
      "message" => "メールアドレスまたはパスワードが正しくありません"
    ]);
    exit;
  }

  if (!password_verify($password, $user["password"])) {
    echo json_encode([
      "success" => false,
      "message" => "メールアドレスまたはパスワードが正しくありません"
    ]);
    exit;
  }

  unset($user["password"]);

  echo json_encode([
    "success" => true,
    "message" => "ログインしました",
    "user" => $user
  ]);
} catch(PDOException $error) {
  echo json_encode([
    "success" => false,
    "message" => "ログイン処理に失敗しました"
  ]);
}

?>