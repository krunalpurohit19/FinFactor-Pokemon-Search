package com.example.pokemon.service;

import com.example.pokemon.cache.InMemoryCache;
import com.example.pokemon.dto.PokemonResponse;
import com.example.pokemon.exception.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.json.JSONObject;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class PokemonService {

    @Autowired
    private RestTemplate restTemplate;

    private final InMemoryCache<String, PokemonResponse> cache = new InMemoryCache<>(10*60*1000,50);

    public PokemonResponse getPokemon(String name){
        name = name.toLowerCase();

        //check cache
        PokemonResponse cached = cache.get(name);
        if(cached != null) return cached;

        //Fetch API
        String url = "https://pokeapi.co/api/v2/pokemon/" + name;

        try{
            String apiResponse = restTemplate.getForObject(url, String.class);
            JSONObject json = new JSONObject(apiResponse);

            PokemonResponse response = mapToDto(json);
            cache.put(name, response);

            return response;
        }catch(Exception e){
            throw new ApiException("Pokemon '" + name + "' not found");
        }
    }

    private PokemonResponse mapToDto(JSONObject json){
        String imageUrl = json.getJSONObject("sprites").optString("front_default", "");

        List<String> types = json.getJSONArray("types")
                .toList()
                .stream()
                .map(obj -> ((Map<?,?>)obj).get("type"))
                .map(t -> ((Map<?,?>)t).get("name").toString())
                .collect(Collectors.toList());

        List<String> abilities = json.getJSONArray("abilities")
                .toList()
                .stream()
                .map(obj -> ((Map<?,?>)obj).get("ability"))
                .map(t -> ((Map<?,?>)t).get("name").toString())
                .collect(Collectors.toList());

        List<Integer> stats = json.getJSONArray("stats")
                .toList()
                .stream()
                .map(obj -> ((Map<?,?>)obj).get("base_stat"))
                .map(stat -> Integer.parseInt(stat.toString()))
                .collect(Collectors.toList());

        return new PokemonResponse(
                json.getString("name"),
                json.getInt("height"),
                json.getInt("weight"),
                imageUrl,
                types,
                abilities,
                stats
        );
    }
}
