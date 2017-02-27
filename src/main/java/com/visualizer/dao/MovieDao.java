package com.visualizer.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.visualizer.models.Movie;

@Repository
public class MovieDao {
	
    @PersistenceContext EntityManager em;
    
    @SuppressWarnings("unchecked")
	public List<Movie> findAll(){
		 List<Movie> users = em.createQuery("select m from Movie m")
	                .getResultList();

	        return users;
	};
	
	@SuppressWarnings("unchecked")
	public List<Movie> findByName(String name){		
		List<Movie> movies = em.createQuery("select m from Movie m where title = :name")
	                .setParameter("name", name)
	                .getResultList();

	    return movies;
	};
	
	@SuppressWarnings("unchecked")
	public List<Movie> findByReleaseYearBetween(int releaseYear1,int releaseYear2) {
		List<Movie> movies = em.createQuery("select m from Movie m where m.releaseYear between :releaseYear1 and :releaseYear2")
                .setParameter("releaseYear1", releaseYear1)
                .setParameter("releaseYear2", releaseYear2)
                .getResultList();

        return movies;
	};
}
