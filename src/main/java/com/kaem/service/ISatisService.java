package com.kaem.service;

import com.kaem.entity.Satis;
import org.springframework.http.ResponseEntity;

public interface ISatisService {
    ResponseEntity insert(Satis satis);
}
