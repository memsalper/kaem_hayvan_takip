package com.kaem.repository;

import com.kaem.dto.GetColumn;
import com.kaem.dto.JoinInformationResponse;
import com.kaem.entity.Animal;
import com.kaem.props.SearchData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Integer>, CustomAnimalRepository {
    List<Animal> getAllByOrderById();

    @Query("select new com.kaem.dto.JoinInformationResponse (a.id, a.aciklama, a.dogumAgirlik, a.dogumTarihi, a.durumu, a.isletmeNo, a.stateAnimal, a.ulusalNo, c.cAdi, i.iAdi)" +
            " from Animal a join a.cag c join a.irk i")
    List<JoinInformationResponse> getJoinInformation();

    @Query("select new com.kaem.dto.JoinInformationResponse (a.id, a.aciklama, a.dogumAgirlik, a.dogumTarihi, a.durumu, a.isletmeNo, a.stateAnimal, a.ulusalNo, a.cag.cAdi, a.irk.iAdi) from Animal a where a.cag.cAdi LIKE %:cadi% ")
    List<JoinInformationResponse> searchByCag_CAdi(@Param("cadi") String cAdi);

    @Query("select a from Animal a where upper(a.cag.cAdi) like upper(concat('%', ?1, '%'))")
    List<Animal> findByCag_CAdiContainingIgnoreCase(String cAdi);








    List<GetColumn> findAllBy();



    //List<GetColumn> findByIrkByIAdi(String adi);
}
