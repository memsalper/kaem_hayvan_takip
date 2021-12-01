package com.kaem.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Satis extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sid;
    @OneToOne
    private Animal animal;
    @Temporal(TemporalType.TIMESTAMP)
    private Date satisTarihi;
    private String vasfi;


}

