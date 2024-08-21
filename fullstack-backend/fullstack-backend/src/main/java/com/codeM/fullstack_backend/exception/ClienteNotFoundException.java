package com.codeM.fullstack_backend.exception;

public class ClienteNotFoundException extends RuntimeException{

    public ClienteNotFoundException(Long id){
        super("No se encontro el usuario");
    }
}
