<?php
/**
 * API Endpoint: Analytics Dashboard Data
 * GET /api/analytics.php (admin only)
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';

setCORSHeaders();
requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

try {
    $pdo = getDBConnection();
    
    // Total sessions
    $totalSessions = $pdo->query("SELECT COUNT(*) FROM sessions")->fetchColumn();
    
    // Total page views
    $totalPageViews = $pdo->query("
        SELECT COUNT(*) FROM tracking_events WHERE event_type = 'page_view'
    ")->fetchColumn();
    
    // Form submissions (quiz completions)
    $formSubmissions = $pdo->query("SELECT COUNT(*) FROM quiz_responses")->fetchColumn();
    
    // Buy button clicks
    $buyClicks = $pdo->query("
        SELECT COUNT(*) FROM tracking_events WHERE event_type = 'buy_click'
    ")->fetchColumn();
    
    // Conversion funnel - step completion counts
    $funnelSteps = $pdo->query("
        SELECT 
            step_number,
            COUNT(DISTINCT session_id) as count
        FROM tracking_events 
        WHERE event_type = 'page_view' AND step_number IS NOT NULL
        GROUP BY step_number
        ORDER BY step_number
    ")->fetchAll();
    
    // Answer distribution per question
    $answerDistribution = $pdo->query("
        SELECT 
            step_number,
            answer_id,
            COUNT(*) as count
        FROM tracking_events 
        WHERE event_type = 'answer_click' AND answer_id IS NOT NULL
        GROUP BY step_number, answer_id
        ORDER BY step_number, count DESC
    ")->fetchAll();
    
    // Recent leads (last 50)
    $recentLeads = $pdo->query("
        SELECT 
            name, 
            email, 
            phone, 
            created_at,
            answer1,
            answer2,
            answer3
        FROM quiz_responses 
        ORDER BY created_at DESC 
        LIMIT 50
    ")->fetchAll();
    
    // Exit points analysis
    $exitPoints = $pdo->query("
        SELECT 
            step_number,
            COUNT(*) as exit_count
        FROM tracking_events 
        WHERE event_type = 'exit'
        GROUP BY step_number
        ORDER BY step_number
    ")->fetchAll();
    
    $analytics = [
        'totalSessions' => (int)$totalSessions,
        'totalPageViews' => (int)$totalPageViews,
        'formSubmissions' => (int)$formSubmissions,
        'buyClicks' => (int)$buyClicks,
        'funnelSteps' => $funnelSteps,
        'answerDistribution' => $answerDistribution,
        'recentLeads' => $recentLeads,
        'exitPoints' => $exitPoints
    ];
    
    sendJSON($analytics);
    
} catch (PDOException $e) {
    error_log("Analytics error: " . $e->getMessage());
    sendJSON(['error' => 'Failed to fetch analytics'], 500);
}
