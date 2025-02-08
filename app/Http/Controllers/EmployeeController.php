<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\Report;
use \Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    public function taskList()
    {
        return Inertia::render('Employee/TaskList', [
            'tasks' => Task::with('report')->get(), // Fetch all tasks to display for detailing
        ]);
    }

    public function addTask()
    {
        return Inertia::render('Employee/AddTask');
    }

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
            'user_id' => $user->id, // Assign to the logged-in user
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

    public function assignment(Request $request)
    {
        // dd($request->all());
        $task = Task::with('report')->find($request->task_id);
        // dd($task->report);
        if (!$task) {
            return redirect()->route('employee.task-list')->withErrors('Task not found.');
        }

        return Inertia::render('Employee/Assignment', [
            'task' => $task,
        ]);
    }

    public function updateReport(Request $request, $task_id)
{

    // Validate incoming data
    $validatedData = $request->validate([
        'time_spent' => 'required|integer|min:0',
        'status' => 'required|string|in:in-progress,on-doing,completed,cancelled',
    ]);

    // Find the task and associated report
    $task = Task::find($task_id);

    if (!$task) {
        return redirect()->route('dashboard')->with('error', 'Task not found.');}

    // Find or create the report
    $report = Report::firstOrNew(['task_id' => $task_id]);
    
    // Update the report
    $report->time_spent = $validatedData['time_spent'];
    $report->status = $validatedData['status'];
    $report->save();


    return redirect()->route('employee.report', ['task_id' => $task_id]);


  
} 

// public function showReport($task_id)
// {
//     $task = Task::with('report')->find($task_id);
  
//     if (!$task) {
//         return redirect()->route('dashboard')->with('error', 'Task not found.');
//     }

//     return Inertia::render('Employee/ReportSummary', [
//         'task' => $task,
//         'report' => $task->report, // Fetch report from the task
//         'message' => 'Report loaded successfully!',
//     ]);
// }

public function showReport(Request $request)
{
    $task = Task::with('report')->find($request->task_id);
    // dd($task->report);
    if (!$task) {
        return redirect()->route('employee.assignment')->withErrors('Task not found.');
    }

    return Inertia::render('Employee/ReportSummary', [
        'task' => $task,
        'report' => $task->report,
    ]);
}
}
