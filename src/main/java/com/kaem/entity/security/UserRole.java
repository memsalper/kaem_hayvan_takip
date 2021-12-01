package com.kaem.entity.security;

import com.kaem.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor @ToString
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userRoleId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    private UserInfo userInfo;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    @EqualsAndHashCode.Exclude
    private Role role;


    public UserRole(UserInfo userInfo, Role role) {
        this.userInfo = userInfo;
        this.role = role;
    }



}
