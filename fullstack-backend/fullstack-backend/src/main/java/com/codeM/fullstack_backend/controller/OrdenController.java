package com.codeM.fullstack_backend.controller;

import com.codeM.fullstack_backend.model.Articulo;
import com.codeM.fullstack_backend.model.Orden;
import com.codeM.fullstack_backend.model.OrdenArticulo;
import com.codeM.fullstack_backend.repository.ArticuloRepository;
import com.codeM.fullstack_backend.repository.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class OrdenController {

    @Autowired
    private OrdenRepository ordenRepository;
    @Autowired
    private ArticuloRepository articuloRepository;

    @PostMapping("/orden")
    public ResponseEntity<Object> newOrden(@RequestBody Orden newOrderRequest) {
        System.out.println("Front");
        System.out.println(newOrderRequest);
        Orden orden = new Orden();
        orden.setCodigo(newOrderRequest.getCodigo());
        orden.setFecha(newOrderRequest.getFecha());
        orden.setCliente(newOrderRequest.getCliente());

        for (OrdenArticulo orderArticle : newOrderRequest.getOrderArticles()) {
            Long articleId = orderArticle.getId();
            Articulo article = articuloRepository.findById(articleId)
                    .orElseThrow(() -> new RuntimeException("Article not found with id: " + articleId));

            Integer requestQuantity= orderArticle.getCantidad();
            Integer availableStock= article.getStock();

            if (requestQuantity>availableStock){
                return ResponseEntity.badRequest().body("No hay suficiente cantidad"+ article.getNombre());
            }

            OrdenArticulo newOrderArticle = new OrdenArticulo();
            newOrderArticle.setOrder(orden);
            newOrderArticle.setArticulo(article);
            newOrderArticle.setCantidad(orderArticle.getCantidad());

            article.setStock(availableStock-requestQuantity);
            articuloRepository.save(article);


            orden.getOrderArticles().add(newOrderArticle);
        }


        Orden savedOrder = ordenRepository.save(orden);


        return ResponseEntity.ok(savedOrder);
    }
    @GetMapping("/ordenes")
    public List<Orden> getAllOrdenes() {
        return ordenRepository.findAll();
    }

    @GetMapping("/orden/{id}")
    public Orden getOrdenById(@PathVariable Long id) {
        return ordenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden not found: " + id));
    }

    @PutMapping("/orden/{id}")
    public Orden updateOrden(@RequestBody Orden newOrden, @PathVariable Long id) {
        return ordenRepository.findById(id)
                .map(orden -> {
                    orden.setCodigo(newOrden.getCodigo());
                    orden.setFecha(newOrden.getFecha());
                 //   orden.set(newOrden.getArticulos());
                    return ordenRepository.save(orden);
                }).orElseThrow(() -> new RuntimeException("Orden not found: " + id));
    }

    @DeleteMapping("/orden/{id}")
    public String deleteOrden(@PathVariable Long id) {
        if (!ordenRepository.existsById(id)) {
            throw new RuntimeException("Orden not found: " + id);
        }
        ordenRepository.deleteById(id);
        return "Orden with id " + id + " has been deleted";
    }
}
