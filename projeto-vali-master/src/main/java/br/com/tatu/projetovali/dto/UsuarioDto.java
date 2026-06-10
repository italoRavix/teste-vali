package br.com.tatu.projetovali.dto;

import jakarta.persistence.Entity;
import lombok.*;

@Getter
@Setter@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UsuarioDto {


    private String nome;
    private String senha;
    private String tipo;


}
