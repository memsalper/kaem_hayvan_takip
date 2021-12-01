package com.kaem.service;

import com.kaem.entity.UserInfo;
import com.kaem.entity.security.UserRole;

import java.util.List;
import java.util.Map;
import java.util.Set;


public interface IUserService {
    UserInfo createUser(UserInfo user, Set<UserRole> userRoles);
    UserInfo saveUser (UserInfo user);
    List<UserInfo> listUser();
    boolean login(UserInfo user);

}
