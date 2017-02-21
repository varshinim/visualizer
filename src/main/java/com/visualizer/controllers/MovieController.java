package com.visualizer.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.visualizer.Exceptions.IllegalArgumentException;
import com.visualizer.models.Movie;
import com.visualizer.services.MovieService;

@Controller
public class MovieController {
	
	@Autowired
	private MovieService movieService;
   
	@RequestMapping("/")
   public String greeting(@RequestParam(value="name", required=false, defaultValue="world") String name, Model model){
	   model.addAttribute("name", name);
	   return "index";
   }
   
   @RequestMapping("/movies/{name}")
   public @ResponseBody  List<Movie> getMovie(@PathVariable(value="name") String name) {
		return movieService.getMovie(name);
	}
   
   @RequestMapping("/movies")
   public @ResponseBody  List<Movie> getYear(@RequestParam(value="startYear", required=false) String year1, 
		   @RequestParam(value="endYear", required=false) String year2 ) {
	   if (year1 != null && year2 != null) {
		   try {
			   int startYear = Integer.parseInt(year1);
			   int endYear = Integer.parseInt(year2);
			   return movieService.getYear(startYear, endYear);
		   } catch(NumberFormatException e) {
			   throw new IllegalArgumentException(e.getMessage());
		   }
	   } 
	   else {
		   return movieService.listAllMovies(); 
	   }

	}
}