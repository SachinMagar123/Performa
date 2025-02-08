<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['task_name', 'task_type', 'deadline', 'priority_level'];

    // Define the relationship to Report
    public function report()
    {
        return $this->hasOne(Report::class, 'task_id', 'id');
    }
}
