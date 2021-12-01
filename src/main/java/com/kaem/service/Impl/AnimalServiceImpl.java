package com.kaem.service.Impl;

import com.kaem.dto.GetAnimalListResponse;
import com.kaem.dto.JoinInformationResponse;
import com.kaem.entity.Animal;
import com.kaem.props.AjaxPullData;
import com.kaem.props.SearchData;
import com.kaem.repository.AnimalRepository;
import com.kaem.service.IAnimalService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnimalServiceImpl implements IAnimalService {
    private final AnimalRepository aRepo;
    private final ModelMapper modelMapper;

    public AnimalServiceImpl(AnimalRepository aRepo, ModelMapper modelMapper) {
        this.aRepo = aRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public int insertOrUpdate(Animal animal) {
       int id = aRepo.saveAndFlush(animal).getId();
        return id;
    }

    @Override
    public ResponseEntity list() {
        Map<String,Object> hm = new LinkedHashMap<>();
        hm.put("status",true);
        hm.put("results",aRepo.findAll());
        return new ResponseEntity(hm, HttpStatus.OK);
    }

    @Override
    public List<GetAnimalListResponse> getAnimalList() {
        List<GetAnimalListResponse> ls = aRepo.getAnimalList();
        return Arrays.asList(modelMapper.map(ls,GetAnimalListResponse[].class));
    }

    @Override
    public Optional<Animal> getById(AjaxPullData data) {
        Optional<Animal> animal=aRepo.findById(data.getId());
        return animal;
    }

    @Override
    public List<JoinInformationResponse> findByCagCAdiContaining(String cadi){
        return aRepo.searchByCag_CAdi(cadi);
    }
}
