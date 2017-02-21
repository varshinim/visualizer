package com.visualizer.services;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.visualizer.models.Movie;

@Service
public class MovieService {
	
	List<Movie> movies = null;
	
	public MovieService() {
		movies = new ArrayList<Movie>();
		movies.add(new Movie("180", 2012));
		movies.add(new Movie("48 Hours", 2015));
		movies.add(new Movie("50 First Dates", 2016));
		movies.add(new Movie("About a boy", 2014));
		movies.add(new Movie("Age of Adaline", 2015));
	}
	
	public List<Movie> listAllMovies() {
		return movies;
	}
	
	/*public Movie getMovie(String name) {
		String s = "";
		int i=0;
		int year = 0;
		for(i=0;i<movies.size();i++){
			if(movies.get(i).getName().equals(name)){
				s = name;
				year = movies.get(i).getReleaseYear();
				break;
			}
		}
		return new Movie(s,year);
	}*/
	
	
   public List<Movie> getMovie(String name) {
		ArrayList<Movie> al = new ArrayList<Movie>();
		Pattern p = Pattern.compile(name);
		for(int i=0;i<movies.size();i++){
			Matcher m = p.matcher(movies.get(i).getName());
			while (m.find()) {
				al.add(movies.get(i));
			}
		}
		return al;
	}
   
   public List<Movie> getYear(int year1, int year2){
	   ArrayList<Movie> al1 = new ArrayList<Movie>();
	   int i = 0;
		for(i=0;i<movies.size();i++){
			if(movies.get(i).getReleaseYear()<=year1 && movies.get(i).getReleaseYear()>=year2){
				al1.add(movies.get(i));
			}
		}
	   return al1;
   }
}
