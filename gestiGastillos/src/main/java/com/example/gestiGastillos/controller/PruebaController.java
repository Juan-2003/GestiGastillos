package com.example.gestiGastillos.controller;

import com.example.gestiGastillos.dto.PruebaEntradaDTO;
import com.example.gestiGastillos.dto.UserDTO;
import com.example.gestiGastillos.repository.UserRepository;
import com.example.gestiGastillos.service.PruebaService;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/prueba")
public class PruebaController {
    @Autowired
    private PruebaService pruebaService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public void prueba(@RequestBody PruebaEntradaDTO pruebaEntradaDTO){
        //return ResponseEntity.ok(userRepository.findAll(pageable).map(UserDTO::new));
        pruebaService.prueba(pruebaEntradaDTO);
    }

    /*@GetMapping
    public ResponseEntity<Page<DatosListadoMedico>> listadoMedicos(@PageableDefault(size = 2) Pageable paginacion){
        //return medicoRepository.findAll(paginacion).map(DatosListadoMedico::new);
        return ResponseEntity.ok(medicoRepository.findByActivoTrue(paginacion).map(DatosListadoMedico::new));

    }*/
}
