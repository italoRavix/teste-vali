package br.com.tatu.projetovali.database.model;


import br.com.tatu.projetovali.typeEnum.Categoria;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

@Table(name = "ponto_turistico")
public class PontoTuristicoEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ponto_id")
    @Id
    private Integer id;

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(length = 150, nullable = false)
    private String descricao;


    @Column(length = 150, nullable = false)
    private String bairro;


    @Column(length = 150, nullable = false)
    private String rua;


    @Column(name = "hora_abertura")
    private LocalTime horaAbertura;



    @Column(name = "hora_fechamento")
    private LocalTime horaFechamento;


    @Enumerated(EnumType.STRING)
    private Categoria categoria;


   @Column(name = "numero_curtidas")
   private Long numeroCurtidas;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_criador", nullable = false)
    private UsuarioEntity idCriador;



    @ElementCollection
    @CollectionTable(name = "telefone",joinColumns = @JoinColumn(name = "ponto_id"))
    @Column(name = "telefone")
    private List<String> telefone;


    @ElementCollection
    @CollectionTable(name = "imagem",joinColumns = @JoinColumn(name = "ponto_id"))
    @Column(name = "url")
    private List<String> imagem;


    @ElementCollection
    @CollectionTable(name = "email",joinColumns = @JoinColumn(name = "ponto_id"))
    @Column(name = "email", unique = true)
    private List<String> email;


    @ManyToMany
    @JoinTable(
            name = "curtidas",
            joinColumns =  @JoinColumn(name = "ponto_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )

    private Set<UsuarioEntity> usuarios = new HashSet<>();




}
