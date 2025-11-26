package com.example.pokemon.dto;

import java.util.List;

public class PokemonResponse {
    private String name;
    private int height;
    private int weight;
    private String imageUrl;
    private List<String> types;
    private List<String> abilities;
    private List<Integer> stats;

    public PokemonResponse(){}

    public PokemonResponse(String name, int height, int weight, String imageUrl, List<String> types, List<String> abilities, List<Integer> stats){
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.imageUrl = imageUrl;
        this.types = types;
        this.abilities = abilities;
        this.stats = stats;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }


    public int getHeight() {
        return height;
    }
    public void setHeight(int height) {
        this.height = height;
    }

    public int getWeight() {
        return weight;
    }
    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getTypes() {
        return types;
    }
    public void setTypes(List<String> types) {
        this.types = types;
    }

    public List<String> getAbilities() {
        return abilities;
    }
    public void setAbilities(List<String> abilities) {
        this.abilities = abilities;
    }

    public List<Integer> getStats() {
        return stats;
    }
    public void setStats(List<Integer> stats) {
        this.stats = stats;
    }
}
