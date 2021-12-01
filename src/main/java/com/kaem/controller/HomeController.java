package com.kaem.controller;

import com.kaem.entity.UserInfo;
import com.kaem.service.IUserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.kaem.utils.Util;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.Locale;

@Controller
public class HomeController {

    final IUserService uService;
    final Util util;

    public HomeController(IUserService uService, Util util) {
        this.uService = uService;
        this.util = util;
    }

    @RequestMapping("/home")
    public String root(Locale locale) {
        return "home";
    }

    @RequestMapping({"/","/login"})
    public String login() {
        return "login";
    }

    @GetMapping("/logout")
    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login";
    }

/*
    @GetMapping("/")
    public String login() {
        return "login";
    }


    @PostMapping("/login")
    public String login(UserInfo user) {
        if(uService.login(user))
            return "redirect:/home";


        return "/";
    }

   */


}
