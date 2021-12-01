package com.kaem.controller;


import com.kaem.entity.UserInfo;
import com.kaem.entity.security.Role;
import com.kaem.entity.security.UserRole;
import com.kaem.service.IUserService;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/userWorks")
public class UserController {

    final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @Transactional
    @PostMapping("/create")
    public Map<Object,Object> create(@RequestParam UserInfo user) {
        Map<Object,Object> hm = new LinkedHashMap<>();

        Set<UserRole> ls = new HashSet<>();
        UserRole ur = new UserRole();
        Role r = new Role();
        r.setName("user");
        r.setRoleId(2);

        ur.setUserInfo(user);
        ur.setRole(r);
        ur.setUserRoleId(2);

        ls.add(ur);

        userService.createUser(user, ls);

        hm.put("Results",user);
        return hm;
    }

    @Transactional
    @PostMapping("/save")
    public Map<Object,Object> save(@RequestParam UserInfo user) {
        Map<Object,Object> hm = new LinkedHashMap<>();

        userService.saveUser(user);

        hm.put("Results",user);
        return hm;
    }

    @GetMapping("/list")
    public Map<Object,Object> list(){
        Map<Object,Object> hm = new LinkedHashMap<>();

        List<UserInfo> ls =  userService.listUser();
        hm.put("Results",ls );
        return hm;
    }
}
