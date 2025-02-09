<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Task;

class AdminController extends Controller
{
    public function dashboard(){
        return Inertia::render('Admin/AdminDashboard');
    }

    public function userList() :Response {

        $users = User::all();
        return Inertia::render('Admin/Users', ['users' => $users]);
    }

    public function showUserTasks($userId)
    {
        $tasks = Task::where('user_id', $userId)->get();

        return Inertia::render('Admin/UserTasks', [
            'tasks' => $tasks,
            'user_id' => $userId,
        ]);
    }

    public function showTaskReport($taskId)
{
    $task = Task::findOrFail($taskId); 
    $report = $task->report; 

    $message = $report ? 'Report found successfully!' : 'No report available for this task.';

    return Inertia::render('Employee/ReportSummary', [
        'task' => $task,
        'report' => $report,
        'message' => $message, 
    ]);
}

}
