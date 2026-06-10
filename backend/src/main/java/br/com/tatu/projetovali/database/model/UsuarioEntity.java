package br.com.tatu.projetovali.database.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.AnyDiscriminatorImplicitValues;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@ToString
public class UsuarioEntity implements UserDetails {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_usuario")
    private Integer id;
    @Column(name = "username", unique = true)
    private String nome;
    private String senha;

    @JsonIgnore
    @ManyToMany(mappedBy = "usuarios")
    private Set<PontoTuristicoEntity> pontosCurtidos = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public @Nullable String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return nome;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_roles",
              joinColumns =   @JoinColumn(name = "id_usuario"),
              inverseJoinColumns = @JoinColumn(name = "id_roles"))
    private Set<RolesEntity> roles = new HashSet<>();



}
