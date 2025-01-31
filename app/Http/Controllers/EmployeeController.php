<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    //
    function home(){
        return Inertia::render('Employee/employee');
    }
}
