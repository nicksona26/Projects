<?php
$host = 'sql305.infinityfree.com';
$username = 'if0_36363381';
$password = 'Dvtt5zL8fsT';
$database = 'if0_36363381_hciproject';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$folderName = isset($_GET['folder']) ? $_GET['folder'] : '';

if (!empty($folderName)) {
    $sql = "SELECT name FROM files WHERE folder = '$folderName'";
    $result = $conn->query($sql);

    $files = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $files[] = $row['name'];
        }
    }
} else {
    $files = array(); 
}

$conn->close();

echo json_encode(['files' => $files]);
?>
