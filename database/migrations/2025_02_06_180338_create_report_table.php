<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_id');
            $table->integer('timer')->default(0); // Store time in seconds
            $table->string('status')->default('in-progress'); // Status of the task
            $table->timestamps();
            
            // Add foreign key if you have a tasks table
            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reports');
    }
    
};
