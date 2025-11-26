package com.example.pokemon.controller;

import com.example.pokemon.dto.PokemonResponse;
import com.example.pokemon.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pokemon")
@CrossOrigin(origins = "http://localhost:5173")
public class PokemonController {

    @Autowired
    private PokemonService pokemonService;

    @GetMapping("/{name}")
    public PokemonResponse getPokemon(@PathVariable String name){
        return pokemonService.getPokemon(name);
    }
}
