<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = ['task_id', 'timer', 'status'];

    //relationship to Task (if needed)
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}

