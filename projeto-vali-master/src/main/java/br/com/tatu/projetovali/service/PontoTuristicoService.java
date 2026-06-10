package br.com.tatu.projetovali.service;


import org.springframework.util.ReflectionUtils;

import br.com.tatu.projetovali.database.model.PontoTuristicoEntity;
import br.com.tatu.projetovali.database.model.UsuarioEntity;
import br.com.tatu.projetovali.database.repository.PontoTuristicoRepository;
import br.com.tatu.projetovali.database.repository.UsuarioRepository;
import br.com.tatu.projetovali.dto.PontoTuristicoDto;
import br.com.tatu.projetovali.typeEnum.Categoria;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PontoTuristicoService {

    private final PontoTuristicoRepository pontoTuristicoRepository;
    private final UsuarioRepository usuarioRepository;

    public List<PontoTuristicoDto> findAll(){
        List<PontoTuristicoEntity> entidades = pontoTuristicoRepository.findAll();

        return entidades.stream()
                .map(this::converterParaDto)
                .toList();
    }

    public List<PontoTuristicoDto> findAllByCategoria(Categoria categoria) {
        List<PontoTuristicoEntity> entidades = pontoTuristicoRepository.findAllByCategoria(categoria);

        return entidades.stream()
                .map(this::converterParaDto)
                .toList();
    }

    public void deleteByNome(String nome){
        pontoTuristicoRepository.deleteByNome(nome);
    }

    public void savePonto(PontoTuristicoDto pt){
        UsuarioEntity criador = usuarioRepository.findById(pt.getIdCriador())
                .orElseThrow(() -> new RuntimeException("Usuário criador não encontrado no banco de dados!"));

        pontoTuristicoRepository.save(PontoTuristicoEntity.builder()
                .nome(pt.getNome())
                .email(pt.getEmail())
                .rua(pt.getRua())
                .bairro(pt.getBairro())
                .categoria(pt.getCategoria())
                .descricao(pt.getDescricao())
                .imagem(pt.getImagem())
                .telefone(pt.getTelefone())
                .idCriador(criador)
                .horaAbertura(pt.getHoraAbertura())
                .horaFechamento(pt.getHoraFechamento())
                .build());
    }

    public PontoTuristicoDto findByNome (String nome) {
        PontoTuristicoEntity entidade = pontoTuristicoRepository.findByNome(nome);
        return this.converterParaDto(entidade);
    }

    public void delete(Integer id){
        pontoTuristicoRepository.deleteById(id);
    }

    public PontoTuristicoDto getfindById(Integer id){
        PontoTuristicoEntity entidade = pontoTuristicoRepository.findById(id).orElse(null);
        return this.converterParaDto(entidade);
    }

    @Transactional
    public void curtirPonto(Integer idPonto, Integer idUsuario) {
        PontoTuristicoEntity ponto = pontoTuristicoRepository.findById(idPonto)
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado!"));
        UsuarioEntity usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        Long curtidasAtuais = ponto.getNumeroCurtidas() != null ? ponto.getNumeroCurtidas() : 0L;

        if (ponto.getUsuarios().contains(usuario)) {
            ponto.getUsuarios().remove(usuario);
            ponto.setNumeroCurtidas(Math.max(0, curtidasAtuais - 1));
        } else {
            ponto.getUsuarios().add(usuario);
            ponto.setNumeroCurtidas(curtidasAtuais + 1);
        }
        pontoTuristicoRepository.save(ponto);
    }

    public PontoTuristicoDto updatePontoByFields(Integer id, Map<String, Object> fields) {
        Optional<PontoTuristicoEntity> existingPonto = pontoTuristicoRepository.findById(id);
        if (existingPonto.isPresent()) {
            PontoTuristicoEntity entityToUpdate = existingPonto.get();
            fields.forEach((key, value) -> {
                Field field = ReflectionUtils.findField(PontoTuristicoEntity.class, key);
                if (field != null) {
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, entityToUpdate, value);
                }
            });

            PontoTuristicoEntity updatedEntity = pontoTuristicoRepository.save(entityToUpdate);

            return this.converterParaDto(updatedEntity);
        }
        return null;
    }

    private PontoTuristicoDto converterParaDto(PontoTuristicoEntity ponto) {
        if (ponto == null) {
            return null;
        }

        PontoTuristicoDto dto = new PontoTuristicoDto();
        dto.setNome(ponto.getNome());
        dto.setEmail(ponto.getEmail());
        dto.setRua(ponto.getRua());
        dto.setBairro(ponto.getBairro());
        dto.setCategoria(ponto.getCategoria());
        dto.setDescricao(ponto.getDescricao());
        dto.setImagem(ponto.getImagem());
        dto.setTelefone(ponto.getTelefone());
        dto.setHoraAbertura(ponto.getHoraAbertura());
        dto.setHoraFechamento(ponto.getHoraFechamento());

        return dto;
    }
}