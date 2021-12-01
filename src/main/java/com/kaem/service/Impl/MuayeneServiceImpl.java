package com.kaem.service.Impl;

import com.kaem.entity.Muayene;
import com.kaem.repository.MuayeneRepository;
import com.kaem.service.IMuayeneService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
@Service
public class MuayeneServiceImpl implements IMuayeneService {
    final MuayeneRepository mRepo;

    public MuayeneServiceImpl(MuayeneRepository mRepo) {
        this.mRepo = mRepo;
    }

    @Override
    public ResponseEntity insert(Muayene muayene) {
        Map<String,Object> hm = new LinkedHashMap<>();
        hm.put("status",true);
        hm.put("results",mRepo.save(muayene));
        return new ResponseEntity(hm, HttpStatus.OK);
    }
}
