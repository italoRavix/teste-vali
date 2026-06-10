package br.com.tatu.projetovali.database.repository;


import br.com.tatu.projetovali.database.model.PontoTuristicoEntity;
import br.com.tatu.projetovali.dto.PontoTuristicoDto;
import br.com.tatu.projetovali.typeEnum.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PontoTuristicoRepository extends JpaRepository<PontoTuristicoEntity, Integer> {

List<PontoTuristicoEntity> findAllByCategoria (Categoria categoria);

PontoTuristicoEntity findByNome (String nome);

void deleteByNome(String nome);

}
