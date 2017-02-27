package com.visualizer.services;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.visualizer.dao.MovieDao;
import com.visualizer.models.Movie;


@Service
public class MovieService {
	
	@Autowired
	private MovieDao movieDao;
	
	public List<Movie> listAllMovies() {
		List<Movie> movies = new ArrayList<>();
		movieDao.findAll().forEach(movies::add);
		return movies;
	}
	
	public List<Movie> getAllMovies(String name) {
		List<Movie> movies = new ArrayList<>();
		movieDao.findByName(name).forEach(movies::add);
		return movies;
	}
	
	public List<Movie> getAllYears(int year1, int year2) {
		List<Movie> movies = new ArrayList<Movie>();
		movieDao.findByReleaseYearBetween(year1, year2).forEach(movies::add);
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
	
	
//   public List<Movie> getMovie(String name) {
//		ArrayList<Movie> al = new ArrayList<Movie>();
//		Pattern p = Pattern.compile(name);
//		for(int i=0;i<movies.size();i++){
//			Matcher m = p.matcher(movies.get(i).getName());
//			while (m.find()) {
//				al.add(movies.get(i));
//			}
//		}
//		return al;
//	}
//   
//   public List<Movie> getYear(int year1, int year2){
//	   ArrayList<Movie> al1 = new ArrayList<Movie>();
//	   int i = 0;
//		for(i=0;i<movies.size();i++){
//			if(movies.get(i).getReleaseYear()<=year1 && movies.get(i).getReleaseYear()>=year2){
//				al1.add(movies.get(i));
//			}
//		}
//	   return al1;
//   }
}
