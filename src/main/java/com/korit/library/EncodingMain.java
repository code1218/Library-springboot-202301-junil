package com.korit.library;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class EncodingMain {
    public static void main(String[] args) {
        String str = "한글파일";
        System.out.println(URLEncoder.encode(str, StandardCharsets.ISO_8859_1));
    }
}
