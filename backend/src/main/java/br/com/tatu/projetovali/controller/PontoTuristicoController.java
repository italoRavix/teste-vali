package br.com.tatu.projetovali.controller;


import br.com.tatu.projetovali.database.model.PontoTuristicoEntity;
import br.com.tatu.projetovali.dto.PontoTuristicoDto;
import br.com.tatu.projetovali.service.PontoTuristicoService;
import br.com.tatu.projetovali.typeEnum.Categoria;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/v1/pontoturistico")
@RequiredArgsConstructor
@Validated
public class PontoTuristicoController {


    private final PontoTuristicoService pontoTuristicoService;


@PostMapping
@ResponseStatus(HttpStatus.CREATED)
    public void savePonto(  @RequestBody PontoTuristicoDto pt){
    pontoTuristicoService.savePonto(pt);
}


    @PostMapping("/{idPonto}/curtir/{idUsuario}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void curtirPonto(@PathVariable Integer idPonto, @PathVariable Integer idUsuario) {
        pontoTuristicoService.curtirPonto(idPonto, idUsuario);
    }


@GetMapping("/nome/{nome}")
@ResponseStatus(HttpStatus.OK)
    public PontoTuristicoDto findByNome(@PathVariable String nome){
    return  pontoTuristicoService.findByNome(nome);
}

@GetMapping("/categoria/{categoria}")
@ResponseStatus(HttpStatus.OK)
public List<PontoTuristicoDto> findAllByCategoria(@PathVariable Categoria categoria){
    return pontoTuristicoService.findAllByCategoria(categoria);
}



@GetMapping("/listar")
@ResponseStatus(HttpStatus.OK)
public List<PontoTuristicoDto> findAll(){
    return pontoTuristicoService.findAll();
    }



@DeleteMapping("/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById( @PathVariable Integer id){
          pontoTuristicoService.delete(id);
    }


    @DeleteMapping("/nome/{nome}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByNome(@PathVariable String nome) {
        pontoTuristicoService.deleteByNome(nome);
    }

@PatchMapping("/{id}")
@ResponseStatus(HttpStatus.OK)
public PontoTuristicoDto updatePontoByFields(@PathVariable Integer id, @RequestBody Map<String, Object> fields){
    return pontoTuristicoService.updatePontoByFields(id, fields);
}





}
