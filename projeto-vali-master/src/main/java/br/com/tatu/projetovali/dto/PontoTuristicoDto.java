package br.com.tatu.projetovali.dto;

import br.com.tatu.projetovali.database.model.UsuarioEntity;
import br.com.tatu.projetovali.typeEnum.Categoria;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalTime;
import java.util.List;




@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PontoTuristicoDto {

        private String nome;
        private String descricao;
        private String bairro;
        private String rua;
        private LocalTime horaAbertura;
        private LocalTime horaFechamento;
        private Categoria categoria;
        private Long numeroCurtidas;
        private List<String> telefone;
        private List<String> imagem;
        private List<String> email;
        @JsonProperty("idCriador")
        @JsonIgnore
        private Integer idCriador;








}
