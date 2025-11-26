package com.example.pokemon.cache;

import java.util.LinkedHashMap;
import java.util.Map;

public class InMemoryCache<K, V> {
    private final long expiryMillis;
    private final int maxSize;
    private final Map<K, CacheItem<V>> cache;


    public InMemoryCache(long expiryMillis, int maxSize){
        this.expiryMillis = expiryMillis;
        this.maxSize = maxSize;

        this.cache = new LinkedHashMap<>(){
            @Override
            protected boolean removeEldestEntry(Map.Entry<K, CacheItem<V>> eldest){
                return size() > maxSize;
            }
        };
    }

    public synchronized void put(K key, V value){
        cache.put(key, new CacheItem<>(value));
    }

    public synchronized V get(K key){
        CacheItem<V> item = cache.get(key);
        if(item == null) return null;

        if((System.currentTimeMillis() - item.timestamp) > expiryMillis){
            cache.remove(key);
            return null;
        }

        return item.value;
    }

    private static class CacheItem<T>{
        final T value;
        final long timestamp;

        CacheItem(T value){
            this.value = value;
            this.timestamp = System.currentTimeMillis();
        }
    }

}
