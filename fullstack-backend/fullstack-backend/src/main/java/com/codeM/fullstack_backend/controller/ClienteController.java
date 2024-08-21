package com.codeM.fullstack_backend.controller;

import com.codeM.fullstack_backend.exception.ClienteNotFoundException;
import com.codeM.fullstack_backend.model.Cliente;
import com.codeM.fullstack_backend.repository.ClienteRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/cliente")
    Cliente newCliente(@RequestBody Cliente newCliente){
        return clienteRepository.save(newCliente);

    }
    @GetMapping("/clientes")
    List<Cliente> getAllClientes(){
        return clienteRepository.findAll();
    }

    @GetMapping("/cliente/{id}")
    Cliente getClienteById(@PathVariable Long id){
        return clienteRepository.findById(id)
                .orElseThrow(()->new ClienteNotFoundException(id));
    }

    @PutMapping("/cliente/{id}")
    Cliente updateCliente(@RequestBody Cliente newCliente,@PathVariable Long id){
        return clienteRepository.findById(id)
                .map(cliente -> {
                    cliente.setName(newCliente.getName());
                    cliente.setLastname(newCliente.getLastname());
                    return clienteRepository.save(cliente);
                }).orElseThrow(()->new ClienteNotFoundException(id));
    }

    @DeleteMapping("/cliente/{id}")
        String deleteCliente(@PathVariable Long id){
            if(!clienteRepository.existsById(id)){
                throw new ClienteNotFoundException(id);

            }
            clienteRepository.deleteById(id);
            return "Cliente con id" + id + "ha sido eliminado";

        }


}
