<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\Report;

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
        $validatedData = $request->validate([
            'task_name' => 'required|string|max:255',
            'task_type' => 'required|string|max:255',
            'deadline' => 'required|date',
            'Priority_level' => 'required|string|in:low,medium,high',
        ]);

        // Create the task
        $task = Task::create($validatedData);

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
        $task = Task::with('report')->find($request->task_id);
        
        if (!$task) {
            return redirect()->route('employee.task-list')->withErrors('Task not found.');
        }

        return Inertia::render('Employee/Assignment', [
            'task' => $task,
        ]);
    }

    public function updateReport(Request $request, $taskId)
{
    // Validate incoming data
    $validatedData = $request->validate([
        'time_spent' => 'required|integer|min:0',
        'status' => 'required|string|in:in-progress,on-doing,completed,cancelled',
    ]);

    // Find the task and associated report
    $task = Task::find($taskId);

    if (!$task) {
        return response()->json(['message' => 'Task not found'], 404);
    }

    // Find or create the report
    $report = Report::firstOrNew(['task_id' => $taskId]);
    
    // Update the report
    $report->time_spent = $validatedData['time_spent'];
    $report->status = $validatedData['status'];
    $report->save();

    // just to check response
    // return response()->json(['message' => 'Report updated successfully', 'report' => $report]);

    //make new file to show the reports
    return Inertia::render('Employee/ReportSummary', [
        'task' => $task,
        'report' => $report,
        'message' => 'Report updated successfully!',
    ]);
}

}
