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
    // Route::post('/employee/update-report/{taskId}', [EmployeeController::class, 'updateReport'])->name('employee.update-report');
    Route::post('/employee/update-report/{task_id}', [EmployeeController::class, 'updateReport'])->middleware(['auth', 'verified'])->name('employee.update-report');

    Route::get('/employee/report/{task_id}', [EmployeeController::class, 'showReport'])->middleware(['auth', 'verified'])->name('employee.report');
}); 


//admin routes
Route::middleware(['auth', 'role:admin'])->group(function () {
  
    Route::get('/admin-dashboard',[AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/user-list',[AdminController::class, 'userList'])->name('admin.user-list');
    Route::get('/admin/user/{userId}/tasks', [AdminController::class, 'showUserTasks'])->name('admin.user-tasks');
    Route::get('/admin/task/{taskId}/report', [AdminController::class, 'showTaskReport'])->name('admin.task-report');
  
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';
