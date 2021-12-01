package com.kaem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Cag Data Transfer Object")
@JsonIgnoreProperties(ignoreUnknown = true)
public class GetCagListRepsonse {
    @ApiModelProperty(required = true)
    private int cid;
    @ApiModelProperty(required = true)
    private String cAdi;
}
