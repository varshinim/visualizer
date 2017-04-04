
package com.visualizer.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	   return "base";
   }
   
   @RequestMapping("/search")
   public @ResponseBody  List<Movie> getAllMovies(@RequestParam(value="q", required=true) String searchTerm) {
		return movieService.getAllMovies(searchTerm);
	}
   
   @RequestMapping(value = "/movies/{id}", method = RequestMethod.GET)
   public @ResponseBody Movie getMovie(@PathVariable(value="id") Integer id) {
		return movieService.getMovie(id);
	}
   
   @RequestMapping("/movies")
   public @ResponseBody  List<Movie> getAllYears(@RequestParam(value="startYear", required=false) String year1, 
		   @RequestParam(value="endYear", required=false) String year2 ) {
	   if (year1 != null && year2 != null) {
		   try {
			   int startYear = Integer.parseInt(year1);
			   int endYear = Integer.parseInt(year2);
			   return movieService.getAllYears(startYear, endYear);
		   } catch(NumberFormatException e) {
			   throw new IllegalArgumentException(e.getMessage());
		   }
	   } 
	   else {
		   return movieService.listAllMovies();
	   }

	}
}