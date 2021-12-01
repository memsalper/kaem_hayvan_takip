package com.kaem.repository;

import com.kaem.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserInfo, Integer> {
    UserInfo findByUsername(String username);
    //Optional<UserInfo> findUserInfoByUserId(long userId);
}
