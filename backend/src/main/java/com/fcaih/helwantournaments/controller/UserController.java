package com.fcaih.helwantournaments.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fcaih.helwantournaments.model.User;
import com.fcaih.helwantournaments.model.User.UserRole;
import com.fcaih.helwantournaments.service.UserService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> saveUser(@RequestBody User User) {
        User.setRole(UserRole.PLAYER);
        return new ResponseEntity<>(userService.saveUser(User), HttpStatus.CREATED);
    }

    @PutMapping("/{username}/username")
    public ResponseEntity<HttpStatus> updateUserUsername(@PathVariable String username, @RequestBody User user) {
        userService.updateUserUsername(username, user.getUsername());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{username}/email")
    public ResponseEntity<HttpStatus> updateUserEmail(@PathVariable String username, @RequestBody User user) {
        userService.updateUserEmail(username, user.getEmail());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}