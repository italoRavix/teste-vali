package br.com.tatu.projetovali.service;
import br.com.tatu.projetovali.config.TokenProvider;
import br.com.tatu.projetovali.database.model.RolesEntity;
import br.com.tatu.projetovali.database.model.UsuarioEntity;
import br.com.tatu.projetovali.database.repository.RolesRepository;
import br.com.tatu.projetovali.database.repository.UsuarioRepository;
import br.com.tatu.projetovali.dto.LoginRequestDto;
import br.com.tatu.projetovali.dto.RegisterRequestDto;
import br.com.tatu.projetovali.dto.TokenResponseDTO;
import br.com.tatu.projetovali.typeEnum.RoleTypeEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@RequiredArgsConstructor
@Service
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final RolesRepository rolesRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    @Value("${jwt.expiration}")
    private long expirationTime;

    public void register(RegisterRequestDto dto)throws BadRequestException {
        UsuarioEntity usuario = usuarioRepository.findByNome(dto.getNome())
                .orElse(null);
        if(usuario != null){
            throw new BadRequestException("Usuario já cadastrado com esse nome");
        }
        RolesEntity role = rolesRepository.findBynome(RoleTypeEnum.ROLE_PADRAO.name())
                        .orElseGet(() -> rolesRepository.save(RolesEntity.builder()
                                        .nome(RoleTypeEnum.ROLE_PADRAO.name())
                                         .build()
                        ));
        usuarioRepository.save(UsuarioEntity.builder()
                        .nome(dto.getNome())
                        .senha(passwordEncoder.encode(dto.getSenha()))
                        .roles(Set.of(role))
                .build());
    }


    public TokenResponseDTO login(LoginRequestDto loginDto) throws Exception{
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getNome(), loginDto.getSenha())
            );

            String token = tokenProvider.gerarToken(authentication);
            return TokenResponseDTO.builder()
                    .token(token)
                    .type("Bearer")
                    .expiration(expirationTime)
                    .build();
        }catch (BadCredentialsException e){
            throw new BadRequestException("Credenciais inválidas");
        }catch (Exception e){
            throw new Exception("Erro interno inesperado: " + e.getMessage());
        }
    }








}
