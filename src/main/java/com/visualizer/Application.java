package com.visualizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.visualizer.controllers.MovieController;	

@SpringBootApplication
public class Application {
	public static void main (String arg[]){
		SpringApplication.run(Application.class, arg);
	}
}

