package com.kaem.controller;


import com.kaem.entity.Irk;
import com.kaem.service.IIrkService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/irk")
public class IrkController {
    final IIrkService iService;

    public IrkController(IIrkService iService) {
        this.iService = iService;
    }
    @PostMapping("/insert")
    public ResponseEntity insert(@RequestBody Irk irk){
        return iService.insert(irk);
    }

    @GetMapping("/list")
    @ResponseBody
    public List<Irk> list(){
        List<Irk> ls = iService.list();
        return  ls;
    }

}
