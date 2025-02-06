<?php

use App\Http\Controllers\AdminController;

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


//Employee routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/employee-task-list',[EmployeeController::class, 'taskList'])->name('employee.task-list');
    Route::get('/employee-add-task',[EmployeeController::class, 'addTask'])->name('employee.add-task');
    Route::post('/employee-add-task',[EmployeeController::class, 'storeTask'])->name('employee.store-task');
    Route::get('/employee-assignment', [EmployeeController::class, 'assignment'])->name('employee.assignment');
    Route::post('/update-report/{taskId}', [EmployeeController::class, 'updateReport'])->name('employee.update-report');
}); 


//admin routes
Route::middleware(['auth', 'role:admin'])->group(function () {
  
    Route::get('/admin-dashboard',[AdminController::class, 'dashboard'])->name('admin.dashboard');
  
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';
