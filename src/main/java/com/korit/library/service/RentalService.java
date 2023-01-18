package com.korit.library.service;

import com.korit.library.exception.CustomRentalException;
import com.korit.library.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    public void rental(int userId, int bookId) {

        availability(userId);

    }

    private void availability(int userId) {
        int rental_count = rentalRepository.rentalAvailability(userId);
        if(rental_count > 2) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("rentalCountError", "대여 회수를 초과하였습니다.");
            throw new CustomRentalException(errorMap);
        }
    }


}
