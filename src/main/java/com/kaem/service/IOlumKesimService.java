package com.kaem.service;

import com.kaem.entity.OlumKesim;
import org.springframework.http.ResponseEntity;

public interface IOlumKesimService {
    ResponseEntity insert(OlumKesim olumKesim);
}
