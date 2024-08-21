package com.codeM.fullstack_backend.repository;

import com.codeM.fullstack_backend.model.Articulo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticuloRepository extends JpaRepository<Articulo, Long> {

}
