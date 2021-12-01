package com.kaem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kaem.dto.GetColumn;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Cag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;
    private String cAdi;
}
