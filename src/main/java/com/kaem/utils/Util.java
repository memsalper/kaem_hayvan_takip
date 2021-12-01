package com.kaem.utils;

import com.kaem.entity.UserInfo;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class Util {

    final HttpServletRequest req;
    public Util( HttpServletRequest req ) {
        this.req = req;
    }

    public String control( String page ) {

        boolean status = req.getSession().getAttribute("user") == null;
        if ( !status ) {
            return page;
        }

        return "redirect:/login";
    }


    public UserInfo info() {
        UserInfo us = new UserInfo();
        Object objUser = req.getSession().getAttribute("user");

        if ( objUser != null ) {
            if (objUser instanceof UserInfo) {
                us = (UserInfo) objUser;
            }
        }
        return us;
    }


    public String logout() {

        // all session remove
        req.getSession().invalidate();

        // single session remove
        req.getSession().removeAttribute("user");

        return "redirect:/login";
    }


}
