package com.kaem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@MappedSuperclass
@EntityListeners(value={AuditingEntityListener.class})
public abstract class BaseEntity implements Serializable {

    @JsonIgnore
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;


    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;


    @UpdateTimestamp
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;


    @CreatedBy
    @Column(name = "updated_by")
    private String updatedBy;


    @Column(name = "status")
    private Boolean status=true;



}
