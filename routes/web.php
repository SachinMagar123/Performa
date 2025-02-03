<?php

<<<<<<< HEAD
use App\Http\Controllers\AdminController;
=======
>>>>>>> c88f325c4fa54654e53018d31476292e60a2318c
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

}); 


//admin routes
<<<<<<< HEAD
Route::middleware(['auth', 'role:admin'])->group(function () {
  
    Route::get('/admin-dashboard',[AdminController::class, 'dashboard'])->name('admin.dashboard');
  
=======
Route::middleware(['auth', 'admin'])->group(function () {
    // Route::get('/admin', function () {
    //     return view('admin.dashboard');
    // });
>>>>>>> c88f325c4fa54654e53018d31476292e60a2318c
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';
