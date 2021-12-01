package com.kaem.dto;

import org.springframework.beans.factory.annotation.Value;

public interface GetColumn {
    int getUlusalNo();
    @Value("#{target.cag.cAdi}")
    String getcAdi();
}
