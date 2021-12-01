package com.kaem.service;

import com.kaem.entity.Cag;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface ICagService {
    ResponseEntity insert(Cag cag);
    List<Cag> list();
}
