package br.com.tatu.projetovali.controller;


import br.com.tatu.projetovali.dto.LoginRequestDto;
import br.com.tatu.projetovali.dto.RegisterRequestDto;
import br.com.tatu.projetovali.dto.TokenResponseDTO;
import br.com.tatu.projetovali.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authService;



    @PostMapping("/register")
    public void register(@RequestBody @Valid RegisterRequestDto register) throws Exception{
       authService.register(register);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public TokenResponseDTO login(@RequestBody @Valid LoginRequestDto loginRequestDto) throws Exception{
        return authService.login(loginRequestDto);
    }



}
