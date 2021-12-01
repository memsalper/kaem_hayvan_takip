package com.kaem.repository.Impl;

import com.kaem.dto.GetAnimalListResponse;
import com.kaem.entity.Animal;
import com.kaem.entity.Cag;
import com.kaem.entity.Irk;
import com.kaem.repository.CustomAnimalRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import java.util.Arrays;
import java.util.List;

public class CustomAnimalRepositoryImpl implements CustomAnimalRepository {

    @Autowired
    EntityManager entityManager;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<GetAnimalListResponse> getAnimalList() {
        CriteriaBuilder cb=entityManager.getCriteriaBuilder();
        CriteriaQuery cq= cb.createQuery(GetAnimalListResponse.class);
        Root<Animal> r=cq.from(Animal.class);
        Join<Animal, Cag> joinCag= r.join("cag");
        Join<Animal, Irk> joinIrk= r.join("irk");
        cq.multiselect(r.get("ulusalNo").alias("ulusalNo"), joinCag.get("cAdi"), joinIrk.get("iAdi"));
        TypedQuery<GetAnimalListResponse> tq=entityManager.createQuery(cq);
        List<GetAnimalListResponse> ls = tq.getResultList();

        return Arrays.asList(modelMapper.map(tq.getResultList(),GetAnimalListResponse[].class));
    }
}
