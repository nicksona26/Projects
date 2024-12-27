<?php
$host = 'sql305.infinityfree.com';
$username = 'if0_36363381';
$password = 'Dvtt5zL8fsT';
$database = 'if0_36363381_hciproject';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name FROM folders";
$result = $conn->query($sql);

$folders = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $folders[] = $row['name'];
    }
}

$conn->close();

echo json_encode(['folders' => $folders]);
?>
