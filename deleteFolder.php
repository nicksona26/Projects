<?php
$host = 'sql305.infinityfree.com';
$username = 'if0_36363381';
$password = 'Dvtt5zL8fsT';
$database = 'if0_36363381_hciproject';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['folderName'])) {
    $folderName = $_POST['folderName'];

    $stmtDeleteFiles = $conn->prepare("DELETE FROM files WHERE folder = ?");
    $stmtDeleteFolder = $conn->prepare("DELETE FROM folders WHERE name = ?");
    $stmtDeleteTexts = $conn->prepare("DELETE FROM text WHERE folder = ?");

    $stmtDeleteFiles->bind_param("s", $folderName);
    $stmtDeleteFolder->bind_param("s", $folderName);
    $stmtDeleteTexts->bind_param("s", $folderName);

    $conn->begin_transaction();

    try {
        $stmtDeleteFiles->execute();

        $stmtDeleteTexts->execute();

        $stmtDeleteFolder->execute();

        $conn->commit();
        echo "Folder, associated files, and texts deleted successfully!";
    } catch (Exception $e) {
        $conn->rollback();
        echo "Error: " . $e->getMessage();
    }

    $stmtDeleteFiles->close();
    $stmtDeleteFolder->close();
    $stmtDeleteTexts->close();
}

$conn->close();
?>
