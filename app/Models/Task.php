<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','task_name', 'task_type', 'deadline', 'priority_level'];

    // Define the relationship to Report
    public function report()
    {
        return $this->hasOne(Report::class, 'task_id', 'id');
    }

    // Define the relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
