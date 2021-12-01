package com.kaem.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Irk Data Transfer Object")
public class GetIrkListResponse {
    @ApiModelProperty(required = true)
    private int iid;
    @ApiModelProperty(required = true)
    private String iAdi;
}
