package br.com.tatu.projetovali.database.repository;

import br.com.tatu.projetovali.database.model.RolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolesRepository extends JpaRepository <RolesEntity,Integer> {

   Optional<RolesEntity> findBynome (String nome);
}
