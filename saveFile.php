<?php

$host = 'sql305.infinityfree.com';
$username = 'if0_36363381';
$password = 'Dvtt5zL8fsT';
$database = 'if0_36363381_hciproject';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['fileName']) && isset($_POST['folderName'])) {
    $fileName = $_POST['fileName'];
    $folderName = $_POST['folderName'];
    $sql = "INSERT INTO files (name, folder) VALUES ('$fileName', '$folderName')";

    if ($conn->query($sql) === TRUE) {
        echo "File saved to database successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

