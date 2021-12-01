package com.kaem.controller;


import com.kaem.entity.Muayene;
import com.kaem.service.IMuayeneService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/muayene")
public class MuayeneController {
    final IMuayeneService mService;

    public MuayeneController(IMuayeneService mService) {
        this.mService = mService;
    }
    @PostMapping("/insert")
    public ResponseEntity insert(@RequestBody Muayene muayene){
        return mService.insert(muayene);
    }
}
