<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['canvas'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

// Create uploads directory if it doesn't exist
$uploadsDir = '../uploads/';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

// Generate unique filename
$filename = 'design_' . uniqid() . '.json';
$filepath = $uploadsDir . $filename;

// Save design data
$designData = [
    'canvas' => $input['canvas'],
    'timestamp' => $input['timestamp'] ?? date('c'),
    'id' => uniqid(),
];

if (file_put_contents($filepath, json_encode($designData))) {
    echo json_encode([
        'success' => true,
        'id' => $designData['id'],
        'filename' => $filename,
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save design']);
}
