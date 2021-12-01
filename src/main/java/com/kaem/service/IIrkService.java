package com.kaem.service;

import com.kaem.entity.Irk;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IIrkService  {
    ResponseEntity insert(Irk irk);
    List<Irk> list();
}

