package com.korit.library.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RentalRepository {

    public int rentalAvailability(int userId);

}
