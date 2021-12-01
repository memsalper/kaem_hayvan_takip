package com.kaem.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Muayene extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mid;
    @Column(columnDefinition="TEXT")
    private String sikayet;
    private String teshis;
    private String lbk;
    private String ilac;
    private String cc;
    private String uygulamaAdim;
    private String veterinerHekim;
    @Column(columnDefinition="TEXT")
    private String sonuc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id")
    private Animal animal;

}
