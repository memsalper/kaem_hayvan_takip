package com.kaem.service;

import com.kaem.entity.Muayene;
import org.springframework.http.ResponseEntity;

public interface IMuayeneService  {
    ResponseEntity insert(Muayene muayene);
}

