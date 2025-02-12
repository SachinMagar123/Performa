<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = ['task_id', 'time_spent', 'status'];

    
    // Define relationship: Report belongs to a Task.
     
    public function task()
    {
        return $this->belongsTo(Task::class , 'task_id', 'id');
    }
}

