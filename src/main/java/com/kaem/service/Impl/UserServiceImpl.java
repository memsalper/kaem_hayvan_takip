package com.kaem.service.Impl;


import com.kaem.entity.UserInfo;
import com.kaem.entity.security.UserRole;
import com.kaem.repository.RoleRepository;
import com.kaem.repository.UserRepository;
import com.kaem.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements IUserService {
    private static final Logger LOG = LoggerFactory.getLogger(IUserService.class);

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepo;
    final HttpServletRequest req;

    public UserServiceImpl(HttpServletRequest req) {
        this.req = req;
    }


    public UserInfo createUser(UserInfo user, Set<UserRole> userRoles) {
        final Logger LOG = LoggerFactory.getLogger(IUserService.class);

        UserInfo localUser = userRepo.findByUsername(user.getUsername());

        if (localUser != null) {
            LOG.info("User with username {} already exist. Nothing will be done. ", user.getUsername());
        } else {
            String encryptedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPassword);

            for (UserRole ur : userRoles) {
                roleRepo.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);


            localUser = userRepo.save(user);
        }

        return localUser;
    }

    public UserInfo saveUser (UserInfo user) {
        return userRepo.save(user);
    }

    public List<UserInfo> listUser(){
        return userRepo.findAll();
    }

    @Override
    public boolean login(UserInfo user) {
        UserInfo userf= userRepo.findByUsername(user.getUsername());
        boolean login= passwordEncoder.matches(user.getPassword(), userf.getPassword());
        if(login){
            Optional<UserInfo> opt= Optional.of(userf);
            req.getSession().setAttribute("user", opt.get());
        }
        return login;
    }


}
