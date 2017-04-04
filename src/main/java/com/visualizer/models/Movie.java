package com.visualizer.models;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "movies")
public class Movie implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer id;
	private String title;
	private Integer releaseYear;
	private Set<Locations> locations;
	private String productionCompany;
	private String distributor;
	private String director;
	private String writer;
	private String actor1;
	private String actor2;
	private String actor3;

	public Movie() {
		
	}
	
	public Movie(String title, Integer releaseYear, Set<Locations> locations, String productionCompany, String distributor, String director, String writer, String actor1,String actor2,String actor3) {
		this.setTitle(title);
		this.setReleaseYear(releaseYear);
		this.setLocations(locations);
		this.setProductionCompany(productionCompany);
		this.setDistributor(distributor);
		this.setDirector(director);
		this.setWriter(writer);
		this.setActor1(actor1);
		this.setActor2(actor2);
		this.setActor3(actor3);
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getProductionCompany() {
		return productionCompany;
	}

	public void setProductionCompany(String productionCompany) {
		this.productionCompany = productionCompany;
	}

	public String getDistributor() {
		return distributor;
	}

	public void setDistributor(String distributor) {
		this.distributor = distributor;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public String getActor1() {
		return actor1;
	}

	public void setActor1(String actor1) {
		this.actor1 = actor1;
	}

	public String getActor2() {
		return actor2;
	}

	public void setActor2(String actor2) {
		this.actor2 = actor2;
	}

	public String getActor3() {
		return actor3;
	}

	public void setActor3(String actor3) {
		this.actor3 = actor3;
	}

	public String getTitle() {
		return title;
	}
 
	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getReleaseYear() {
		return releaseYear;
	}

	public void setReleaseYear(Integer releaseYear) {
		this.releaseYear = releaseYear;
	}
	
	@OneToMany(fetch = FetchType.LAZY) 
	@JoinColumn(name="moviesId")
	public Set<Locations> getLocations() {
		return locations;
	}

	public void setLocations(Set<Locations> locations) {
		this.locations = locations;
	}
}

