package com.visualizer.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
public class Locations implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2L;


	private Integer id;	
	private String locationName;
	private String funFacts;
	
	//private Movie movie;
	
    public Locations() {
		
	}

	public Locations(String locationName, String funFacts) {
		this.setLocationName(locationName);
		this.setFunFacts(funFacts);
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	public String getFunFacts() {
		return funFacts;
	}

	public void setFunFacts(String funFacts) {
		this.funFacts = funFacts;
	}

//	@ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "moviesId")
//	public Movie getMovie() {
//		return movie;
//	}
//
//	public void setMovie(Movie movie) {
//		this.movie = movie;
//	}
}
