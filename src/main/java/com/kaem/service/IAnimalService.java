package com.kaem.service;

import com.kaem.dto.GetAnimalListResponse;
import com.kaem.dto.JoinInformationResponse;
import com.kaem.entity.Animal;
import com.kaem.props.AjaxPullData;
import com.kaem.props.SearchData;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;


public interface IAnimalService {
    int insertOrUpdate(Animal animal);
    ResponseEntity list();
    List<GetAnimalListResponse> getAnimalList();
    Optional<Animal> getById(AjaxPullData data);
    List<JoinInformationResponse> findByCagCAdiContaining(String cadi);


}
