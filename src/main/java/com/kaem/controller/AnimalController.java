package com.kaem.controller;


import com.kaem.dto.GetAnimalListResponse;
import com.kaem.dto.GetColumn;
import com.kaem.dto.JoinInformationResponse;
import com.kaem.entity.Animal;
import com.kaem.enums.EnumAnimalState;
import com.kaem.props.AjaxPullData;
import com.kaem.props.SearchData;
import com.kaem.repository.AnimalRepository;
import com.kaem.service.IAnimalService;
import org.aspectj.weaver.loadtime.Aj;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/animal")
public class AnimalController {

    final IAnimalService aService;
    final AnimalRepository aRepo;

    public AnimalController(IAnimalService aService, AnimalRepository aRepo) {
        this.aService = aService;
        this.aRepo = aRepo;
    }
    /*@PostMapping("/insert")
    public ResponseEntity insert(@RequestBody Animal animal){
        return aService.insert(animal);
    }*/

    @GetMapping("/listAll")
    public ResponseEntity listAll(){
        return aService.list();
    }

    @GetMapping("/list")
    public ResponseEntity<List<GetAnimalListResponse>> getAnimalList(){
        List<GetAnimalListResponse> ls = aService.getAnimalList();
        return ResponseEntity.ok(ls);
    }
    @GetMapping("/joinDeneme")
    @ResponseBody
    public List<JoinInformationResponse> joinDeneme(){
        List<JoinInformationResponse> ls = aRepo.getJoinInformation();
        return ls;
    }

    @PostMapping("/updateAnimal")
    @ResponseBody
    public Optional<Animal> updateAnimal(@RequestBody AjaxPullData pullData){
        Optional<Animal> ls = aService.getById(pullData);
        return ls;
    }

    /*@PostMapping("/searchAnimal")
    @ResponseBody
    public List<JoinInformationResponse> searchAnimal(@RequestBody SearchData searchData){
        List<JoinInformationResponse> ls = aService.findByCagCAdiContaining(searchData.getCadi());
        return ls;
    }*/

    @PostMapping("/searchAnimal")
    @ResponseBody
    public List<Animal> searchAnimal(@RequestBody SearchData searchData){
        List<Animal> ls = aRepo.findByCag_CAdiContainingIgnoreCase(searchData.getCadi());
        return ls;
    }

    @GetMapping("/animals")
    public String animals(Model model) {
        List<JoinInformationResponse> ls = aRepo.getJoinInformation();
        model.addAttribute("animals", ls);
        return "home";
    }

    @GetMapping("/deneme")
    public ResponseEntity<List<GetColumn>> deneme(){
        List<GetColumn> ls = aRepo.findAllBy();
        return ResponseEntity.ok(ls);
    }


    @GetMapping("/stateAnimal")
    @ResponseBody
    public List<EnumAnimalState> stateAnimal(){
        List<EnumAnimalState> ls= Arrays.asList(EnumAnimalState.values());
        return ls;
    }

    @PostMapping("/updateOrInsert")
    @ResponseBody
    public int updateOrInsert(@RequestBody Animal animal){

        return aService.insertOrUpdate(animal);
    }


}
