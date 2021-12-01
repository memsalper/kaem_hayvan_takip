package com.kaem.controller;


import com.kaem.entity.Cag;
import com.kaem.service.ICagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cag")
public class CagController {


    final ICagService cService;

    public CagController(ICagService cService) {
        this.cService = cService;
    }

    @PostMapping("/insert")
    public ResponseEntity insert(@RequestBody Cag cag){
        return cService.insert(cag);
    }

    @GetMapping("/list")
    @ResponseBody
    public List<Cag> list(){
        List<Cag> ls= cService.list();
        return ls;
    }
}
