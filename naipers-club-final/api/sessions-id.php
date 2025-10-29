<?php
/**
 * API Endpoint: Update Session by ID
 * PATCH /api/sessions/{id}
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';

setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'PATCH' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

// Extract session ID from path
$path = $_SERVER['REQUEST_URI'];
$matches = [];
if (preg_match('#/api/sessions/([a-f0-9\-]+)#i', $path, $matches)) {
    $sessionId = $matches[1];
} else {
    sendJSON(['error' => 'Invalid session ID'], 400);
}

$data = getJSONInput();

try {
    $pdo = getDBConnection();
    $updates = [];
    $params = [];
    
    if (isset($data['completedQuiz'])) {
        $updates[] = "completed_quiz = ?";
        $params[] = (int)$data['completedQuiz'];
    }
    
    if (isset($data['clickedBuy'])) {
        $updates[] = "clicked_buy = ?";
        $params[] = (int)$data['clickedBuy'];
    }
    
    $updates[] = "last_activity_at = ?";
    $params[] = date('Y-m-d H:i:s');
    
    $params[] = $sessionId;
    
    if (count($updates) > 0) {
        $sql = "UPDATE sessions SET " . implode(', ', $updates) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
    }
    
    sendJSON(['success' => true]);
    
} catch (PDOException $e) {
    error_log("Session update error: " . $e->getMessage());
    sendJSON(['error' => 'Failed to update session'], 500);
}
