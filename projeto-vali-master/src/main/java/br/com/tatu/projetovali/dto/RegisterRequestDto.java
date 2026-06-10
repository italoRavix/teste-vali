package br.com.tatu.projetovali.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString


public class RegisterRequestDto {

    @NotBlank
    private String nome;

    @NotBlank
    private String senha;



}
