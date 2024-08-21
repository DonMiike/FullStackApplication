package com.codeM.fullstack_backend.repository;

import com.codeM.fullstack_backend.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdenRepository extends JpaRepository<Orden, Long> {

}
