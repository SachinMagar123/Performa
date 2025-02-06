<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\Report;  // Import the Report model

class EmployeeController extends Controller
{
    public function taskList(){
        return Inertia::render('Employee/TaskList');
    }

    public function addTask(){
        return Inertia::render('Employee/AddTask');
    }

    public function storeTask(Request $request){
        $request->validate([
            'task_name' => 'required',
            'task_type' => 'required',
            'deadline' => 'required',
            'Priority_level' => 'required',
        ]);

        // Create the task
        $task = Task::create([
            'task_name' => $request['task_name'],
            'task_type' => $request['task_type'],
            'deadline' => $request['deadline'],
            'Priority_level' => $request['Priority_level'],
        ]);

        // Create a new report for this task (initialize with default timer and status)
        Report::create([
            'task_id' => $task->id,
            'timer' => 0,  // Initial timer value
            'status' => 'in-progress',  // Default status
        ]);

        return redirect()->route('employee.assignment', ['task_id' => $task->id]);
    }

    public function assignment(Request $request)
    {
        // Retrieve the task
        $task = Task::find($request->task_id);

        return Inertia::render('Employee/Assignment', [
            'task' => $task,
        ]);
    }

    // Method to update the report (timer and status)
    public function updateReport(Request $request, $taskId)
    {
        // Find or create the report for the task
        $report = Report::where('task_id', $taskId)->first();

        if (!$report) {
            // If no report exists for the task, create a new one
            $report = new Report();
            $report->task_id = $taskId;
        }

        // Update the report with the new timer and status
        $report->timer = $request->timer;
        $report->status = $request->status;

        // Save the report
        $report->save();

        // Return a response (optional)
        return response()->json(['message' => 'Report updated successfully', 'report' => $report]);
    }
}
