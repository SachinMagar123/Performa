<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class EmployeeController extends Controller
{
    /**
     * Display the list of tasks for employees.
     */
    public function taskList()
    {
        return Inertia::render('Employee/TaskList', [
            'tasks' => Task::with('report')->get(),
        ]);
    }

    /**
     * Show the form to add a new task.
     */
    public function addTask()
    {
        return Inertia::render('Employee/AddTask');
    }

    /**
     * Store a new task in the database.
     */
    public function storeTask(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'task_name' => 'required|string|max:255',
            'task_type' => 'required|string|max:255',
            'deadline' => 'required|date',
            'priority_level' => 'required|string|in:low,medium,high',
        ]);

        // Create the task
        $task = Task::create([
            'user_id' => $user->id,
            'task_name' => $validatedData['task_name'],
            'task_type' => $validatedData['task_type'],
            'deadline' => $validatedData['deadline'],
            'priority_level' => $validatedData['priority_level'],
        ]);

        // Initialize a report for the task
        Report::create([
            'task_id' => $task->id,
            'time_spent' => 0,  
            'status' => 'pending', 
        ]);

        return redirect()->route('employee.assignment', ['task_id' => $task->id]);
    }

    /**
     * Show the assignment details.
     */
    public function assignment(Request $request)
    {
        $task = Task::with('report')->find($request->task_id);

        if (!$task) {
            return redirect()->route('employee.task-list')->withErrors('Task not found.');
        }

        return Inertia::render('Employee/Assignment', [
            'task' => $task,
        ]);
    }

    /**
     * Update task report with time spent and status.
     */
    public function updateReport(Request $request, $task_id)
    {
        // Validate input data
        $validatedData = $request->validate([
            'time_spent' => 'required|integer|min:0',
            'status' => 'required|string|in:in-progress,on-doing,completed,cancelled',
        ]);

        // Find the task
        $task = Task::find($task_id);
        if (!$task) {
            return redirect()->route('dashboard')->with('error', 'Task not found.');
        }

        // Find or create the report
        $report = Report::firstOrNew(['task_id' => $task_id]);
        $report->time_spent = $validatedData['time_spent'];
        $report->status = $validatedData['status'];
        $report->save();

        return redirect()->route('employee.report', ['task_id' => $task_id]);
    }

    /**
     * Display the report summary along with login data.
     */
    public function showReport(Request $request)
    {
        $task = Task::with('report')->find($request->task_id);

        if (!$task) {
            return redirect()->route('employee.assignment')->withErrors('Task not found.');
        }

        // Fetch login data for the last 30 days
        $logins = User::whereNotNull('last_login_at')
            ->where('last_login_at', '>=', now()->subDays(30))
            ->get()
            ->groupBy(function ($user) {
                return Carbon::parse($user->last_login_at)->format('Y-m-d');
            })
            ->map(fn ($users) => $users->count())
            ->toArray();

        // Format data for the bar chart
        $formattedLogins = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $formattedLogins[] = [
                'date' => $date,
                'logins' => $logins[$date] ?? 0, // Default to 0 if no logins
            ];
        }

        return Inertia::render('Employee/ReportSummary', [
            'task' => $task,
            'report' => $task->report,
            'monthlyLogins' => $formattedLogins,
        ]);
    }
}
