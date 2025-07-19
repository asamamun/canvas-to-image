<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Get category parameter
$category = $_GET['category'] ?? null;

if (!$category) {
    // Return categories list
    $categories = [
        [
            'id' => 'birthday',
            'name' => 'Birthday',
            'description' => 'Birthday card templates',
            'thumbnail' => 'assets/templates/birthday.svg',
        ],
        [
            'id' => 'invitation',
            'name' => 'Invitation',
            'description' => 'Invitation card templates',
            'thumbnail' => 'assets/templates/invitation.svg',
        ],
        [
            'id' => 'wedding',
            'name' => 'Wedding',
            'description' => 'Wedding card templates',
            'thumbnail' => 'assets/templates/wedding.svg',
        ],
    ];
    echo json_encode(['categories' => $categories]);
    exit;
}

// Return templates for specific category
$templates = [];
$templateDir = "../assets/templates/$category/";

if (is_dir($templateDir)) {
    $files = scandir($templateDir);
    foreach ($files as $file) {
        if ($file != '.' && $file != '..' && !is_dir($templateDir . $file)) {
            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($extension, ['jpg', 'jpeg', 'png', 'svg'])) {
                $templates[] = [
                    'id' => uniqid(),
                    'name' => ucfirst(pathinfo($file, PATHINFO_FILENAME)),
                    'category' => $category,
                    'image' => "assets/templates/$category/$file",
                    'thumbnail' => "assets/templates/$category/$file",
                ];
            }
        }
    }
}

// Add fallback templates if directory is empty
if (empty($templates)) {
    $fallbackFile = "../assets/templates/$category.svg";
    if (file_exists($fallbackFile)) {
        $templates[] = [
            'id' => uniqid(),
            'name' => ucfirst($category) . ' Template',
            'category' => $category,
            'image' => "assets/templates/$category.svg",
            'thumbnail' => "assets/templates/$category.svg",
        ];
    }
}

echo json_encode(['templates' => $templates]);
