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
    $sql = "INSERT INTO folders (name) VALUES ('$folderName')";

    if ($conn->query($sql) === TRUE) {
        echo "Folder saved to database successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
