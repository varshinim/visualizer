package com.visualizer.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * An example of an application-specific exception. Defined here for convenience
 * as we don't have a real domain model or its associated business logic.
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class IllegalArgumentException extends RuntimeException {

	/**
	 * Unique ID for Serialized object
	 */
	private static final long serialVersionUID = -8790211652911971729L;

	public IllegalArgumentException(String reason) {
		super(reason);
	}
}
