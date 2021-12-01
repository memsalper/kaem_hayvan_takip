package com.kaem.service.Impl;

import com.kaem.entity.OlumKesim;
import com.kaem.repository.OlumKesimRepository;
import com.kaem.service.IOlumKesimService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.Map;

public class OlumKesimServiceImpl implements IOlumKesimService {
    final OlumKesimRepository oRepo;

    public OlumKesimServiceImpl(OlumKesimRepository oRepo) {
        this.oRepo = oRepo;
    }

    @Override
    public ResponseEntity insert(OlumKesim olumKesim) {
        Map<String,Object> hm = new LinkedHashMap<>();
        hm.put("status",true);
        hm.put("results",oRepo.save(olumKesim));
        return new ResponseEntity(hm, HttpStatus.OK);
    }
}
