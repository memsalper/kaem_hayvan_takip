package com.kaem.service.Impl;

import com.kaem.entity.Satis;
import com.kaem.repository.SatisRepository;
import com.kaem.service.ISatisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.Map;

public class SatisServiceImpl implements ISatisService {
    final SatisRepository sRepo;

    public SatisServiceImpl(SatisRepository sRepo) {
        this.sRepo = sRepo;
    }

    @Override
    public ResponseEntity insert(Satis satis) {
        Map<String,Object> hm = new LinkedHashMap<>();
        hm.put("status",true);
        hm.put("results",sRepo.save(satis));
        return new ResponseEntity(hm, HttpStatus.OK);
    }
}
