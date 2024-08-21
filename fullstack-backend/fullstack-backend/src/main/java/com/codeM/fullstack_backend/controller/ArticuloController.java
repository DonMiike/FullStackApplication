package com.codeM.fullstack_backend.controller;

import com.codeM.fullstack_backend.model.Articulo;
import com.codeM.fullstack_backend.repository.ArticuloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ArticuloController {

    @Autowired
    private ArticuloRepository articuloRepository;

    @PostMapping("/articulo")
    public Articulo newArticulo(@RequestBody Articulo newArticulo) {
        return articuloRepository.save(newArticulo);
    }

    @GetMapping("/articulos")
    public List<Articulo> getAllArticulos() {
        return articuloRepository.findAll();
    }

    @GetMapping("/articulo/{id}")
    public Articulo getArticuloById(@PathVariable Long id) {
        return articuloRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Articulo not found: " + id));
    }

    @PutMapping("/articulo/{id}")
    public Articulo updateArticulo(@RequestBody Articulo newArticulo, @PathVariable Long id) {
        return articuloRepository.findById(id)
                .map(articulo -> {
                    articulo.setCodigo(newArticulo.getCodigo());
                    articulo.setNombre(newArticulo.getNombre());
                    articulo.setPrecio(newArticulo.getPrecio());
                    return articuloRepository.save(articulo);
                }).orElseThrow(() -> new RuntimeException("Articulo not found: " + id));
    }

    @DeleteMapping("/articulo/{id}")
    public String deleteArticulo(@PathVariable Long id) {
        if (!articuloRepository.existsById(id)) {
            throw new RuntimeException("Articulo not found: " + id);
        }
        articuloRepository.deleteById(id);
        return "Articulo with id " + id + " has been deleted";
    }
}
