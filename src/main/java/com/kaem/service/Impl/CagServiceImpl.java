package com.kaem.service.Impl;

import com.kaem.entity.Cag;
import com.kaem.repository.CagRepository;
import com.kaem.service.ICagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class CagServiceImpl implements ICagService {


    final CagRepository cRepo;

    public CagServiceImpl(CagRepository cRepo) {
        this.cRepo = cRepo;
    }

    public ResponseEntity insert(Cag cag){
        Map<String,Object> hm = new LinkedHashMap<>();
        hm.put("status",true);
        hm.put("results",cRepo.save(cag));
        return new ResponseEntity(hm, HttpStatus.OK);
    }

    @Override
    public List<Cag> list() {
        List<Cag> ls = cRepo.findAll();
        return ls;
    }
}
