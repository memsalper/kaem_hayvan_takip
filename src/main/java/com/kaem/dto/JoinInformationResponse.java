package com.kaem.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kaem.enums.EnumAnimalState;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JoinInformationResponse {
    private int id;
    private String aciklama;
    private double dogumAgirlik;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private Date dogumTarihi;
    private String durumu;
    private int isletmeNo;
    private EnumAnimalState stateAnimal;
    private int ulusalNo;
    private String cAdi;
    private String iAdi;
}
