<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;

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



     Task::create([
        'task_name' => $request['task_name'],
        'task_type' => $request['task_type'],
        'deadline' => $request['deadline'],
        'Priority_level' => $request['Priority_level'],
     ]);
      return redirect()->route('employee.add-task');

}
}
