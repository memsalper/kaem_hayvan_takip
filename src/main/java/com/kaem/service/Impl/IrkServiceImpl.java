package com.kaem.service.Impl;

import com.kaem.entity.Irk;
import com.kaem.repository.IrkRepository;
import com.kaem.service.IIrkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
@Service
public class IrkServiceImpl implements IIrkService {
    final IrkRepository iRepo;

    public IrkServiceImpl(IrkRepository iRepo) {
        this.iRepo = iRepo;
    }

    @Override
    public ResponseEntity insert(Irk irk) {

        Map<String,Object> hm = new LinkedHashMap<>();
        hm.put("status",true);
        hm.put("results",iRepo.save(irk));
        return new ResponseEntity(hm, HttpStatus.OK);
    }

    @Override
    public List<Irk> list() {

        List<Irk> ls = iRepo.findAll();
        return ls;
    }
}
