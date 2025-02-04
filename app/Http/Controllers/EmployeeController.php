<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{

public function taskList(){
    return Inertia::render('Employee/TaskList');
}
public function addTask(){
    return Inertia::render('Employee/AddTask');
}
}
