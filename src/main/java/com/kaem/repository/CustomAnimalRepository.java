package com.kaem.repository;

import com.kaem.dto.GetAnimalListResponse;
import com.kaem.entity.Animal;

import java.util.List;

public interface CustomAnimalRepository {
    List<GetAnimalListResponse> getAnimalList();
}
