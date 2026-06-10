package br.com.tatu.projetovali.database.repository;

import br.com.tatu.projetovali.database.model.UsuarioEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {


    Optional<UsuarioEntity> findByNome(String nome);

    Optional<UsuarioEntity> findById(Integer id);

}
