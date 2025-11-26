package com.example.pokemon.exception;

public class ApiException extends RuntimeException {
    public ApiException(String message){
        super(message);
    }
}
