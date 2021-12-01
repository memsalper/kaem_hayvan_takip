package com.kaem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kaem.enums.EnumAnimalState;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ApiModel(value = "Animals Data Transfer Object")
@JsonIgnoreProperties(ignoreUnknown = true)
public class GetAnimalListResponse {

    @ApiModelProperty(required = true)
    private int id;
    @ApiModelProperty(required = true)
    @NonNull
    private int ulusalNo;
    @ApiModelProperty(required = true)
    @NonNull
    private String iAdi;
    @ApiModelProperty(required = true)
    @NonNull
    private String cAdi;
    @ApiModelProperty(required = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dogumTarihi;
    @ApiModelProperty(required = true)
    private int isletmeNo;
    @ApiModelProperty(required = true)
    private double dogumAgirlik;
    @ApiModelProperty(required = true)
    private double skcAgirlik;
    @ApiModelProperty(required = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date tartimTarihi;
    @ApiModelProperty(required = true)
    private String durumu;
    @ApiModelProperty(required = true)
    private String aciklama;
    @ApiModelProperty(required = true)
    private EnumAnimalState stateAnimal;

}
