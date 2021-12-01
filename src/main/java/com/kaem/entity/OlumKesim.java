package com.kaem.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class OlumKesim extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int oid;
    @OneToOne
    private Animal animal;
    @Temporal(TemporalType.TIMESTAMP)
    private Date olumTarihi;
    @Column(columnDefinition = "TEXT")
    private String sebebi;
    private Double et;
    private Double bas;
    private Double ciger;
    private int deri;
    private String otopsiVetHek;


}

