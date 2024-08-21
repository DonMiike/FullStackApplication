package com.codeM.fullstack_backend.repository;

import com.codeM.fullstack_backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {

}
