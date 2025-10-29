<?php
/**
 * API Endpoint: Quiz Responses
 * POST /api/quiz-responses.php - Submit quiz response
 * GET /api/quiz-responses.php - Get all responses (admin only)
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';

setCORSHeaders();

$pdo = getDBConnection();

// GET - Get all quiz responses (admin only)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    requireAdmin();
    
    try {
        $stmt = $pdo->query("
            SELECT * FROM quiz_responses 
            ORDER BY created_at DESC
        ");
        
        $responses = $stmt->fetchAll();
        sendJSON($responses);
        
    } catch (PDOException $e) {
        error_log("Get quiz responses error: " . $e->getMessage());
        sendJSON(['error' => 'Failed to fetch responses'], 500);
    }
}

// POST - Submit quiz response
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getJSONInput();
    
    // Validate required fields
    $required = ['sessionId', 'name', 'email', 'answer1', 'answer2', 'answer3'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            sendJSON(['error' => "Missing required field: $field"], 400);
        }
    }
    
    // Validate email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        sendJSON(['error' => 'Invalid email address'], 400);
    }
    
    try {
        $responseId = generateUUID();
        $now = date('Y-m-d H:i:s');
        
        $stmt = $pdo->prepare("
            INSERT INTO quiz_responses 
            (id, session_id, name, email, phone, answer1, answer2, answer3, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $responseId,
            $data['sessionId'],
            $data['name'],
            $data['email'],
            $data['phone'] ?? null,
            $data['answer1'],
            $data['answer2'],
            $data['answer3'],
            $now
        ]);
        
        sendJSON(['id' => $responseId], 201);
        
    } catch (PDOException $e) {
        error_log("Quiz response error: " . $e->getMessage());
        sendJSON(['error' => 'Failed to submit quiz response'], 500);
    }
}

sendJSON(['error' => 'Method not allowed'], 405);
