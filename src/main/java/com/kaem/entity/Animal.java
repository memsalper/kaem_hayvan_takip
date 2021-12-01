package com.kaem.entity;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ser.Serializers;
import com.kaem.dto.GetColumn;
import com.kaem.enums.EnumAnimalState;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Animal extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    private Irk irk;

    @OneToOne
    private Cag cag;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date dogumTarihi;
    private int ulusalNo;
    private int isletmeNo;
    private double dogumAgirlik;
    private double skcAgirlik;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date tartimTarihi;
    private String durumu;
    @Column(columnDefinition="TEXT")
    private String aciklama;
    private EnumAnimalState stateAnimal;

    @OneToMany(
            fetch=FetchType.LAZY,
            cascade=CascadeType.ALL,
            mappedBy = "animal"
    )
    private List<Muayene> muayene = new ArrayList<>();



}
