<?php
$host = 'sql305.infinityfree.com';
$username = 'if0_36363381';
$password = 'Dvtt5zL8fsT';
$database = 'if0_36363381_hciproject';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$title = isset($_POST['title']) ? $_POST['title'] : '';
$textbox = isset($_POST['text']) ? $_POST['text'] : '';
$folderName = isset($_POST['folder']) ? $_POST['folder'] : '';

$stmt_check = $conn->prepare("SELECT * FROM `text` WHERE `title` = ? AND `folder` = ?");
$stmt_check->bind_param("ss", $title, $folderName);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check->num_rows > 0) {
    $stmt_update = $conn->prepare("UPDATE `text` SET `textbox` = ? WHERE `title` = ? AND `folder` = ?");
    $stmt_update->bind_param("sss", $textbox, $title, $folderName);
    if ($stmt_update->execute()) {
        echo "Text updated in the database successfully!";
    } else {
        echo "Error updating text: " . $conn->error;
    }
} else {
    $stmt_insert = $conn->prepare("INSERT INTO `text` (`title`, `textbox`, `folder`) VALUES (?, ?, ?)");
    $stmt_insert->bind_param("sss", $title, $textbox, $folderName);
    if ($stmt_insert->execute()) {
        echo "Text saved to database successfully!";
    } else {
        echo "Error inserting text: " . $conn->error;
    }
}

$stmt_check->close();
if (isset($stmt_update)) {
    $stmt_update->close();
}
if (isset($stmt_insert)) {
    $stmt_insert->close();
}
$conn->close();
?>
