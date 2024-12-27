<?php
$host = 'sql305.infinityfree.com';
$username = 'if0_36363381';
$password = 'Dvtt5zL8fsT';
$database = 'if0_36363381_hciproject';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$fileName = $_GET['file'];
$folderName = $_GET['folder'];

$sql = "SELECT textbox FROM text WHERE title = '$fileName' AND folder = '$folderName'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $text = $row['textbox']; 
    echo $text;
} else {
    echo "";
}

$conn->close();
?>
