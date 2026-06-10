package br.com.tatu.projetovali.dto;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class TokenResponseDTO {

    private String token;
    private String type;
    private Long expiration;
    private String role;

}
